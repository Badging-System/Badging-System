const JSONResponse = require('../../service/response/JSONResponse');
const InvalidInput = require('../../service/response/InvalidInput');
const User = require('../../../models/User')
const {
  Mongo
} = require("../../database/mongoDB");

const mongoDB = new Mongo();
exports.index = (req, res) => {
  //Get all the collection data based off the User model
  mongoDB.getCollectionData(User).then(async (data) => {
    JSONResponse(res, {
      data: data
    }, 200);
  }).catch((error) => {
    JSONResponse(res, {
      error: error
    }, 500);
  });
};

exports.user_id = (req, res) => {
  let userId = req.params.id;
  if (!userId) {
    InvalidInput(res, 'No username was provided.');
  } else {
    mongoDB.findOne(User, {
      Username: userId
    }).then(async (data) => {
      JSONResponse(res, {
        data: data
      }, 200);
    }).catch((error) => {
      JSONResponse(res, {
        error: error
      }, 500);
    });
  }
};

exports.addUser = (req, res) => {

  let addedUser = new User(req.body);

  if ((addedUser.hasOwnProperty('Username')) && (addedUser.hasOwnProperty('First_name')) && (addedUser.hasOwnProperty('Last_name')) && (addedUser.hasOwnProperty('Status')) && (addedUser.hasOwnProperty('Email'))) {
    JSONResponse(res, {
      message: "Invalid Request"
    }, 400);
  } else if (addedUser.Status !== 'User') {
    JSONResponse(res, {
      message: 'Status needs to be set to User. Document was not inserted.'
    }, 403);
  } else {
    JSONResponse(res, {
      message: addedUser
    }, 201);
  }
};

exports.addedUsers = (req, res) => {
  let addedUsers = req.body;
  let collection = 'users'


  if ((addedUsers.hasOwnProperty('Username')) && (addedUsers.hasOwnProperty('First_name')) && (addedUsers.hasOwnProperty('Last_name')) && (addedUsers.hasOwnProperty('Status')) && (addedUsers.hasOwnProperty('Email'))) {
    JSONResponse(res, {
      message: "Invalid Request"
    }, 400);

  } else {
    for (index in addedUsers) {
      if (addedUsers[index].Status !== 'User') {
        JSONResponse(res, {
          message: 'Status needs to be set to User. No documents were inserted.'
        }, 403);
        return;
      }
    }
    JSONResponse(res, {
      message: addedUsers
    }, 201);
  }
}
