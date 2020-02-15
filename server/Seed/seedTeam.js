const Team = require("../models/Team");
const mongoose = require("mongoose");

async function seedTeams(insertData, callback) {
  await mongoose.connect(process.env.HOST + process.env.DBNAME, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  await Team.deleteMany({});
  let result = await Team.collection.insertMany(insertData);
  await mongoose.connection.close();
  return result;
}

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
