const sql = require("mssql");
const config = require("../dbConfig");
const dbConfig = require("../dbConfig");

class User {
  constructor(user_id, name, passwordHash, role) {
    this.user_id = user_id;
    this.name = name;
    this.passwordHash = passwordHash;
    this.role = role;
  }

  static async getAllUsers() {
    try {
      let connection = await sql.connect(dbConfig);
      const sqlQuery = `SELECT * FROM Users`;
      const request = connection.request();
      const result = await request.query(sqlQuery);
      connection.close();

      return result.recordset.map(
        (row) => new User(row.user_id, row.name, row.passwordHash, row.role)
      );
    } catch (err) {
      console.log("Error getting user", err);
    }
  }
}

module.exports = User;
