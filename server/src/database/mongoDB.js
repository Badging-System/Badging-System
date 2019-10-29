
class Mongo
{

  connectMongoDB ()
  {
    const mongoose = require('mongoose');
    const MongoClient = require('mongodb').MongoClient
    const test = require('assert');
    const seeder = require('../../seed');
    const url = process.env.HOST;
    const dbName = process.env.DBNAME;
    // URL to connect to mongoDB locally

    // Connection to mongoDB
    mongoose.connect(url + dbName, {useNewUrlParser: true, useUnifiedTopology: true}, function (err, db)
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
  insertOneDocument (newUser)
  {
    const mongoose = require('mongoose');
    try
    {
      const url = process.env.HOST;
      const dbName = process.env.DBNAME;
      mongoose.connect(url + dbName, {useNewUrlParser: true, useUnifiedTopology: true}, function (err, db)
      {
        if (err) throw err;
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));

        db.collection('users').insertOne(newUser);
        console.log(`The user ${newUser.First_name} has been inserted into the database`);
        db.close();
      })
    } catch (e)
    {
      console.log(`i am throwing an error`);
      console.error(e)
    }

  };
}

module.exports = {Mongo};
