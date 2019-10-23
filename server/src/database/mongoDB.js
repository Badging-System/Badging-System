class Mongo
{
  connectMongoDB ()
  {
    var MongoClient = require( 'mongodb' ).MongoClient

    var assert = require( 'assert' )
    // URL to connect to mongoDB locally
    var url = 'mongodb://localhost:27018/badging-system'

    // Connection to mongoDB
    MongoClient.connect( url, function ( err, db )
    {
      assert.equal( null, err );
      console.log( "Successfully connected to MongoDB..." );

      db.close();
    } );

  }
}

module.exports = {Mongo};
