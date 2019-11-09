const chai = require('chai');
var expect = require('chai').expect;
var request = require('request-promise');
const async = require('async');

require('dotenv').config()

/* This test the main page response to ensure the response is correct */
it('Main page content', function(done) {
  this.timeout(15000);
  request('http://localhost:8080/api/').then((response) => {
    let parsedRes = JSON.parse(response)
    expect(parsedRes.status).to.equal(200);
    expect(parsedRes.payload.message).to.equal('Welcome to the Badging System API');
    done();
  }).catch(done);
});

/* This test that the endpoint returns the correct type of object */
describe('User Endpoints', function() {
  /* This test the user endpoint testing if the it recieve the id poarameter */
  it('User Query Param', function(done) {
    this.timeout(15000);
    request('http://localhost:8080/api/users/msrober').then((response) => {
      let parsedRes = JSON.parse(response)
      expect(parsedRes.status).to.equal(200);
      done();
    }).catch(done);
  });

  //Only run this test if the enviroment is DEV
  (process.env.ENV === 'DEV' ? it : it.skip)('DEV Environment User Endpoints', () => {
    /* This test that the database is seeded with the correct amount of users in the development enviroment */
    it('should list the seeded database', function(done) {
      this.timeout(15000);
      request('http://localhost:8080/api/users/').then((response) => {
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
    it('User Endpoint', function(done) {
      this.timeout(15000);
      request('http://localhost:8080/api/users/msrober').then((response) => {
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
});