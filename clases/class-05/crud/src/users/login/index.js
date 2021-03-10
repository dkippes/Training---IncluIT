const AWS = require("aws-sdk");
const codeResponse = require("../../utils/statusCode");

AWS.config.update({
  region: "us-east-2",
  endpoint: "http://localhost:8000",
});

async function loginUser(event, context) {

    console.log(event.body);

    await DocumentClient.query({
        TableName: "users",
        Item,
      }).promise();

    return {
        statusCode: 200,
        body: JSON.stringify({
            messages: 'login'
        })
    };

}

module.exports = { loginUser };
