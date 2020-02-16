const JSONResponse = require('../../service/response/JSONResponse');
const Coach = require('../../../models/Coach');
const { Mongo } = require('../../database/mongoDB');

const mongoDB = new Mongo();

exports.index = (req, res) => {
  JSONResponse(
    res, 
    {
      message: 'Returning a list of Coaches'
    },
    200
  );
};

/**
 * Returns Coach count
 * @return {number}       [number of Coaches]
 */
exports.count = (req, res) => {
  //Get all the collection data based off the Coach model
  mongoDB
    .getCollectionData(Coach)
    .then(async data => {
      JSONResponse(
        res,
        {
          data: data.length
        },
        200
      );
    })
    .catch(error => {
      JSONResponse(
        res,
        {
          error: error
        },
        500
      );
    });
};
