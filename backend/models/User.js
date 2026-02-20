const pool = require('../config/database');

class User {
  static async create({ uid, uname, password, email, phone, role, balance }) {
    const connection = await pool.getConnection();
    try {
      const query = `
        INSERT INTO users (uid, uname, password, email, phone, role, balance, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
      `;
      const result = await connection.execute(query, [uid, uname, password, email, phone, role, balance]);
      return result;
    } finally {
      connection.release();
    }
  }

  static async findByUsername(uname) {
    const connection = await pool.getConnection();
    try {
      const query = 'SELECT * FROM users WHERE uname = ?';
      const [rows] = await connection.execute(query, [uname]);
      return rows[0] || null;
    } finally {
      connection.release();
    }
  }

  static async findByEmail(email) {
    const connection = await pool.getConnection();
    try {
      const query = 'SELECT * FROM users WHERE email = ?';
      const [rows] = await connection.execute(query, [email]);
      return rows[0] || null;
    } finally {
      connection.release();
    }
  }

  static async findByUid(uid) {
    const connection = await pool.getConnection();
    try {
      const query = 'SELECT * FROM users WHERE uid = ?';
      const [rows] = await connection.execute(query, [uid]);
      return rows[0] || null;
    } finally {
      connection.release();
    }
  }

  static async getBalance(uname) {
    const connection = await pool.getConnection();
    try {
      const query = 'SELECT balance FROM users WHERE uname = ?';
      const [rows] = await connection.execute(query, [uname]);
      return rows[0]?.balance || 0;
    } finally {
      connection.release();
    }
  }
}

module.exports = User;
