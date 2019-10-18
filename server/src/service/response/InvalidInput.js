/* This is a helper function that can be used to send invalid requests from the the API */
module.exports = function(res, message) {
  return res.status(403).json({
    status: 403,
    message: message
  });
}
