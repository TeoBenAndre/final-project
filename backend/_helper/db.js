const config = require('../config');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

const db = {};
module.exports = db;

initialize();

async function initialize() {
  try {
    const { host, port, user, password, database } = config.database;
    console.log('Attempting to connect to database...', { host, port, database, user });

    const connection = await mysql.createConnection({ host, port, user, password });
    console.log('Initial connection successful');

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
    await connection.end();
    console.log('Database verified/created');

    const sequelize = new Sequelize(database, user, password, {
      host,
      dialect: 'mysql',
      logging: false // or true during development
    });

    await sequelize.authenticate();
    console.log('Sequelize connection established.');

    // Attach sequelize to exported object
    db.sequelize = sequelize;

    // Import models
    db.Account = require('../accounts/account.model')(sequelize);
    db.RefreshToken = require('../accounts/refresh-token.model')(sequelize);
    db.Department = require('../departments/department.model')(sequelize);
    db.Employee = require('../employees/employee.model')(sequelize);
    db.Workflow = require('../workflows/workflows.model')(sequelize);
    db.Request = require('../requests/request.model')(sequelize);
    db.RequestItem = require('../requests/request-item.model')(sequelize);

    // Define relationships
    db.Account.hasMany(db.RefreshToken, { onDelete: 'CASCADE' });
    db.Account.hasOne(db.Employee, { foreignKey: 'accountId', onDelete: 'CASCADE' });
    db.Employee.belongsTo(db.Account, { foreignKey: 'accountId' });

    db.Department.hasMany(db.Employee, { foreignKey: 'departmentId' });
    db.Employee.belongsTo(db.Department, { foreignKey: 'departmentId', as: 'department' });

    db.Employee.hasMany(db.Workflow, { foreignKey: 'employeeId', as: 'workflows' });
    db.Workflow.belongsTo(db.Employee, { foreignKey: 'employeeId', as: 'employee' });

    db.Employee.hasMany(db.Request, { foreignKey: 'employeeId', as: 'Requests' });
    db.Request.belongsTo(db.Employee, { foreignKey: 'employeeId', as: 'Employee' });

    db.Request.hasMany(db.RequestItem, { foreignKey: 'requestId', as: 'RequestItems', onDelete: 'CASCADE' });
    db.RequestItem.belongsTo(db.Request, { foreignKey: 'requestId', as: 'Request' });

    db.RefreshToken.belongsTo(db.Account, { foreignKey: 'accountId' });

    await sequelize.sync({ alter: true });
    console.log('Database synced successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
