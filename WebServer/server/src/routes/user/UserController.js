const JSONResponse = require("../../service/response/JSONResponse");
const InvalidInput = require("../../service/response/InvalidInput");
const User = require("../../../models/User");
const Team = require("../../../models/Team");
const BadgeUserJoin = require("../../../models/BadgeUserJoin");
const Badge = require("../../../models/Badge");
const { Mongo } = require("../../database/mongoDB");
const mongoose = require("mongoose");

const mongoDB = new Mongo();
exports.index = (req, res) => {
  //Get all the collection data based off the User model
  mongoDB
    .getCollectionData(User)
    .then(async (data) => {
      JSONResponse(
        res,
        {
          data: data,
        },
        200
      );
    })
    .catch((error) => {
      JSONResponse(
        res,
        {
          error: error,
        },
        500
      );
    });
};

/**
 * Returns user count
 * @return {number}       [number of users]
 */
exports.count = (req, res) => {
  //Get all the collection data based off the User model
  mongoDB
    .getCollectionData(User)
    .then(async (data) => {
      JSONResponse(
        res,
        {
          data: data.length,
        },
        200
      );
    })
    .catch((error) => {
      JSONResponse(
        res,
        {
          error: error,
        },
        500
      );
    });
};

exports.user_id = (req, res) => {
  let userId = req.params.id;
  if (!userId) {
    InvalidInput(res, "No username was provided.");
  } else {
    mongoDB
      .findOne(User, {
        Username: userId,
      })
      .then(async (data) => {
        JSONResponse(
          res,
          {
            data: data,
          },
          200
        );
      })
      .catch((error) => {
        JSONResponse(
          res,
          {
            error: error,
          },
          500
        );
      });
  }
};

exports.addUser = async (req, res) => {
  let addedUser = new User(req.body);
  let collection = "users";
  if (
    addedUser.hasOwnProperty("Username") &&
    addedUser.hasOwnProperty("First_name") &&
    addedUser.hasOwnProperty("Last_name") &&
    addedUser.hasOwnProperty("Status") &&
    addedUser.hasOwnProperty("Email")
  ) {
    JSONResponse(
      res,
      {
        message: "Invalid Request",
      },
      400
    );
  } else if (addedUser.Status !== "User") {
    JSONResponse(
      res,
      {
        message: "Status needs to be set to User. Document was not inserted.",
      },
      403
    );
  } else if (!validEmail(addedUser.Email)) {
    //Validate user email
    JSONResponse(
      res,
      {
        message:
          "Email needs to be in correct format. Document was not inserted.",
      },
      403
    );
  } else {
    var result = await mongoDB.validateUserNameEmail(User, addedUser);
    if (result === null) {
      mongoDB
        .insertOneDocument(collection, addedUser)
        .then((response) => {
          JSONResponse(
            res,
            {
              message: addedUser,
            },
            201
          );
        })
        .catch((err) => {
          JSONResponse(
            res,
            {
              message: err,
            },
            403
          );
        });
    } else {
      JSONResponse(
        res,
        {
          message: "Username and/or email already exists.",
        },
        403
      );
    }
  }
};

exports.addedUsers = async (req, res) => {
  let addedUsers = req.body;
  let collection = "users";
  if (
    addedUsers.hasOwnProperty("Username") &&
    addedUsers.hasOwnProperty("First_name") &&
    addedUsers.hasOwnProperty("Last_name") &&
    addedUsers.hasOwnProperty("Status") &&
    addedUsers.hasOwnProperty("Email")
  ) {
    JSONResponse(
      res,
      {
        message: "Invalid Request",
      },
      400
    );
  } else {
    for (index in addedUsers) {
      if (addedUsers[index].Status !== "User") {
        JSONResponse(
          res,
          {
            message:
              "Status needs to be set to User. No documents were inserted.",
          },
          403
        );
        return;
      }
    }
    for (index in addedUsers) {
      if (!validEmail(addedUsers[index].Email)) {
        JSONResponse(
          res,
          {
            message:
              "One or more emails need to be in a correct format. Documents were not inserted.",
          },
          403
        );
        return;
      }
    }

    var result = await mongoDB.validateUserNameEmail(User, addedUsers);
    if (result === null) {
      mongoDB
        .insertManyDocuments(collection, addedUsers)
        .then((response) => {
          JSONResponse(
            res,
            {
              message: addedUsers,
            },
            201
          );
        })
        .catch((err) => {
          JSONResponse(
            res,
            {
              message: err,
            },
            403
          );
        });
    } else {
      JSONResponse(
        res,
        {
          message:
            "Username and/or email already exists for one or more entered users. No users were entered into the database.",
        },
        403
      );
    }
  }
};

exports.getUserTeamName = async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id) === false) {
    InvalidInput(res, "ObjectId of user is invalid");
    return;
  }
  let userID = req.params.id;
  var userObj = await mongoDB.findOne(User, { _id: userID });

  if (userObj.length === 0) {
    JSONResponse(
      res,
      {
        message: "User id does not exist ",
      },
      400
    );
  } else {
    var teamObj = await mongoDB.findOne(Team, { _id: userObj[0].Team });
    JSONResponse(
      res,
      {
        message: teamObj[0].Name,
      },
      200
    );
  }
};

exports.usersByCoach = async (req, res) => {
  let coachId = req.params.id;
  mongoDB.mongooseConnect();
  try {
    let docs = await Team.findOne(
      { Coach: coachId },
      { Members: 1, _id: 0 }
    ).populate("Members");
    JSONResponse(res, { data: docs }, 200);
  } catch (e) {
    console.log(e);
    InvalidInput(res, "Could fetch team members by coach");
  } finally {
    mongoDB.mongoogeDisconnect();
  }
};

exports.getUserTeamMembersByID = async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id) === false) {
    InvalidInput(res, "ObjectId of team is invalid");
    return;
  }
  let teamArray = [];
  let teamID = req.params.id;

  var admin = await mongoDB.findOne(User, { Team: teamID, Role: "Admin" });
  if (admin.length === 0) {
    JSONResponse(
      res,
      {
        message: "Team id does not exist ",
      },
      400
    );
  } else {
    teamArray.push(admin);
    var coach = await mongoDB.findOne(User, { Team: teamID, Role: "Coach" });
    teamArray.push(coach);
    var users = await mongoDB.getUserTeamMembers(Team, teamID);
    teamArray.push(users);

    JSONResponse(
      res,
      {
        message: teamArray,
      },
      200
    );
  }
};

exports.getUserBadgesByID = async (req, res) => {
  let userID = req.params.id;
  mongoDB.mongooseConnect();
  BadgeUserJoin.findOne(
    { User: userID },
    { Badge: 1, Tasks_Completed: 1, Award: 1, _id: 0 }
  )
    .populate("Badge")
    .exec((err, badgeObj) => {
      if (err) {
        console.log(err);
      } else {
        mongoDB.mongoogeDisconnect();
        JSONResponse(
          res,
          {
            data: badgeObj,
          },
          200
        );
      }
    });
};

/**
 * Validates email format
 * @param  {String} email [user email]
 * @return {boolean}       [true if valid else false]
 */
function validEmail(email) {
  var validate = true;
  var emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!email.match(emailFormat)) {
    validate = false;
  }
  return validate;
}
