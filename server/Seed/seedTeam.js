const Team = require("../models/Team");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "../../.env")
});

async function seedTeams(insertData) {
  await mongoose.connect(process.env.HOST + process.env.DBNAME, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  //delete first
  await Team.deleteMany({});
  let result = await Team.collection.insertMany(insertData);
  await mongoose.connection.close();
  return result;
}
//After teams and users are created, add the Mongo generated
//objectIds to the team Members value in the team schema.
async function updateTeamMembers(teamId, teamArr) {
  await mongoose.connect(process.env.HOST + process.env.DBNAME, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  let result = await Team.collection.updateOne(
    {
      _id: mongoose.Types.ObjectId(teamId)
    },
    { $set: { Members: teamArr } }
  );
  await mongoose.connection.close();
  return result;
}

module.exports.seedTeams = seedTeams;
module.exports.updateTeamMembers = updateTeamMembers;
