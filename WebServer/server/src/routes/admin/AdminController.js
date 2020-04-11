const JSONResponse = require('../../service/response/JSONResponse');
const User = require('../../../models/User');
const { Mongo } = require('../../database/mongoDB');
const BadgeController = require("../badge/BadgeController");

exports.index = async (req, res) => {
  JSONResponse(
    res, 
    {
      message: 'Returning a list of Admins'
    },
    200
  );
};


