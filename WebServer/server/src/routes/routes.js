const express = require('express');
const router = express.Router();
const JSONResponse = require('../service/response/JSONResponse');
const UserRoutes = require("./user/UserRoutes");
const CoachRoutes = require("./coach/CoachRoutes");
const TeamRoutes = require("./team/TeamRoutes");



/* Handles all routes associated the endpoint api */
router.use('/users', UserRoutes);
router.use('/coaches', CoachRoutes);

router.use('/teams', TeamRoutes);

router.get('/', function(req, res, next) {
  JSONResponse(res, {
    message: 'Welcome to the Badging System API'
  }, 200);
});

module.exports = router;
