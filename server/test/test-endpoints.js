var expect = require('chai').expect;
var request = require('request');

/* This test the main page response to ensure the response is correct */
it('Main page content', function(done) {
  request('http://localhost:8080/api/', function(error, response, body) {
    expect(response.statusCode).to.equal(200);
    expect(body).to.equal('Welcome to the Badging System API');
    done();
  });
});

/* This test the user endpoint testing if the it recieve the id poarameter */
it('User Query Param', function(done) {
  request('http://localhost:8080/api/users/1234', function(error, response, body) {
    let res = JSON.parse(response.body); //parse payload
    expect(response.statusCode).to.equal(200);
    expect(res.payload.message).to.equal('Success 1234');
    done();
  });
});
