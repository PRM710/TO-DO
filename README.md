# ✅ To-Do API (Express + PostgreSQL + JWT + Cron + Nodemailer)

This is a fully working To-Do backend built with **Node.js, Express, PostgreSQL, JSON Web Tokens (JWT), Cron, and Nodemailer**.

The backend is already deployed on AWS.  
✅ You can test it using Postman  
✅ JWT authentication enabled  
✅ Email notifications for newly created tasks

---

## ✅ ✅ Deployment URL (AWS Hosted)

Base URL:

```
http://16.16.206.12:3000
```

---

## ✅ Authorization Required
Every request must include this JWT token in Postman:

**Header key:** `Authorization`  
**Header value:**  
```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoicHJha2FzaC1kZW1vIiwicm9sZSI6InRlc3RlciIsImlhdCI6MTc2MjM2ODAwNCwiZXhwIjoxNzY0OTYwMDA0fQ.rvm3NLts-OyGdJhCYZ1Bi0jbAXD0x1wQrAP2BSl_cSg
```

⚠️ This token is valid for **30 days**.

---

## ✅ POSTMAN USAGE GUIDE

### ✅ 1. Get All Tasks
```
GET http://16.16.206.12:3000/tasks
```

---

### ✅ 2. Create New Task
Use POST method:

```
POST http://16.16.206.12:3000/tasks
```

**Body (JSON):**
```json
{
  "title": "First task",
  "description": "Testing task creation"
}
```

---

### ✅ 3. Get a Task by ID
Example:
```
GET http://16.16.206.12:3000/tasks/1
```

---

### ✅ 4. Delete a Task
Example:
```
DELETE http://16.16.206.12:3000/tasks/1
```

---

## ✅ Testing Locally (Run on Your System)

### ✅ Step 1 — Clone Repository
```
git clone https://github.com/PRM710/TO-DO.git
cd TO-DO
```

---

### ✅ Step 2 — Install Dependencies
```
npm install
```

---

### ✅ Step 3 — Create PostgreSQL Database

Create a new database named:
```
todo_db
```

If you use pgAdmin or CLI:
```sql
CREATE DATABASE todo_db;
```

---

### ✅ Step 4 — Create your `.env` file

Create `.env` in project root and add your own values:

```
# ✅ Server
PORT=3000

# ✅ PostgreSQL Database
DATABASE_URL=postgresql://postgres:YOURPASS@localhost:5432/todo_db
DB_SSL=false

# ✅ Cron Job
DISABLE_CRON=false

# ✅ Gmail SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=yourgmail@gmail.com
SMTP_PASS=your_app_password
SMTP_FROM="Todo App <yourgmail@gmail.com>"
NOTIFY_TO=yourgmail@gmail.com

# Auth middleware
JWT_SECRET=your_secret_here
JWT_EXPIRES_IN=30d
```

⚠️ Use **your own Gmail, and App Password** (not the one in demo).  
Without valid SMTP credentials, email notifications won't work.

---

### ✅ Step 5 — Start Server
```
node server.js
```

Server runs on:
```
http://localhost:3000
```

---

## ✅ Important Notes

✅ Login system is not included in this project.  
✅ To demonstrate JWT-protected APIs, a **working token is pre-generated** and valid for 30 days.  
✅ Cron job checks for new tasks and sends email alerts using Nodemailer.  

---

## ✅ Tools & Tech Used
- Node.js, Express
- PostgreSQL
- JSON Web Token (JWT)
- Nodemailer (Gmail SMTP)
- Cron jobs
- AWS Deployment

---

## ✅ Developer Note
⚠️ Please use the AWS deployment carefully.  
It is live and publicly accessible.

If you face any issue while testing/building locally, feel free to reach out.

---
✅ Enjoy Testing 🚀
