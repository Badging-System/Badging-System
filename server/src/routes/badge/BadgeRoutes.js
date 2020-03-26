const express = require("express");
const router = express.Router();

const BadgeController = require("./BadgeController");
/* This handles all routes ssociated with the endpoint api/badges/ */
router.get("", BadgeController.index);
router.get("/:id", BadgeController.badgesByTeamId);
router.put("/task", BadgeController.completeTask);
router.put("/task/delete", BadgeController.deleteTask);

module.exports = router;
