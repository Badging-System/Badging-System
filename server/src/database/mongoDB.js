class Mongo
{
  connectMongoDB ()
  {
    const mongoose = require('mongoose');
    const MongoClient = require('mongodb').MongoClient
    const test = require('assert');
    const seeder = require('../../seed');

    // URL to connect to mongoDB locally
    const url = process.env.HOST;
    const dbName = process.env.DBNAME;
    // Connection to mongoDB
    mongoose.connect(url + dbName, {useNewUrlParser: true, useUnifiedTopology: true}, function (err, client)
    {
      // const collection = client.db( dbName ).collection( 'User' );
      if (err) throw err;
      console.log("Successfully connected to MongoDB...");
      if (process.env.ENV === 'DEV')
      {
        seeder.seedUsers(function ()
        { //seed db first
          console.log('Database has been seeded!');
        });
      } else if (process.env.ENV === 'PROD')
      {
        console.log('Database has been not been seeded!');
      }
    });
  }
}

module.exports = {Mongo};
