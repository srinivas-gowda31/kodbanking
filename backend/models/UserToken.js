const pool = require('../config/database');

class UserToken {
  static async create({ uname, token }) {
    const connection = await pool.getConnection();
    try {
      const query = `
        INSERT INTO user_tokens (uname, token, created_at)
        VALUES (?, ?, NOW())
      `;
      await connection.execute(query, [uname, token]);
    } finally {
      connection.release();
    }
  }

  static async findByToken(token) {
    const connection = await pool.getConnection();
    try {
      const query = `
        SELECT * FROM user_tokens 
        WHERE token = ? 
        ORDER BY created_at DESC 
        LIMIT 1
      `;
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
}

module.exports = UserToken;
