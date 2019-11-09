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

exports.addUser = async (req, res) => {

  let addedUser = new User(req.body);
  let collection = 'users';

  if ((addedUser.hasOwnProperty('Username')) && (addedUser.hasOwnProperty('First_name')) && (addedUser.hasOwnProperty('Last_name')) && (addedUser.hasOwnProperty('Status')) && (addedUser.hasOwnProperty('Email'))) {
    JSONResponse(res, {
      message: "Invalid Request"
    }, 400);
  } else if (addedUser.Status !== 'User') {
    JSONResponse(res, {
      message: 'Status needs to be set to User. Document was not inserted.'
    }, 403);
  } else {
    var result = await mongoDB.validateUserNameEmail(User, addedUser);
    if (result === null) {
      mongoDB.insertOneDocument(collection, addedUser);
      JSONResponse(res, {
        message: addedUser
      }, 201);
    } else {
      JSONResponse(res, {
        message: "Username and/or email already exists."
      }, 403);
    }


  }
};

exports.addedUsers = async (req, res) => {
  let addedUsers = req.body;
  let collection = 'users';
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
    var result = await mongoDB.validateUserNameEmail(User, addedUsers);
    if (result === null) {
      mongoDB.insertManyDocuments(collection, addedUsers);
      JSONResponse(res, {
        message: addedUsers
      }, 201);
    } else {
      JSONResponse(res, {
        message: "Username and/or email already exists for one or more entered users. No users were entered into the database."
      }, 403);
    }

  }
}