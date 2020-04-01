const mongoose = require("mongoose");
var fs = require("fs");
var seedPlayers = require("./seedPlayers").seedUsers;
var seedAdmins = require("./seedAdmin").seedAdmins;
var seedCoaches = require("./seedCoach").seedCoaches;
var seedTeams = require("./seedTeam").seedTeams;
var updateTeamMembers = require("./seedTeam").updateTeamMembers;
var seedBadges = require("./seedBadges").seedBadges;
var seedBadgeUserJoin = require("./seedUserBadgeJoin").seedBadgeUserJoin;
const relPath = require("path");
const insertTeams = readInParseToJson("./Seed/teams.json");
const insertUsers = readInParseToJson("./Seed/users.json");
const insertAdmins = readInParseToJson("./Seed/admins.json");
const insertCoaches = readInParseToJson("./Seed/coaches.json");
const insertBadges = readInParseToJson("./Seed/badges.json");
const insertTasks = readInParseToJson("./Seed/tasks.json");

function readInParseToJson(path) {
  var fd = fs.openSync(relPath.resolve(process.cwd(), path), "r");
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
//Main entry point to seed related data.
async function seedDB(callback) {
  let insertedAdminIds = await seedAdmins(insertAdmins);
  let insertedCoachIds = await seedCoaches(insertCoaches);
  let insertedTeams = await seedTeams(
    mapAdminCoachToTeam(insertTeams, insertedAdminIds[0], insertedCoachIds[0])
  );
  let insertedUsers = await seedPlayers(
    mapTeamToUser(insertUsers, insertedTeams.insertedIds[0])
  );
  let teamUpdate = await updateTeamMembers(
    insertedTeams.insertedIds[0],
    insertedUsers.insertedIds
  );
  badgeItems = generateTasksWithIds(insertTasks); //generate mongo ids
  insertBadges[0].Tasks = badgeItems.tasks; //assign Tasks array for badge
  insertBadges[0].Team = insertedTeams.insertedIds[0];
  let insertedBadges = await seedBadges(insertBadges);
  let badgeUserJoinData = generateBadgeUserJoinData(
    insertedUsers.insertedIds,
    insertedTeams.insertedIds[0],
    insertedBadges.insertedIds[0],
    badgeItems.ids
  );
  await seedBadgeUserJoin(badgeUserJoinData);
  callback();
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

function generateTasksWithIds(tasks) {
  items = {
    ids: [],
    tasks: []
  };
  tasks.forEach(task => {
    task._id = mongoose.Types.ObjectId();
    items.ids.push(task._id);
  });
  items.tasks = tasks;
  return items;
}

function generateBadgeUserJoinData(userIds, teamId, badgeId, taskIds) {
  let dataArr = [];
  for (let [key, value] of Object.entries(userIds)) {
    let newData = {
      User: value,
      Team: teamId,
      Badge: badgeId,
      Tasks_Completed: taskIds,
      Award: true
    };
    dataArr.push(newData);
  }
  return dataArr;
}
// seedDB();

module.exports.seedDB = seedDB;
