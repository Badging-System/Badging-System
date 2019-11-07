/* This is a helper function that can be used to send responses from the the API */
module.exports = function(res, payload, status) {
  return res.status(200).json({
    status: status,
    payload: payload
  });
}
