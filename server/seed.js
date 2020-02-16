const User = require("./models/User");
const Team = require("./models/Team");
const user_data = require("./SeedData").user_data;
const team_data = require("./SeedData").team_data;
const mongoose = require("mongoose");
const path = require("path");
const args = require("minimist")(process.argv.slice(2));
require("dotenv").config({
  path: path.join(__dirname, "../.env")
});

function seeder(callback) {
  if (args && args["seed"]) {
    if (args["seed"] === "all") {
      seedUsers(seedTeams);
    } else {
      switch (args["seed"]) {
        case "user":
          seedUsers(callback);
        case "team":
          seedTeams(callback);
      }
    }
  }
}

//seed our db with user data
function seedUsers(callback) {
  mongoose
    .connect(process.env.HOST + process.env.DBNAME, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      if (process.env.ENV === "DEV") {
        console.log(User);

        //use User model to insert/save
        User.deleteMany({}, () => {
          User.collection.insertMany(user_data, function(err, docs) {
            if (err) {
              return console.error(err);
            } else {
              console.log("User documents inserted to Collection");
              mongoose.connection.close();
              if (callback) callback();
            }
          });
        });
      } else {
        console.log("Database was not seeded with Users");
      }
    });
  mongoose.Promise = global.Promise;
  mongoose.connection
    .on("error", error => {
      console.log("Problem connection to the database" + error);
    })
    .catch(err => {
      console.log(err);
    });
}

//seed our db with team data
function seedTeams(callback) {
  mongoose
    .connect(process.env.HOST + process.env.DBNAME, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      if (process.env.ENV === "DEV") {
        //use Team model to insert/save
        Team.deleteMany({}, () => {
          Team.collection.insertMany(team_data, function(err, docs) {
            if (err) {
              return console.error(err);
            } else {
              console.log("Team documents inserted to Collection");
              mongoose.connection.close();
              if (callback) callback();
            }
          });
        });
      } else {
        console.log("Database was not seeded with Teams");
      }
    });
  mongoose.Promise = global.Promise;
  mongoose.connection.on("error", error => {
    console.log("Problem connection to the database" + error);
  });
}

seeder();

module.exports.seedUsers = seedUsers;
module.exports.seedTeams = seedTeams;
