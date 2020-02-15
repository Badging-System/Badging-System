const User = require("../models/User");
const mongoose = require("mongoose");

async function seedAdmins(insertData, callback) {
  await mongoose.connect(process.env.HOST + process.env.DBNAME, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  await User.deleteMany({ Status: "Admin" });
  let result = await User.collection.insertMany(insertData);
  await mongoose.connection.close();
  return result;
}
// function seedAdmins(insertData, callback) {
//   mongoose
//     .connect(process.env.HOST + process.env.DBNAME, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });
//     .then(() => {
//       if (process.env.ENV === "DEV") {
//         User.collection.insertMany(insertData, function(err, docs) {
//           insertedAdminIds = docs.insertedIds;
//           if (err) {
//             return console.error(err);
//           } else {
//             console.log("Admin documents inserted to Collection");
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
//}

module.exports.seedAdmins = seedAdmins;
