const mongoose = require("mongoose");
require("dotenv").config();
var fs = require("fs");
var seedPlayers = require("./seedPlayers").seedUsers;
var seedAdmins = require("./seedAdmin").seedAdmins;
var seedCoaches = require("./seedCoach").seedCoaches;
var seedTeams = require("./seedTeam").seedTeams;
var updateTeamMembers = require("./seedTeam").updateTeamMembers;

const insertTeams = readInParseToJson("./server/Seed/teams.json");
const insertUsers = readInParseToJson("./server/Seed/users.json");
const insertAdmins = readInParseToJson("./server/Seed/admins.json");
const insertCoaches = readInParseToJson("./server/Seed/coaches.json");

function readInParseToJson(path) {
  var fd = fs.openSync(path, "r");
  var faqData = "";
  do {
    var buf = new Buffer.alloc(5);
    buf.fill();
    var bytes = fs.readSync(fd, buf, null, 5);
    faqData += buf.toString();
  } while (bytes > 0);
  fs.closeSync(fd);
  faqData = faqData.replace(/[\u0000-\u0019]+/g, "");
  return JSON.parse(faqData);
}

async function seedDB() {
  let insertedAdminIds = await seedAdmins(insertAdmins);
  let insertedCoachIds = await seedCoaches(insertCoaches);
  let insertedTeams = await seedTeams(
    mapAdminCoachToTeam(insertTeams, insertedAdminIds[0], insertedCoachIds[0])
  );
  let insertedUserIds = await seedPlayers(
    mapTeamToUser(insertUsers, insertedTeams.insertedIds[0])
  );
  let teamUpdate = await updateTeamMembers(
    insertedTeams.insertedIds[0],
    insertedUserIds.insertedIds
  );
}

function mapTeamToUser(users, teamId) {
  users.forEach(user => {
    user.Team = mongoose.Types.ObjectId(teamId);
  });
  return users;
}

function mapAdminCoachToTeam(teams, adminId, coachId) {
  teams.forEach(team => {
    team.Admin = mongoose.Types.ObjectId(adminId);
    team.Coach = mongoose.Types.ObjectId(coachId);
  });
  return teams;
}
seedDB();
