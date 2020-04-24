const JSONResponse = require("../../service/response/JSONResponse");
const Badge = require("../../../models/Badge");
const BadgeUserJoin = require("../../../models/BadgeUserJoin");
const { Mongo } = require("../../database/mongoDB");
const InvalidInput = require("../../service/response/InvalidInput");
const mongoose = require("mongoose");

const mongoDB = new Mongo();

exports.index = (req, res) => {
  mongoDB.mongooseConnect();
  try {
    let docs = Badge.find({});
    JSONResponse(res, { data: docs }, 200);
  } catch (e) {
    InvalidInput(res, "Error retrieving all Badges");
  } finally {
    mongoDB.mongoogeDisconnect();
  }
};

exports.badgesByTeamId = async (req, res) => {
  let teamId = req.params.id;
  mongoDB.mongooseConnect();
  try {
    let docs = await Badge.find({ Team: teamId });
    JSONResponse(res, { data: docs }, 200);
  } catch (e) {
    InvalidInput(res, "Error retrieving Badges by team id");
  } finally {
    mongoDB.mongoogeDisconnect();
  }
};

exports.badgeManageByTeamId = async (req, res) => {
  let teamId = req.params.id;
  mongoDB.mongooseConnect();
  try {
    let docs = await BadgeUserJoin.find(
      { Team: teamId },
      { _id: 0, User: 1, Badge: 1, Tasks_Completed: 1 }
    )
      .populate({
        path: "User",
        select: "Username First_name Last_name Active Email",
      })
      .populate({ path: "Badge", select: "Name Team Tasks" });

    JSONResponse(res, { data: docs }, 200);
  } catch (e) {
    console.log(e);
    InvalidInput(res, "could not retreive data for badges by team");
  } finally {
    mongoDB.mongoogeDisconnect();
  }
};

exports.completeTask = async (req, res) => {
  let userId = req.body.user_id;
  let badgeId = req.body.badge_id;
  let taskId = req.body.task_id;
  mongoDB.mongooseConnect();
  try {
    let doc = await BadgeUserJoin.findOneAndUpdate(
      { Badge: badgeId, User: userId },
      { $push: { Tasks_Completed: taskId } }
    );
    JSONResponse(res, { data: doc }, 200);
  } catch (e) {
    InvalidInput(res, "Could not complete task");
  } finally {
    mongoDB.mongoogeDisconnect();
  }
};

exports.deleteTask = async (req, res) => {
  let userId = req.body.user_id;
  let badgeId = req.body.badge_id;
  let taskId = req.body.task_id;
  mongoDB.mongooseConnect();
  try {
    let doc = await BadgeUserJoin.findOneAndUpdate(
      { Badge: badgeId, User: userId },
      { $pull: { Tasks_Completed: taskId } }
    );
    JSONResponse(res, { data: doc }, 200);
  } catch (e) {
    InvalidInput(res, "Could not delete task");
  } finally {
    mongoDB.mongoogeDisconnect();
  }
};

exports.completedTasksById = async (req, res) => {
  let userId = req.query.user_id;
  let badgeId = req.query.badge_id;
  mongoDB.mongooseConnect();
  try {
    let doc = await BadgeUserJoin.findOne(
      { Badge: badgeId, User: userId },
      { _id: 0, User: 0, Team: 0, Badge: 0 }
    );
    JSONResponse(res, { data: doc }, 200);
  } catch (e) {
    InvalidInput(res, "Could not complete task by id");
  } finally {
    mongoDB.mongoogeDisconnect();
  }
};

exports.insertBadge = async (req, res) => {
  let newBadge = req.body;

  newBadge.Team = mongoose.Types.ObjectId(req.body.Team);
  newBadge.Tasks.forEach((task) => {
    task._id = mongoose.Types.ObjectId();
  });

  mongoDB.mongooseConnect();
  try {
    let doc = await Badge.create(newBadge);
    JSONResponse(res, { data: [doc] }, 200);
  } catch (e) {
    console.log(e);
    InvalidInput(res, "Could not insert new badge.");
  } finally {
    mongoDB.mongoogeDisconnect();
  }
};

exports.insertAssignedBadge = async (req, res) => {
  let newData = req.body;
  let newUserBadgeJoinDocs = [];

  if (newData.Users.length === 0) {
    InvalidInput(res, "Could not assign badges.");
  }
  newData.Users.forEach((data) => {
    let item = {
      User: data._id,
      Team: newData.Team,
      Badge: newData.Badge,
      Tasks_Completed: [],
      Award: false,
    };
    newUserBadgeJoinDocs.push(item);
  });
  mongoDB.mongooseConnect();
  try {
    let docs = await BadgeUserJoin.create(newUserBadgeJoinDocs);
    JSONResponse(res, { data: [docs] }, 200);
  } catch (e) {
    InvalidInput(res, "Could not assign badges.");
  } finally {
    mongoDB.mongoogeDisconnect();
  }
};
