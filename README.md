## 🔒 Secure User Input Form

A secure full-stack web application demonstrating prevention of SQL Injection and Cross-Site Scripting (XSS) attacks using Node.js, Express.js, and MySQL.

### 🚀 Features
- SQL Injection Prevention
- XSS Protection
- Secure Backend Validation
- Rate Limiting with Express
- Helmet Security Middleware
- Modern Responsive UI
- MySQL Database Integration

### 🛠 Tech Stack
- HTML
- CSS
- JavaScript
- Node.js
- Express.js
- MySQL

### ▶️ Run Project

```bash
npm install
node server.js
````

Open:

```bash
http://localhost:5000
```

### 🗄 Database Setup

```sql
CREATE DATABASE secure_app;

USE secure_app;

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(100),
  comment TEXT
);
```

### 🔑 Environment Variables

Create `.env`

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=secure_app
PORT=5000
```

### Preview
<img width="1897" height="912" alt="Screenshot 2026-05-18 232104" src="https://github.com/user-attachments/assets/75412787-ad0b-4ec6-8c56-5a32e666e4c8" />
<img width="1896" height="912" alt="Screenshot 2026-05-18 232231" src="https://github.com/user-attachments/assets/c080fe48-bb0d-4bec-8216-6f52a1be8610" />
<img width="585" height="155" alt="Screenshot 2026-05-18 232423" src="https://github.com/user-attachments/assets/8043693f-a347-47a5-9b5f-7fe229daf05d" />



### 👩‍💻 Author

Shruti Shinde

