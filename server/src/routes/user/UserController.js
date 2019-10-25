const JSONResponse = require('../../service/response/JSONResponse');
const InvalidInput = require('../../service/response/InvalidInput');
const User = require('../../../models/User')

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
  console.log(req.body)
  let addedUser = new User(req.body)
  console.log(`this is the first name of the added user: ${addedUser.First_name}`)
  JSONResponse(res, {message: 'User succesfully added!'}, 201)
}; 
