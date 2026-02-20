-- Create database
CREATE DATABASE IF NOT EXISTS kodbanking;
USE kodbanking;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  uid VARCHAR(50) UNIQUE NOT NULL,
  uname VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  phone VARCHAR(20) NOT NULL,
  role VARCHAR(20) DEFAULT 'customer',
  balance DECIMAL(15, 2) DEFAULT 100000,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_uname (uname),
  INDEX idx_email (email),
  INDEX idx_uid (uid)
);

-- User tokens table
CREATE TABLE IF NOT EXISTS user_tokens (
  id INT AUTO_INCREMENT PRIMARY KEY,
  uname VARCHAR(50) NOT NULL,
  token LONGTEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_uname (uname),
  INDEX idx_token (token(255)),
  FOREIGN KEY (uname) REFERENCES users(uname) ON DELETE CASCADE
);

-- Version information
-- VERSION()  |
-- 8.0.28-18  |
