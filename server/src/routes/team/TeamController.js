const JSONResponse = require('../../service/response/JSONResponse');
const InvalidInput = require('../../service/response/InvalidInput');
const Team = require('../../../models/Team')
const {Mongo} = require("../../database/mongoDB");

const mongoDB = new Mongo();

exports.index = (req, res) => {
  JSONResponse(res, {
    message: "Returning a list of teams"
  }, 200);
};

exports.team_id = (req, res) => {
  JSONResponse(res, {
    message: "Returning a team object"
  }, 200);
};

exports.addTeam = async (req, res) => {
  JSONResponse(res, {
    message: "Adding a team"
  }, 200);
};

exports.addTeamMember = async (req, res) => {
  JSONResponse(res, {
    message: "Adding a new member to a team"
  }, 200);
}
