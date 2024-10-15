const express = require("express");
const sql = require("mssql");
const bookController = require("./controllers/booksController");
const userController = require("./controllers/usersController");
const bodyParser = require("body-parser");
const dbConfig = require("./dbConfig");
const verifyJWT = require("./middlewares/authValidate");
const staticMiddleware = express.static("public");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json"); // Import generated spec
const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(staticMiddleware);
//api documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/books", bookController.getAllBooks);
app.get("/books/:id", bookController.getBookById);
app.put("/books/:id/availability", verifyJWT, bookController.updateBook);
app.get("/users", userController.getAllUsers);
app.get("/users/:username", userController.getUserByUsername);
app.post("/register", userController.registerUser);
app.post("/login", userController.login);

app.listen(port, async () => {
  try {
    // Connect to the database
    await sql.connect(dbConfig);
    console.log("Database connection established successfully");
  } catch (err) {
    console.error("Database connection error:", err);
    // Terminate the application with an error code (optional)
    process.exit(1); // Exit with code 1 indicating an error
  }

  console.log(`Server listening on port ${port}`);
});

process.on("SIGINT", async () => {
  console.log("Server is gracefully shutting down");
  // Perform cleanup tasks (e.g., close database connections)
  await sql.close();
  console.log("Database connection closed");
  process.exit(0); // Exit with code 0 indicating successful shutdown
});
