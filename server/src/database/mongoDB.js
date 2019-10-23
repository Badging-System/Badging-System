class Mongo
{
  connectMongoDB ()
  {
    const MongoClient = require( 'mongodb' ).MongoClient
    const test = require( 'assert' );

    // URL to connect to mongoDB locally
    const url = 'mongodb://localhost:27018/badging-system';
    const dbName = 'badging-system'
    // Connection to mongoDB
    MongoClient.connect( url, function ( err, client )
    {
      const col = client.db( dbName ).collection( 'User' );
      // const collection = db.collection( 'User' );
      // console.log( "Switched to " + db.databaseName + " database" );
      if ( err ) throw err;
      console.log( "Successfully connected to MongoDB..." );
      // document to be inserted
      col.insert( [{a: 1, b: 1}
        , {a: 2, b: 2}, {a: 3, b: 3}
        , {a: 4, b: 4}], {w: 1}, function ( err, result )
      {
        test.equal( null, err );
        // Show that duplicate records got dropped
        col.aggregation( {}, {cursor: {}} ).toArray( function ( err, items )
        {
          test.equal( null, err );
          test.equal( 4, items.length );
          client.close();
        } );
      } );


    } );

  }



}

module.exports = {Mongo};
