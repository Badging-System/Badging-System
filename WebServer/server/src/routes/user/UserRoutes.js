const express = require("express");
const router = express.Router();

const UserController = require("./UserController");

/* This handles all routes ssociated with the endpoint api/user/ */
router.get("", UserController.index);
router.get("/count", UserController.count);
router.get("/:id", UserController.user_id); //takes query param od user id
router.get("/coach/:id", UserController.usersByCoach); //get users by coach id.  Query param coach id.
router.get("/getUserTeamName/:id", UserController.getUserTeamName); // takes team id of the user and gets all team information related to the user
router.get("/getUserTeamMembers/:id", UserController.getUserTeamMembersByID); // takes team id and returns all user, admin and coach members
router.get("/getUserBadgesByID/:id", UserController.getUserBadgesByID); // takes a user id and gets all badges associated with that user
router.post("/adduser", UserController.addUser); // expects a json key-value pair of all user data defined in the User model
router.post("/addedusers", UserController.addedUsers); // expects an array of json key-value pairs as shown in the seed script
module.exports = router;
