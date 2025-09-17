const bcrypt = require("bcrypt");
const userDbModel = require("../models/user");
const userModel = new userDbModel();

class UserController {
  async register(req, res) {
    try {
      const { username, email, password } = req.body;

      //  Required fields check
      if (!username || !email || !password) {
        return res.status(400).json({ error: "Username, email, and password are required" });
      }

      // Password strength validation
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      if (!passwordRegex.test(password)) {
        return res.status(400).json({
          error: "Password must be at least 8 characters long and include at least one letter and one number"
        });
      }

      // Check if username or email already exists
      const existingUserByUsername = await userModel.findOne("username", username);
      const existingUserByEmail = await userModel.findOne("email", email);

      if (existingUserByUsername || existingUserByEmail) {
        return res.status(400).json({ error: "Username or email already exists" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const registeredId = await userModel.create({
        username,
        email,
        password: hashedPassword
      });

      if (registeredId) {
        const userData = await userModel.findById(registeredId);

        if (!userData) {
  return res.status(500).json({ error: "Failed to retrieve newly created user" });
}

        // Store user session
        req.session.user = {
          username: userData.username,
          user_id: userData.id,
        };

        res.status(201).json({
          message: `New user registered with ID: ${registeredId}`,
          user_session: req.session.user,
        });
      } else {
        res.status(500).json({ error: "Failed to register user" });
      }

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error during registration" });
    }
  }

  //login

  async login(req, res) {
    try {
      const { username, password } = req.body;

      // Required fields check
      if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
      }

      // Find user by username
      const userData = await userModel.findOne("username", username);
      if (!userData) {
        return res.status(400).json({ error: "Invalid username or password" });
      }

      // Compare passwords
      const isPasswordValid = await bcrypt.compare(password, userData.password);
      if (!isPasswordValid) {
        return res.status(400).json({ error: "Invalid username or password" });
      }

      // Store user session
      req.session.user = {
        username: userData.username,
        user_id: userData.id,
      };

      res.status(200).json({
        message: "Login successful",
        user_session: req.session.user, // Return session info
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error during login" });
    }
  }
}

module.exports = UserController;