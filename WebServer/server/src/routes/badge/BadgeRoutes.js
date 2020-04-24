const express = require("express");
const router = express.Router();

const BadgeController = require("./BadgeController");
/* This handles all routes ssociated with the endpoint api/badges/ */
router.get("", BadgeController.index);
router.get("/:id", BadgeController.badgesByTeamId);
router.get("/manage/:id", BadgeController.badgeManageByTeamId);
router.get("/tasks/completed", BadgeController.completedTasksById);
router.put("/task", BadgeController.completeTask);
router.put("/task/delete", BadgeController.deleteTask);
router.post("/insert", BadgeController.insertBadge);
router.post("/assign", BadgeController.insertAssignedBadge);
router.post("/award", BadgeController.insertRecipient);

module.exports = router;
