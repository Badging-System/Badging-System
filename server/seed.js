const User = require("./models/User");
const mongoose = require("mongoose");
require("dotenv").config();

//seed our db
function seedUsers(callback) {
  const usersForTeam = [
    {
      Username: "bobbo",
      First_name: "Bob",
      Last_name: "Smith",
      Status: "User",
      Email: "bob@gmail.com"
    },
    {
      Username: "msrober",
      First_name: "Mitchell",
      Last_name: "Roberts",
      Status: "User",
      Email: "msrober@gmail.com"
    },
    {
      Username: "gdeshpande",
      First_name: "Gaurav",
      Last_name: "Deshpande",
      Status: "User",
      Email: "gdeshpande@gmail.com"
    },
    {
      Username: "dmaitha",
      First_name: "David",
      Last_name: "Maitha",
      Status: "User",
      Email: "dmaitha@gmail.com"
    },
    {
      Username: "rtonthat",
      First_name: "Ryan",
      Last_name: "Tonthat",
      Status: "User",
      Email: "rtonthat@gmail.com"
    },
    {
      Username: "hzhou",
      First_name: "Hongyuan",
      Last_name: "Zhou",
      Status: "User",
      Email: "hzhou@gmail.com"
    },
    {
      Username: "adminMitch",
      First_name: "Mitchell",
      Last_name: "admin",
      Status: "Admin",
      Email: "badgingAdmin@gmail.com"
    },
    {
      Username: "coachDave",
      First_name: "David",
      Last_name: "Coach",
      Status: "Coach",
      Email: "badgingCoach@gmail.com"
    }
  ];
  mongoose
    .connect(process.env.HOST + process.env.DBNAME, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      if (process.env.ENV === "DEV") {
        //use User model to insert/save
        User.deleteMany({}, () => {
          User.collection.insertMany(usersForTeam, function(err, docs) {
            if (err) {
              return console.error(err);
            } else {
              console.log("User documents inserted to Collection");
              mongoose.connection.close();
              // callback();
            }
          });
        });
      } else {
        console.log("Database was not seeded");
      }
    });
  mongoose.Promise = global.Promise;
  mongoose.connection.on("error", error => {
    console.log("Problem connection to the database" + error);
  });
}
seedUsers();

module.exports.seedUsers = seedUsers;
