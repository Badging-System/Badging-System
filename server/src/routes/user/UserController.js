const JSONResponse = require('../../service/response/JSONResponse');
const InvalidInput = require('../../service/response/InvalidInput');

exports.index = (req, res) => {
  JSONResponse(res, {
    message: 'Success'
  });
};

exports.user_id = (req, res) => {
  let userId = req.params.id;
  if (!userId) {
    InvalidInput(res, 'Invalid Input');
  } else {
    JSONResponse(res, {
      message: 'Success ' + userId
    });
  }
};
