const express = require('express');
const router = express.Router();
const JSONResponse = require('../service/response/JSONResponse');
const InvalidInput = require('../service/response/InvalidInput');

const UserRoutes = require("./user/UserRoutes");
const TeamRoutes = require("./team/TeamRoutes");



/* Handles all routes associated the endpoint api */
router.use('/users', UserRoutes);
router.use('/teams', TeamRoutes);

router.get('/', function(req, res, next) {
  JSONResponse(res, {
    message: 'Welcome to the Badging System API'
  }, 200);
});

module.exports = router;
