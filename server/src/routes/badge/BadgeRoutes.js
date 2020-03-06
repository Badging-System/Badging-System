const express = require("express");
const router = express.Router();

const BadgeController = require("./BadgeController");
/* This handles all routes ssociated with the endpoint api/Badge/ */
router.get("", BadgeController.index);

module.exports = router;
