const User = require('./models/User');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({path: path.join(__dirname, './.env')});

//seed our db
function seedUsers(callback) {
  const usersForTeam = [{
    Username: "bobbo",
    First_name: "Bob",
    Last_name: "Smith",
    Role: "User",
    Active: true,
    Email: "bob@gmail.com"
  },
  {
    Username: "msrober",
    First_name: "Mitchell",
    Last_name: "Roberts",
    Role: "User",
    Active: true,
    Email: "msrober@gmail.com"
  },
  {
    Username: "gdeshpande",
    First_name: "Gaurav",
    Last_name: "Deshpande",
    Role: "User",
    Active: true,
    Email: "gdeshpande@gmail.com"
  },
  {
    Username: "dmaitha",
    First_name: "David",
    Last_name: "Maitha",
    Role: "User",
    Active: true,
    Email: "dmaitha@gmail.com"
  },
  {
    Username: "rtonthat",
    First_name: "Ryan",
    Last_name: "Tonthat",
    Role: "User",
    Active: true,
    Email: "rtonthat@gmail.com"
  },
  {
    Username: "hzhou",
    First_name: "Hongyuan",
    Last_name: "Zhou",
    Role: "User",
    Active: true,
    Email: "hzhou@gmail.com"
  }
  ];

  mongoose.connect(process.env.HOST + process.env.DBNAME, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    if (process.env.ENV === 'DEV') {
      //use User model to insert/save
      User.userModel.deleteMany({}, () => {
        User.userModel.collection.insertMany(usersForTeam, function (err, docs) {
          if (err) {
            return console.error(err);
          } else {
            console.log("User documents inserted to Collection");
            mongoose.connection.close();
            if (callback) callback();
          }
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
          Team.collection.insertMany(team_data, function (err, docs) {
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
