const express = require("express");
const router = express.Router();
const UserControllerClass = require("../controllers/user");
const userController = new UserControllerClass(); // create instance

router.post('/users/register', (req, res) => userController.register(req, res));
router.post('/users/login', (req, res) => userController.login(req, res));

module.exports = router;