const JSONResponse = require("../../service/response/JSONResponse");
const Team = require("../../../models/Team");
const User = require("../../../models/User");
const {Mongo} = require("../../database/mongoDB");
const mongoose = require("mongoose");
const moment = require("moment");


const mongoDB = new Mongo();

exports.index = (req, res) => {
  //Get all the collection data based off the Team model
  mongoDB.getTeamInfo()
    .then(data => {
      if (req.query.table_data) {
        table_format(data).then((formatted_data) => { //format the data to table data if requested
          JSONResponse(
            res, {
              data: formatted_data
            },
            200
          );
        }).catch((err) => {
          console.log(err);
        }); 
      } else {
        JSONResponse(
          res, {
            data: data
          },
          200
        );
      }
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
function table_format(data) {
  return new Promise((resolve, reject) => {
    const table_data =  data.map(team => ({
      name: team.Name,
      coach: team.Coach,
      playerCount: team.Members.length,
      createdOn: moment().format(),
      approved: team.Approved
    }));
    resolve(table_data);
  });
}
