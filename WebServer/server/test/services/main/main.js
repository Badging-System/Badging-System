const chai = require('chai');
var expect = require('chai').expect;
var request = require('request-promise');
const async = require('async');
const axios = require('axios');
var app = require('../../../app');
var server;
var http = require('http');
var debug = require('debug')('server:server');

describe('Main Page content', function () {
  this.timeout(15000);

  /* This test the main page response to ensure the response is correct */
  it('should return succesful status 200', function (done) {
    request(`http://localhost:${process.env.PORT}/api`).then((response) => {
      let parsedRes = JSON.parse(response);
      expect(parsedRes.status).to.equal(200);
      expect(parsedRes.payload.message).to.equal('Welcome to the Badging System API');
      done();
    }).catch(done);
  });

});
