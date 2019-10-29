const JSONResponse = require('../../service/response/JSONResponse');
const InvalidInput = require('../../service/response/InvalidInput');
const User = require('../../../models/User')
const {Mongo} = require("../../database/mongoDB");

const mongoDB = new Mongo();
exports.index = (req, res) =>
{
  JSONResponse(res, {
    message: 'Success'
  }, 200);
};

exports.user_id = (req, res) =>
{
  let userId = req.params.id;
  if (!userId)
  {
    InvalidInput(res, 'Invalid Input');
  } else
  {
    JSONResponse(res, {
      message: 'Success ' + userId
    }, 200);
  }
};

exports.addUser = (req, res) =>
{

  let addedUser = new User(req.body)
  let collection = 'users'

  if ((addedUser.hasOwnProperty('Username')) && (addedUser.hasOwnProperty('First_name')) && (addedUser.hasOwnProperty('Last_name')) && (addedUser.hasOwnProperty('Status')) && (addedUser.hasOwnProperty('Email')))
  {
    JSONResponse(res, {message: "Invalid Request"}, 400);
    console.log(`One or more of the JSON key names are invalid`);
  }
  else
  {
    JSONResponse(res, {message: addedUser}, 201);
    mongoDB.insertOneDocument(collection, addedUser);
  }

}; 
