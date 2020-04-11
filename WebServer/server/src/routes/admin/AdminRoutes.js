const express = require('express');
const router = express.Router();

const AdminController = require('./AdminController');

/* This handles all routes ssociated with the endpoint api/Admin/ */
router.get('', AdminController.index);

module.exports = router;
