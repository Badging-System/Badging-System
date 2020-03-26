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
          console.log(data);
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
};
