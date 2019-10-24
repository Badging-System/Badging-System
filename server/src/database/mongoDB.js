class Mongo
{
  connectMongoDB ()
  {
    const MongoClient = require('mongodb').MongoClient
    const test = require('assert');

    // URL to connect to mongoDB locally
    const url = process.env.HOST;
    const dbName = process.env.DBNAME;
    // Connection to mongoDB
    MongoClient.connect(url, {useUnifiedTopology: true}, function (err, client)
    {
      // const collection = client.db( dbName ).collection( 'User' );
      if (err) throw err;
      console.log("Successfully connected to MongoDB...");

    });

  }



}

module.exports = {Mongo};
