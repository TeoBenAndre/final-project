# Configuration Guide

## Configuration Files

### config.json
This is a template configuration file that shows the structure of your configuration.
For production use, you should use environment variables with `config.js` instead.

### config.js
This is the main configuration file that loads environment variables.
It provides fallback values if environment variables are not set.

### .env
Create this file with your actual configuration values. Example:
```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=your_database_name

# JWT Secret
JWT_SECRET=your_jwt_secret

# Email Configuration
EMAIL_FROM=your_email@example.com
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
```

## Security Notes
- Never commit your `.env` file to version control
- Add `.env` to your `.gitignore` file
- Keep your `config.json` as a template for other developers 