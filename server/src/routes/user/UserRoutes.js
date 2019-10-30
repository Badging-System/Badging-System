const express = require('express');
const router = express.Router();

const UserController = require("./UserController");

/* This handles all routes ssociated with the endpoint api/user/ */
router.get('', UserController.index);
router.get('/:id', UserController.user_id); //takes query param od user id
router.post('/adduser', UserController.addUser); // expects a json key-value pair of all user data defined in the User model
router.post('/addedusers', UserController.addedUsers) // expects an array of json key-value pairs as shown in the seed script
module.exports = router;
