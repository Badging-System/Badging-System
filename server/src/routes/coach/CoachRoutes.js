const express = require('express');
const router = express.Router();

const CoachController = require('./CoachController');

/* This handles all routes ssociated with the endpoint api/Coach/ */
router.get('', CoachController.index);
router.get('/count', CoachController.count);

module.exports = router;
