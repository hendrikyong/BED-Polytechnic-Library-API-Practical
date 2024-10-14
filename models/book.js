const sql = require("mssql");
const dbConfig = require("../dbConfig");

class Book {
  constructor(book_id, title, author, availability) {
    (this.book_id = book_id),
      (this.title = title),
      (this.author = author),
      (this.availability = availability);
  }

  static async getAllBooks() {
    try {
      let connection = await sql.connect(dbConfig);
      const sqlQuery = `SELECT * FROM Books`;
      const request = connection.request();
      const result = await request.query(sqlQuery);
      connection.close();

      return result.recordset.map(
        (row) => new Book(row.book_id, row.title, row.author, row.availability)
      );
    } catch (err) {
      console.log("Error retrieving books", err);
    }
  }

  static async getBookById(id) {
    try {
      const connection = await sql.connect(dbConfig);
      const sqlQuery = `SELECT * FROM Books WHERE book_id = @id`;
      const request = connection.request();
      request.input("id", id);
      const result = await request.query(sqlQuery);
      connection.close();

      return result.recordset[0]
        ? new Book(
            result.recordset[0].book_id,
            result.recordset[0].title,
            result.recordset[0].author,
            result.recordset[0].availability
          )
        : null; // Handle book not found
    } catch (err) {
      console.log("Error reteriving book", err);
    }
  }

  static async updateBook(id, newAvailability) {
    try {
      const connection = await sql.connect(dbConfig);
      const sqlQuery = `UPDATE Books SET
      availability = @availability
      WHERE book_id = @id
      `;

      console.log(newAvailability);
      const request = connection.request();
      request.input("id", id);
      request.input("availability", newAvailability);

      await request.query(sqlQuery);
      connection.close();
      return this.getBookById(id);
    } catch (err) {
      console.log("Error updating book availability", err);
    }
  }
}
module.exports = Book;
