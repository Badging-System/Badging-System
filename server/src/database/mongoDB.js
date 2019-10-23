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
      // document to be inserted
      var doc = {name: "Roshan", age: "22"};
      db.collection( "User" ).insertOne( doc, function ( err, res )
      {
        if ( err ) throw err;
        console.log( "Document inserted" );
        // close the connection to db when you are done with it
        db.close();
      } );

    } );

  }



}

module.exports = {Mongo};
