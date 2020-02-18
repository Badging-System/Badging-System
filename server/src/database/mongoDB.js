const mongoose = require('mongoose');
const test = require('assert');
var Promise = require('promise');
require('dotenv').config();

class Mongo {
  constructor() {
    this.url = process.env.HOST;
    this.db = process.env.DBNAME;
  }

  insertOneDocument(collectionName, reqObj) {
    return new Promise(function (resolve, reject) {
      try {
        mongoose.connect(process.env.HOST + process.env.DBNAME, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        }, function (err, db) {
          if (err) throw err;
          var db = mongoose.connection;
          db.on('error', console.error.bind(console, 'connection error:'));

          db.collection(collectionName).insertOne(reqObj, function (err, res) {
            if (err) throw err;
            console.log(`One new document has been inserted into the collection ${collectionName}`);
            db.close();
            resolve();
          });

        });
      } catch (e) {
        console.error(e);
        reject(e);
      }
    });
  };

  insertManyDocuments(collectionName, reqObj) {
    return new Promise(function (resolve, reject) {
      try {
        mongoose.connect(process.env.HOST + process.env.DBNAME, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        }, function (err, db) {
          if (err) throw err;
          var db = mongoose.connection;
          db.on('error', console.error.bind(console, 'connection error:'));

          db.collection(collectionName).insertMany(reqObj, function (err, res) {
            if (err) throw err;
            console.log(`${res.insertedCount} documents have been inserted into the collection ${collectionName}`);
            db.close();
            resolve();
          });

        });
      } catch (e) {
        console.error(e);
        reject(e);
      }
    });
  };
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
      model.find(filter)
        .exec((err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
    });
  };
  /**
   * This function returns data based of the model and filter provided
   * @param  {Model}  model  [Model of the collection]
   * @param  {Object}  filter [Filter must proved the appropriate attributes based off of model]
   * @return {Promise}
   */
  async findOne(model, filter) {
    await mongoose.connect(process.env.HOST + process.env.DBNAME, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    return new Promise((resolve, reject) => {
      model.find(filter)
        .exec((err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
    });
  };

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
            userNameEmailArray.push({
              Username: userInfo.Username
            }, {
              Email: userInfo.Email
            });
          });
          var query = {
            $or: userNameEmailArray
          };
        } else {
          var query = {
            $or: [{
              Username: userObj.Username
            }, {
              Email: userObj.Email
            }]
          };
        }

        user.findOne(query)
          .exec((err, result) => {
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

  // addTeam(team) {
  //   return new Promise((resolve, reject) => {
  //     try {
  //       mongoose.connect(process.env.HOST + process.env.DBNAME, {
  //         useNewUrlParser: true,
  //         useUnifiedTopology: true
  //       });

  //     } catch (e) {
  //       console.error(e);
  //       reject(e);
  //     }
  //     resolve();
  //   });
  // }
}

module.exports = {
  Mongo
};