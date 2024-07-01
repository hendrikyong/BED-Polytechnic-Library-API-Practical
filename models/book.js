const sql = require("mssql");
const dbConfig = require("../dbConfig");

class Book {
  constructor(book_id, title, author, availability) {
    (this.book_id = book_id),
      (this.title = title),
      (this.author = author),
      (this.availability = availability);
  }
}
