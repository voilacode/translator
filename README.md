🚀 Introduction
PolyLingua is an AI-powered language translation engine that enables seamless text translation between multiple languages. With role-based access, customizable language settings, and real-time analytics, it ensures efficient and personalized translation experiences. 📖🌐

🎯 Features
AI-Powered Translation – Translate text between various languages using a robust translation API.
Customizable Language Settings – Users can choose which languages to display for translation in their dashboard.
Real-Time Analytics – Tracks translation history, credit usage, and performance metrics.
Credit-Based Usage System – Each translation deducts a credit, with a limit of 100 translations per user.
Role-Based Access Control – Admins manage users, view analytics, and adjust settings.
Sleek & Responsive UI – Designed with Tailwind CSS for a smooth and intuitive experience.
🛠️ Tech Stack
Backend: Node.js, Express.js
Frontend: Tailwind CSS, Alpine.js
Database: MySQL
Authentication & Roles: Csurf, Express Session
🚀 Getting Started
1️⃣ Clone the Repository
```sh
git clone https://github.com/yourusername/polylingua.git  
cd polylingua
```
2️⃣ Setup Database Credentials
```sh
const mysql = require('mysql2');

const db = mysql
  .createPool({
    host: 'localhost',
    user: 'username',
    password: 'password',
    database: 'databasename',
  })
  .promise();

module.exports = db;
```
3️⃣ Setup Database
```sh

-- Create the 'users' table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    languages TEXT NULL,
    translations int,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
4️⃣ Start the Server
```sh
node app.js
```
