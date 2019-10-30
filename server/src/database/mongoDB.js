const mongoose = require('mongoose');
// const MongoClient = require('mongodb').MongoClient
const test = require('assert');
const seeder = require('../../seed');
var Promise = require('promise');

class Mongo
{
  constructor()
  {
    this.url = process.env.HOST;
    this.dbName = process.env.DBNAME;
  }

  connectMongoDB ()
  {

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
    try
    {
      mongoose.connect(this.url + this.dbName, {useNewUrlParser: true, useUnifiedTopology: true}, function (err, db)
      {
        if (err) throw err;
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));

        db.collection(collectionName).insertOne(reqObj, function (err, res)
        {
          if (err) throw err;
          console.log(`One new document has been inserted into the collection ${collectionName}`);
          db.close();
        });

      })
    } catch (e)
    {
      console.error(e)
    }

  };

  insertManyDocuments (collectionName, reqObj)
  {
    try
    {
      console.log(reqObj);
      // const url = process.env.HOST;
      // const dbName = process.env.DBNAME;
      mongoose.connect(this.url + this.dbName, {useNewUrlParser: true, useUnifiedTopology: true}, function (err, db)
      {
        if (err) throw err;
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));

        db.collection(collectionName).insertMany(reqObj, function (err, res)
        {
          if (err) throw err;
          console.log(`${res.insertedCount} documents have been inserted into the collection ${collectionName}`);
          db.close();
        });

      })
    } catch (e)
    {
      console.error(e)
    }

  };
  async validateOneUsername (collectionName, reqObj)
  {
    try
    {
      await mongoose.connect(this.url + this.dbName, {useNewUrlParser: true, useUnifiedTopology: true}, function (err, db)
      {
        if (err) throw err;
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        console.log(`this is the reqObj username: ${reqObj.Username}`);
        var query = {Username: reqObj.Username}
        let finalResult;
        db.collection(collectionName).findOne(query).then(function (err, result)
        {
          console.log('im inside this find one block');
          if (err) throw err;
          db.close();
          finalResult = result;
        }).catch(err);

        return Promise.resolve(finalResult);
      })
    } catch (e)
    {
      console.log('error is thrown here')
      console.error(e)
    }
  }

}


module.exports = {Mongo};
