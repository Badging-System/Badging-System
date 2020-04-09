const express = require('express');
const router = express.Router();

const TeamController = require("./TeamController");

/* This handles all routes ssociated with the endpoint api/team/ */
router.get('', TeamController.index);
router.get('/count', TeamController.count);
router.get('/topperforming', TeamController.topPerforming); 
router.get('/:id', TeamController.team_id); //takes query param od user id
router.post('/addTeam', TeamController.addTeam); // expects a json key-value pair of all user data defined in the Team model
router.post('/addTeamMember', TeamController.addTeamMember); // expects a json key-value pair of all user data defined in the User model

module.exports = router;
