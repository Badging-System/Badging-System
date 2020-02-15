const User = require("../models/User");
const mongoose = require("mongoose");

async function seedCoaches(insertData, callback) {
  await mongoose.connect(process.env.HOST + process.env.DBNAME, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  await User.deleteMany({ Status: "Coach" });
  let result = await User.collection.insertMany(insertData);
  await mongoose.connection.close();
  return result;
}
// function seedCoaches(insertData, callback) {
//   let insertedCoachIds;
//   mongoose
//     .connect(process.env.HOST + process.env.DBNAME, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     })
//     .then(() => {
//       if (process.env.ENV === "DEV") {
//         User.collection.insertMany(insertData, function(err, docs) {
//           insertedCoachIds = docs.insertedIds;
//           if (err) {
//             return console.error(err);
//           } else {
//             console.log("Coach documents inserted to Collection");
//             mongoose.connection.close();
//             // callback();
//           }
//         });
//       } else {
//         console.log("Database was not seeded");
//       }
//     });
//   mongoose.Promise = global.Promise;
//   mongoose.connection.on("error", error => {
//     console.log("Problem connection to the database" + error);
//   });
//   return insertedCoachIds;
// }

module.exports.seedCoaches = seedCoaches;
