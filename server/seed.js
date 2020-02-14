const User = require("./models/User");
const Team = require("./models/User");
const mongoose = require("mongoose");
require("dotenv").config();
var fs = require("fs");

const insertedTeams = readInParseToJson("./server/teams.json");
const insertUsers = readInParseToJson("./server/users.json");
const insertAdmins = readInParseToJson("./server/admins.json");
const insertCoaches = readInParseToJson("./server/coaches.json");
// console.log(insertUsers);

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

//seed our db
function seedUsers(insertData, callback) {
  console.log(process.env.HOST);
  mongoose
    .connect(process.env.HOST + process.env.DBNAME, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      if (process.env.ENV === "DEV") {
        //use User model to insert/save
        User.deleteMany({}, () => {
          User.collection.insertMany(insertData, function(err, docs) {
            console.log(docs.insertedIds);
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
seedUsers(insertUsers);

module.exports.seedUsers = seedUsers;
