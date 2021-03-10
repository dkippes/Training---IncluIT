let codeResponse = require("./utils/statusCode");

module.exports.main = (event, context, callback) => {

  callback(
    null,
    codeResponse(200, "OK", {
      body: event.body,
      headers: event.multiValueHeaders
    })
  );
  
};
