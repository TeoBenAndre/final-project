const { expressjwt: jwt } = require('express-jwt');
const { secret } = require('../config');
const db = require('_helper/db');

module.exports = authorize;

function authorize(roles = []) {
    // roles param can be a single role string (e.g. Role.User or User)
    // or array of roles (e.g. [Role.Admin, Role.User] or [Admin, User])
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return [
        // authenticate JWT token and attach user to request object (req.user)
        jwt({ 
            secret, 
            algorithms: ['HS256'],
            credentialsRequired: false // Don't require authentication
        }),

        // authorize based on user role
        async (req, res, next) => {
            // If no user in request, create a default admin user
            if (!req.user) {
                req.user = {
                    id: 1,
                    role: 'Admin'
                };
                return next();
            }

            const account = await db.Account.findByPk(req.user.id);

            if (!account || (roles.length && !roles.includes(account.role))) {
                // account no longer exists or role not authorized
                return res.status(401).json({ message: 'Unauthorized' });
            }

            // authentication and authorization successful
            req.user.role = account.role;
            const refreshTokens = await account.getRefreshTokens();
            req.user.ownsToken = token => !!refreshTokens.find(x => x.token === token);
            next();
        }
    ];
}