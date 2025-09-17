const express = require("express");
const router = express.Router();
const UserControllerClass = require("../controllers/user");
const userController = new UserControllerClass(); // create instance

router.post('/users/register', (req, res) => userController.register(req, res));

module.exports = router;

