const mongoose = require('mongoose');
// const MongoClient = require('mongodb').MongoClient
const test = require('assert');
const seeder = require('../../seed');

class Mongo
{
  constructor()
  {
    this.url = process.env.HOST;
    this.dbName = process.env.DBNAME;
  }

  connectMongoDB ()
  {

    // const url = process.env.HOST;
    // const dbName = process.env.DBNAME;
    // URL to connect to mongoDB locally

    // Connection to mongoDB
    mongoose.connect(this.url + this.dbName, {useNewUrlParser: true, useUnifiedTopology: true}, function (err, db)
    {
      if (err) throw err;
      var db = mongoose.connection;
      console.log("Successfully connected to MongoDB...");
      if (process.env.ENV === 'DEV')
      {
        seeder.seedUsers(function ()
        { //seed db first
          console.log('Database has been seeded!');
        });
      } else if (process.env.ENV === 'PROD')
      {
        console.log('Database has not been seeded!');
      }
      // db.close()
    });
  }
  insertOneDocument (collectionName, reqObj)
  {
    const mongoose = require('mongoose');
    try
    {
      // const url = process.env.HOST;
      // const dbName = process.env.DBNAME;
      mongoose.connect(this.url + this.dbName, {useNewUrlParser: true, useUnifiedTopology: true}, function (err, db)
      {
        if (err) throw err;
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));

        db.collection(collectionName).insertOne(reqObj);
        console.log(`One new document has been inserted into the collection ${collectionName}`);
        db.close();
      })
    } catch (e)
    {
      console.error(e)
    }

  };
}

module.exports = {Mongo};
