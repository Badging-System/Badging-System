var expect = require('chai').expect;
var request = require('request');
require('dotenv').config()

/* This test the main page response to ensure the response is correct */
it('Main page content', function(done) {
  request('http://localhost:8080/api/', function(error, response, body) {
    expect(response.statusCode).to.equal(200);
    expect(body).to.equal('Welcome to the Badging System API');
    done();
  });
});

/* This test that the endpoint returns the correct type of object */
describe('User Endpoints', function() {

  /* This test the user endpoint testing if the it recieve the id poarameter */
  it('User Query Param', function(done) {
    this.timeout(15000);
    request('http://localhost:8080/api/users/msrober', function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      let res = JSON.parse(response.body); //parse payload
      done();
    });
  });

  //Only run this test if the enviroment is DEV
  (process.env.ENV === 'DEV' ? it : it.skip)('DEV Environment User Endpoints', () => {
    /* This test that the database is seeded with the correct amount of users in the development enviroment */
    it('should list the seeded database', function(done) {
      this.timeout(15000);
      request('http://localhost:8080/api/users/', function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        let res = JSON.parse(response.body); //parse payload
        expect(res.payload.data).to.have.lengthOf(5);
        done();
      });
    });
  });

  //Only run this test if the enviroment is DEV
  (process.env.ENV === 'DEV' ? it : it.skip)('DEV Environment User Endpoints', () => {
    /* This test that the endpoint returns the correct type of object */
    it('User Endpoint', function(done) {
      this.timeout(15000);
      request('http://localhost:8080/api/users/msrober', function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        let res = JSON.parse(response.body); //parse payload
        expect(res.payload.data[0])
          .to.have.property('Username', 'msrober')
        expect(res.payload.data[0])
          .to.have.property('First_name', 'Mitchell')
        expect(res.payload.data[0])
          .to.have.property('Last_name', 'Roberts')
        expect(res.payload.data[0])
          .to.have.property('Status', 'User')
        expect(res.payload.data[0])
          .to.have.property('Email', 'msrober@gmail.com')
        done();
      });
    });
  });
});
