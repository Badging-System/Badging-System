const JSONResponse = require("../../service/response/JSONResponse");
const mongoose = require("mongoose");
const Badge = require("../../../models/Badge");
const BadgeUserJoin = require("../../../models/BadgeUserJoin");
const { Mongo } = require("../../database/mongoDB");

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

exports.progress = (req, res) => {
  mongoDB.mongooseConnect();
};
