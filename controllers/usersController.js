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

const getUserById = async (req, res) => {
  const userId = parseInt(req.params.id);
  try {
    const user = await User.getUserById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving user");
  }
};

module.exports = {
  getAllUsers,
  getUserById,
};
