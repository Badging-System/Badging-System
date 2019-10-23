const express = require( 'express' );
const router = express.Router();

const UserRoutes = require( "./user/UserRoutes" );
const {Mongo} = require( "./../database/mongoDB" );

/* Handles all routes associated the endpoint api */
router.use( '/users', UserRoutes );

router.get( '/', function ( req, res, next )
{
  const mongoDB = new Mongo()
  mongoDB.connectMongoDB()
  res.send( 'Welcome to the Badging System API' );
} );

module.exports = router;
