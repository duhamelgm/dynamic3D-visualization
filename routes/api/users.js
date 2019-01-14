const express = require("express");
const router = express.Router();

const usersHandlers = require("../handlers/users-handlers");

// @route       POST api/users/register
// @desc        Register user
// @acces       Public
router.post("/register", usersHandlers.registerUser);

// @route       POST api/users/login
// @desc        Login user
// @acces       Public
router.post("/login", usersHandlers.loginUser);

module.exports = router;
