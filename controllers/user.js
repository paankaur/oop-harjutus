const bycrypt = require("bcrypt");
const userDbModel = require("../models/user");
const userModel = new userDbModel();

class userController {
  async register(req, res) {
    const cryptPassword = await bycrypt.hash(req.body.password, 10);
    const registeredId = await userModel.create({
      username: req.body.username,
      email: req.body.email,
      password: cryptPassword,
    });
    if (registeredId) {
      const userData = await userModel.findById(registeredId);
      req.session.user = {
        username: userData.username,
        user_id: userData.id,
      };
      res
        .status(201)
        .json({
          message: `New user registered with ID: ${registeredId}`,
          user_session: req.session.user,
        });
    } else {
      res.status(500).json({ error: "Failed to register user" });
    }
  }
}
module.exports = userController;