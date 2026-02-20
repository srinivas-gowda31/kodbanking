const pool = require('../config/database');

class UserToken {
  static async create({ uname, token }) {
    const connection = await pool.getConnection();
    try {
      const query = `
        INSERT INTO user_tokens (uname, token, created_at)
        VALUES (?, ?, NOW())
      `;
      const result = await connection.execute(query, [uname, token]);
      return result;
    } finally {
      connection.release();
    }
  }

  static async findByToken(token) {
    const connection = await pool.getConnection();
    try {
      const query = 'SELECT * FROM user_tokens WHERE token = ?';
      const [rows] = await connection.execute(query, [token]);
      return rows[0] || null;
    } finally {
      connection.release();
    }
  }

  static async deleteByUsername(uname) {
    const connection = await pool.getConnection();
    try {
      const query = 'DELETE FROM user_tokens WHERE uname = ?';
      await connection.execute(query, [uname]);
    } finally {
      connection.release();
    }
  }

  static async deleteByToken(token) {
    const connection = await pool.getConnection();
    try {
      const query = 'DELETE FROM user_tokens WHERE token = ?';
      await connection.execute(query, [token]);
    } finally {
      connection.release();
    }
  }
}

module.exports = UserToken;
