const chai = require('chai');
var expect = require('chai').expect;
var request = require('request-promise');
const async = require('async');
const axios = require('axios');
var app = require('../app');
var server;
var http = require('http');
var debug = require('debug')('server:server');
var seed = require('../seed')

require('dotenv').config();

describe('Main Page content', function() {
  this.timeout(5000);
  before(done => {
    var port = parseInt(process.env.PORT || '3000', 10);
    app.set('port', port);
    server = http.createServer(app);
    server.listen(port,"localhost", function() {
      seed.seedUsers().then(async (obj) => {
        done();
      }).catch((error) => {
        console.log(error);
        done();
      });
    });
  });
  /* This test the main page response to ensure the response is correct */
  it('should return succesful status 200', function(done) {
    request('http://localhost:' + process.env.PORT + '/api/').then((response) => {
      let parsedRes = JSON.parse(response)
      expect(parsedRes.status).to.equal(200);
      expect(parsedRes.payload.message).to.equal('Welcome to the Badging System API');
      done();
    }).catch(done);
  });

  after(done => {
    server.close(done);
  });
});

/* This test that the endpoint returns the correct type of object */
describe('User Endpoints', function() {
  this.timeout(5000);
  before(done => {
    var port = parseInt(process.env.PORT || '3000', 10);
    app.set('port', port);
    server = http.createServer(app);
    server.listen(port,"localhost", function() {
      seed.seedUsers().then(async (obj) => {
        done();
      }).catch((error) => {
        console.log(error);
        done();
      });
    });
  });
  /* This test the user endpoint testing if the it recieve the id poarameter */
  it('User Query Param', function(done) {
    //this.timeout(15000);
    request('http://localhost:' + process.env.PORT + '/api/users/msrober').then((response) => {
      let parsedRes = JSON.parse(response)
      expect(parsedRes.status).to.equal(200);
      done();
    }).catch(done);
  });

  /* This test the user endpoint testing if the api sends the correct response if it fails */
  it('should fail posting a user to the database', function(done) {
    //this.timeout(15000);
    // Post a user object to the database
    axios.post('http://localhost:' + process.env.PORT + '/api/users/adduser', {
        Username: "dbooker",
        First_name: "devin",
        Last_name: "booker",
        Status: "Baller",
        Email: "dbook@suns.com",
      })
      .then(function(response) {
        expect(response.data.status).to.equal(403);
        done();
      })
      .catch(function(error) {
        console.log(error);
        done();
      });
  });

  /* This test the user endpoint testing if the api sends the correct response if it fails */
  it('should fail posting a user to the database - Incorrect Email Format', function(done) {
    //this.timeout(15000);
    // Post a user object to the database
    axios.post('http://localhost:' + process.env.PORT + '/api/users/adduser', {
        Username: "dbooker",
        First_name: "devin",
        Last_name: "booker",
        Status: "User",
        Email: "Incorrect Formatted Email",
      })
      .then(function(response) {
        expect(response.data.status).to.equal(403);
        done();
      })
      .catch(function(error) {
        console.log(error);
        done();
      });
  });
  /* This tests the user endpoint testing if the api sends the correct response if it passes */
  it('should succesfully post a user to the database', function(done) {
    //this.timeout(15000);
    // Post a user object to the database
    axios.post('http://localhost:' + process.env.PORT + '/api/users/adduser', {
        Username: "dbooker",
        First_name: "devin",
        Last_name: "booker",
        Status: "User",
        Email: "dbook@suns.com"
      })
      .then(function(response) {
        expect(response.data.status).to.equal(201);
        done();
      })
      .catch(function(error) {
        console.log(error);
        done();
      });
  });

  //Only run this test if the enviroment is DEV
  (process.env.ENV === 'DEV' ? it : it.skip)('DEV Environment User Endpoints', () => {
    /* This test that the database is seeded with the correct amount of users in the development enviroment */
    it('should list the seeded database', function(done) {
      //this.timeout(15000);
      request('http://localhost:' + process.env.PORT + '/api/users/').then((response) => {
        let parsedRes = JSON.parse(response)
        expect(parsedRes.status).to.equal(200);
        expect(parsedRes.payload.data).to.have.lengthOf(5);
        done();
      }).catch(done);
    });
  });

  //Only run this test if the enviroment is DEV
  (process.env.ENV === 'DEV' ? it : it.skip)('DEV Environment User Endpoints', () => {
    /* This test that the endpoint returns the correct type of object */
    it('should return the correct type of object (User)', function(done) {
      //this.timeout(15000);
      request('http://localhost:' + process.env.PORT + '/api/users/msrober').then((response) => {
        let parsedRes = JSON.parse(response) //parse payload
        expect(parsedRes.status).to.equal(200);
        expect(parsedRes.payload.data[0])
          .to.have.property('Username', 'msrober')
        expect(parsedRes.payload.data[0])
          .to.have.property('First_name', 'Mitchell')
        expect(parsedRes.payload.data[0])
          .to.have.property('Last_name', 'Roberts')
        expect(parsedRes.payload.data[0])
          .to.have.property('Status', 'User')
        expect(parsedRes.payload.data[0])
          .to.have.property('Email', 'msrober@gmail.com')
        done();
      }).catch(done);
    });
  });

  after(done => {
    server.close(done);
  });
});
