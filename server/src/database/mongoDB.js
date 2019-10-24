class Mongo
{
  connectMongoDB ()
  {
    const MongoClient = require('mongodb').MongoClient
    const test = require('assert');

    // URL to connect to mongoDB locally
    const url = 'mongodb://localhost:27018/';
    const dbName = 'badging-system'
    // Connection to mongoDB
    MongoClient.connect(url, {useUnifiedTopology: true}, function (err, client)
    {
      // const collection = client.db( dbName ).collection( 'User' );
      // console.log( "Switched to " + db.databaseName + " database" );
      if (err) throw err;
      console.log("Successfully connected to MongoDB...");

    });

  }



}

module.exports = {Mongo};
