const express = require('express');
const router = express.Router();

const UserController = require("./UserController");

/* This handles all routes ssociated with the endpoint api/user/ */
router.get('', UserController.index);
router.get('/:id', UserController.user_id); //takes query param od user id
router.post('/addUser', UserController.addUser)

module.exports = router;
