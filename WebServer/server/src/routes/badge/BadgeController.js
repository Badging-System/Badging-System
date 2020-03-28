const JSONResponse = require("../../service/response/JSONResponse");
const mongoose = require("mongoose");
const Badge = require("../../../models/Badge");
const User = require("../../../models/User");
const BadgeUserJoin = require("../../../models/BadgeUserJoin");
const { Mongo } = require("../../database/mongoDB");
const InvalidInput = require("../../service/response/InvalidInput");

const mongoDB = new Mongo();

exports.index = (req, res) => {
  mongoDB.mongooseConnect();
  Badge.find({}, function(err, badges) {
    if (err) {
      console.log(err);
    } else {
      mongoDB.mongoogeDisconnect();
      JSONResponse(
        res,
        {
          data: badges
        },
        200
      );
    }
  });
};

exports.badgesByTeamId = (req, res) => {
  let teamId = req.params.id;
  if (!teamId) {
    InvalidInput(res, "invalid or missing coach id");
  } else {
    mongoDB.mongooseConnect();
    BadgeUserJoin.find(
      { Team: teamId },
      { _id: 0, User: 1, Badge: 1, Tasks_Completed: 1 }
    )
      .populate({
        path: "User",
        select: "Username First_name Last_name Active Email"
      })
      .populate({ path: "Badge", select: "Name Team Tasks" })
      .exec((err, data) => {
        if (err) {
          console.log(error);
        } else {
          mongoDB.mongoogeDisconnect();
          JSONResponse(
            res,
            {
              data: data
            },
            200
          );
        }
      });
  }
};

exports.completeTask = async (req, res) => {
  let userId = req.body.user_id;
  let badgeId = req.body.badge_id;
  let taskId = req.body.task_id;

  mongoDB.mongooseConnect();
  let doc = await BadgeUserJoin.findOneAndUpdate(
    { Badge: badgeId, User: userId },
    { $push: { Tasks_Completed: taskId } }
  );
  JSONResponse(res, { data: [] }, 200);
  mongoDB.mongoogeDisconnect();
};

exports.deleteTask = async (req, res) => {
  let userId = req.body.user_id;
  let badgeId = req.body.badge_id;
  let taskId = req.body.task_id;

  mongoDB.mongooseConnect();
  let doc = await BadgeUserJoin.findOneAndUpdate(
    { Badge: badgeId, User: userId },
    { $pull: { Tasks_Completed: taskId } }
  );
  JSONResponse(res, { data: [] }, 200);
  mongoDB.mongoogeDisconnect();
};

exports.completedTasksById = async (req, res) => {
  let userId = req.query.user_id;
  let badgeId = req.query.badge_id;
  console.log("user id: " + userId);
  mongoDB.mongooseConnect();
  let doc = await BadgeUserJoin.findOne(
    { Badge: badgeId, User: userId },
    { _id: 0, User: 0, Team: 0, Badge: 0 }
  );
  JSONResponse(res, { data: doc }, 200);
  mongoDB.mongoogeDisconnect();
};
