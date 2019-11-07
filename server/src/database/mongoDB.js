const mongoose = require('mongoose');
const test = require('assert');
const seeder = require('../../seed');
var Promise = require('promise');
const User = require('../../models/User');


class Mongo {
  constructor() {
    this.url = process.env.HOST;
    this.dbName = process.env.DBNAME;
  }

  connectMongoDB() {

    mongoose.connect(this.url + this.dbName, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 15000
    }).then(() => {
      if (process.env.ENV === 'DEV') {
        seeder.seedUsers(function() { //seed db first
          console.log('Database has been seeded!');
        });
      } else if (process.env.ENV === 'PROD') {
        console.log('Database has not been seeded!');
      }
<<<<<<< HEAD
      // db.close();
=======
>>>>>>> dev
    });

    mongoose.Promise = global.Promise;
    mongoose.connection.on("error", error => {
      console.log('Problem connection to the database' + error);
    });
  };

  insertOneDocument(collectionName, reqObj) {
    try {
      mongoose.connect(this.url + this.dbName, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }, function(err, db) {
        if (err) throw err;
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));

        db.collection(collectionName).insertOne(reqObj, function(err, res) {
          if (err) throw err;
          console.log(`One new document has been inserted into the collection ${collectionName}`);
          db.close();
        });

      });
    } catch (e) {
      console.error(e)
    }

  };

  insertManyDocuments(collectionName, reqObj) {
    try {
      mongoose.connect(this.url + this.dbName, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }, function(err, db) {
        if (err) throw err;
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));

        db.collection(collectionName).insertMany(reqObj, function(err, res) {
          if (err) throw err;
          console.log(`${res.insertedCount} documents have been inserted into the collection ${collectionName}`);
          db.close();
        });

      })
    } catch (e) {
      console.error(e)
    }

  };
  /**
   * This function returns a collection of all the data in the database based off the model
   * @param  {Model} model [Model of collection]
   * @return {Promise}
   */
  async getCollectionData(model) {
    await mongoose.connect(this.url + this.dbName, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    return new Promise((resolve, reject) => {
      model.find({})
        .exec((err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        })
    });
  };
  /**
   * This function returns data based of the model and filter provided
   * @param  {Model}  model  [Model of the collection]
   * @param  {Object}  filter [Filter must proved the appropriate attributes based off of model]
   * @return {Promise}
   */
  async findOne(model, filter) {
    await mongoose.connect(this.url + this.dbName, {
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
        })
    });
  };

}


module.exports = {
  Mongo
};
