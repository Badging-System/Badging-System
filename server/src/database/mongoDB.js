class Mongo
{
  connectMongoDB ()
  {
    var MongoClient = require( 'mongodb' ).MongoClient

    var assert = require( 'assert' )
    // URl that connections to mongoDB
    var url = 'mongodb://localhost:27018/badging-system'

    // Connection to mongoDB
    MongoClient.connect( url, function ( err, db )
    {
      assert.equal( null, err );
      console.log( "Connected successfully to server" );

      db.close();
    } );

  }
}

module.exports = {Mongo};
