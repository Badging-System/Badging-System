const JSONResponse = require("../../service/response/JSONResponse");
const mongoose = require("mongoose");
const Badge = require("../../../models/Badge");
const { Mongo } = require("../../database/mongoDB");

const mongoDB = new Mongo();

exports.index = (req, res) => {
  mongoDB.mongooseConnect();
  Badge.find({}, function(err, badges) {
    if (err) {
      console.log(err);
    } else {
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
