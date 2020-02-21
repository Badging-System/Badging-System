const JSONResponse = require("../../service/response/JSONResponse");
const Team = require("../../../models/Team");
const User = require("../../../models/User");
const {Mongo} = require("../../database/mongoDB");
const mongoose = require("mongoose");

const mongoDB = new Mongo();

exports.index = (req, res) => {
  //Get all the collection data based off the Team model
  console.log("HERE");
  mongoDB.getTeamInfo()
    .then(data => {
      console.log("done");
      JSONResponse(
        res, {
          data: data
        },
        200
      );
    })
    .catch(err => {
      console.log(err);
    });
};

/**
 * Returns team count
 * @return {number}       [number of teams]
 */
exports.count = (req, res) => {
  //Get all the collection data based off the Team model
  mongoDB
    .getCollectionData(Team)
    .then(async data => {
      JSONResponse(
        res,
        {
          data: data.length
        },
        200
      );
    })
    .catch(error => {
      JSONResponse(
        res,
        {
          error: error
        },
        500
      );
    });
};

exports.team_id = (req, res) => {
  JSONResponse(
    res,
    {
      message: "Returning a team object"
    },
    200
  );
};

exports.addTeam = async (req, res) => {
  let collection = "teams";
  mongoDB
    .insertOneDocument(collection, req.body)
    .then(response => {
      JSONResponse(
        res,
        {
          message: req.body
        },
        201
      );
    })
    .catch(err => {
      JSONResponse(
        res,
        {
          message: err
        },
        403
      );
    });
};

exports.addTeamMember = async (req, res) => {
  JSONResponse(
    res,
    {
      message: "Adding a new member to a team"
    },
    200
  );
};

//format data to match table
function table_format(response) {
  return new Promise((resolve, reject) => {});
}
