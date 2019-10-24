const express = require('express');
const router = express.Router();

const UserRoutes = require("./user/UserRoutes");


/* Handles all routes associated the endpoint api */
router.use('/users', UserRoutes);

router.get('/', function (req, res, next)
{
  res.send('Welcome to the Badging System API');
});

module.exports = router;
