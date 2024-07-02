const { re } = require("mathjs");
const dbConfig = require("../dbConfig");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sql = require("mssql");

const getAllUsers = async (req, res) => {
  try {
    const user = await User.getAllUsers();
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error getting books");
  }
};

const getUserByUsername = async (req, res) => {
  const username = req.params.username;
  try {
    const user = await User.getUserByUsername(username);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving user");
  }
};

const registerUser = async (req, res) => {
  const { username, password, role } = req.body[0];
  try {
    //validation logic
    const existingUser = await User.getUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const connection = await sql.connect(dbConfig);
    const sqlQuery = `INSERT INTO Users (username, passwordHash, role) VALUES (@username, @password, @role)
                      SELECT SCOPE_IDENTITY() as user_id`;

    const request = connection.request();
    request.input("username", username);
    request.input("password", hashedPassword); // Use hashedPassword
    request.input("role", role);

    const result = await request.query(sqlQuery);
    connection.close();

    const newUser = { id: result.recordset[0].user_id, username };
    return res
      .status(200)
      .json({ message: "User successfully created", user: newUser });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllUsers,
  getUserByUsername,
  registerUser,
};
