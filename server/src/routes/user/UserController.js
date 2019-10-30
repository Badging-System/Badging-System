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

  let addedUser = new User(req.body);
  let collection = 'users'

  if ((addedUser.hasOwnProperty('Username')) && (addedUser.hasOwnProperty('First_name')) && (addedUser.hasOwnProperty('Last_name')) && (addedUser.hasOwnProperty('Status')) && (addedUser.hasOwnProperty('Email')))
  {

    JSONResponse(res, {message: "Invalid Request"}, 400);
    console.log(`One or more of the JSON key names are invalid`);
  }
  else if (addedUser.Status !== 'User')
  {
    JSONResponse(res, {message: 'Status needs to be set to User. Document was not inserted.'}, 403);
  }
  else
  {

    // let result = mongoDB.validateOneUsername(collection, addedUser);
    console.log(`value of result: ${result}`);
    // if (result === null)
    // {
    //   JSONResponse(res, {message: "username already exists in database "}, 403);
    // }
    // else
    // {
    JSONResponse(res, {message: addedUser}, 201);
    mongoDB.insertOneDocument(collection, addedUser);
    // }

  }

};

exports.addedUsers = (req, res) =>
{
  // console.log(req.body);
  let addedUsers = req.body;
  let collection = 'users'


  if ((addedUsers.hasOwnProperty('Username')) && (addedUsers.hasOwnProperty('First_name')) && (addedUsers.hasOwnProperty('Last_name')) && (addedUsers.hasOwnProperty('Status')) && (addedUsers.hasOwnProperty('Email')))
  {
    JSONResponse(res, {message: "Invalid Request"}, 400);

  }

  else
  {
    for (index in addedUsers)
    {
      if (addedUsers[index].Status !== 'User')
      {
        JSONResponse(res, {message: 'Status needs to be set to User. No documents were inserted.'}, 403);
        return;
      }
    }
    JSONResponse(res, {message: addedUsers}, 201);
    mongoDB.insertManyDocuments(collection, addedUsers);
  }
}
