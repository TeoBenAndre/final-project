# User Management System

## 📌 Introduction
The **User Management System** is a full-stack application developed collaboratively by a student team. It allows for secure and efficient user account management, including features such as:
- Email sign-up and verification
- JWT authentication with refresh tokens
- Role-based authorization (Admin/User)
- Password reset functionality
- Profile management
- Admin dashboard with CRUD operations

## 🚀 Technologies Used
### Backend
- Node.js
- Express.js
- MySQL
- JWT (JSON Web Tokens)
- Nodemailer

### Frontend
- Angular 10 / 17 (Boilerplate)
- Angular Material (optional UI)
- Fake Backend for early development

### Others
- Git & GitHub for version control
- Postman for API testing

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/user-management-system.git
cd user-management-system

2. Backend Setup
bash
cd backend
npm install

Create a .env file and add:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=usermanagement
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
Start the backend server:

bash

npm start
3. Frontend Setup
bash

cd frontend
npm install
Run Angular app:

bash

ng serve