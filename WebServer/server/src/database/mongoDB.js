const mongoose = require("mongoose");
const test = require("assert");
var Promise = require("promise");
const Team = require("../../models/Team");
const User = require("../../models/User");

require("dotenv").config();

class Mongo {
  constructor() {
    this.url = process.env.HOST;
    this.db = process.env.DBNAME;
  }

  async mongooseConnect() {
    await mongoose.connect(process.env.HOST + process.env.DBNAME, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }

  async mongoogeDisconnect() {
    await mongoose.connection.close();
  }

  insertOneDocument(collectionName, reqObj) {
    return new Promise(function (resolve, reject) {
      try {
        mongoose.connect(
          process.env.HOST + process.env.DBNAME,
          {
            useNewUrlParser: true,
            useUnifiedTopology: true
          },
          function (err, db) {
            if (err) throw err;
            var db = mongoose.connection;
            db.on("error", console.error.bind(console, "connection error:"));

            db.collection(collectionName).insertOne(reqObj, function (err, res) {
              if (err) throw err;
              console.log(
                `One new document has been inserted into the collection ${collectionName}`
              );
              db.close();
              resolve();
            });
          }
        );
      } catch (e) {
        console.error(e);
        reject(e);
      }
    });
  }

  insertManyDocuments(collectionName, reqObj) {
    return new Promise(function (resolve, reject) {
      try {
        mongoose.connect(
          process.env.HOST + process.env.DBNAME,
          {
            useNewUrlParser: true,
            useUnifiedTopology: true
          },
          function (err, db) {
            if (err) throw err;
            var db = mongoose.connection;
            db.on("error", console.error.bind(console, "connection error:"));

            db.collection(collectionName).insertMany(reqObj, function (
              err,
              res
            ) {
              if (err) throw err;
              console.log(
                `${res.insertedCount} documents have been inserted into the collection ${collectionName}`
              );
              db.close();
              resolve();
            });
          }
        );
      } catch (e) {
        console.error(e);
        reject(e);
      }
    });
  }
  /**
   * This function returns a collection of all the data in the database based off the model
   * @param  {Model} model [Model of collection]
   * @return {Promise}
   */
  async getCollectionData(model, filter = {}) {
    await mongoose.connect(process.env.HOST + process.env.DBNAME, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    return new Promise((resolve, reject) => {
      model.find(filter).exec((err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
  /**
   * This function returns data based of the model and filter provided
   * @param  {Model}  model  [Model of the collection]
   * @param  {Object}  filter [Filter must proved the appropriate attributes based off of model]
   * @return {Promise}
   */
  findOne(model, filter) {

    return new Promise((resolve, reject) => {
      try {
        mongoose.connect(process.env.HOST + process.env.DBNAME, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        });
        model.find(filter).exec((err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      } catch (e) {
        console.error(e);
        reject(e);
      }

    });
  }

  getTeamInfo() {
    return new Promise((resolve, reject) => {
      try {
        mongoose.connect(process.env.HOST + process.env.DBNAME, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        });
        Team.find({})
          .populate("Coach")
          .populate("Members")
          .exec((err, team) => {
            if (err) {
              reject(err);
            } else {
              resolve(team);
            }
          });
      } catch (e) {
        console.error(e);
        reject(e);
      }
    });
  }

  getTopTeams(admin_id) {
    return new Promise((resolve, reject) => {
      try {
        mongoose.connect(process.env.HOST + process.env.DBNAME, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        });
        Team.find({ Admin: admin_id })
          .populate("Coach")
          .populate("Badges") 
          .populate("Members")
          .sort([['Badges', 'descending']])
          .exec((err, team) => {
            if (err) {
              reject(err);
            } else {
              resolve(team);
            }
          });
      } catch (e) {
        console.error(e);
        reject(e);
      }
    });
  }

  getTopUsers(team_ids) {
    team_ids = ["5e95f4489d0e4d0018e44a8b"]
    return new Promise((resolve, reject) => {
      try {
        mongoose.connect(process.env.HOST + process.env.DBNAME, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        });
        User.find({ 
          Team: {
              $in: [team_ids]
          }
          })
          .populate({ 
            path: 'Team',
            populate: {
              path: 'Coach',
              model: User
            } 
         })
          .exec((err, team) => {
            if (err) {
              reject(err);
            } else {
              resolve(team);
            }
          });
      } catch (e) {
        console.error(e);
        reject(e);
      }
    });
  }

  /**
   * This function returns data based off of username and/or email exists in database
   * @param {*} user [Represents model of users collection]
   * @param {*} userObj [Either one user or multiple users defined as a user object]
   * @return {Promise}
   */
  validateUserNameEmail(user, userObj) {
    return new Promise((resolve, reject) => {
      try {
        mongoose.connect(process.env.HOST + process.env.DBNAME, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        });

        if (userObj.length > 1) {
          var userNameEmailArray = [];
          userObj.forEach(function (userInfo) {
            userNameEmailArray.push(
              {
                Username: userInfo.Username
              },
              {
                Email: userInfo.Email
              }
            );
          });
          var query = {
            $or: userNameEmailArray
          };
        } else {
          var query = {
            $or: [
              {
                Username: userObj.Username
              },
              {
                Email: userObj.Email
              }
            ]
          };
        }

        user.findOne(query).exec((err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      } catch (e) {
        console.error(e);
        reject(e);
      }
    });
  }

  getUserTeamMembers(Team, teamID) {
    return new Promise((resolve, reject) => {
      try {
        mongoose.connect(process.env.HOST + process.env.DBNAME, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        });
        Team.findOne({_id: teamID}, {Members: 1, _id: 0})
          .populate("Members")
          .exec((err, team) => {
            if (err) {
              reject(err);
            } else {
              resolve(team);
            }
          });
      } catch (e) {
        console.error(e);
        reject(e);
      }
    });
  }
}

module.exports = {
  Mongo
};
