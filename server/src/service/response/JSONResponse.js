/* This is a helper function that can be used to send responses from the the API */
module.exports = function(res, payload) {
  return res.status(200).json({
    status: 200,
    payload: payload
  });
}