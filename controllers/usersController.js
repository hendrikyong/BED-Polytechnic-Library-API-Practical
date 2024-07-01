const User = require("../models/user");

const getAllUsers = async (req, res) => {
  try {
    const user = await User.getAllUsers();
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error getting books");
  }
};

module.exports = {
  getAllUsers,
};
