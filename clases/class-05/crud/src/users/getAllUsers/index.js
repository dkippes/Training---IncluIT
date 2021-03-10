const AWS = require("aws-sdk");
const codeResponse = require("../../utils/statusCode");

AWS.config.update({
  region: "us-east-2",
  endpoint: "http://localhost:8000",
});

async function getAllUsers(event, context) {

  try {
    const DocumentClient = new AWS.DynamoDB.DocumentClient();

    const { Items } = await DocumentClient.scan({
      TableName: "users",
    }).promise();

    return codeResponse(200, "OK", Items);
  } catch {
	  return codeResponse(500, "Hubo un error en la carga de la tabla");
  }

}

module.exports = { getAllUsers };
