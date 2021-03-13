const AWS = require("aws-sdk");
const codeResponse = require("../../utils/statusCode");

AWS.config.update({
  region: "us-east-2",
  endpoint: "http://localhost:8000",
});

async function deleteUserByEmail(event, context) {

  const DocumentClient = new AWS.DynamoDB.DocumentClient();

  // Busca el email a borrar
  try {

    //Parsea la data
    const data =
      typeof event.body === "string" ? JSON.parse(event.body) : event.body;
    const userToDelete = await DocumentClient.scan({
      TableName: "users",
      ExpressionAttributeValues: {
        ":e": data.email,
      },
      FilterExpression: "email = :e",
      ProjectionExpression: "id_user",
    }).promise();

    // Si no existe el email lo agarra el catch
    try {
      await DocumentClient.delete(
        {
          TableName: "users",
          Key: {
            id_user: userToDelete.Items[0].id_user,
          },
        },
        function (err) {
          if (err) {
            console.log(err);
          }
        }
      );

      return codeResponse(200, "usuario borrado campeon");

    } catch {
      return codeResponse(400, "usuario inexistente");
    }

  } catch {
    return codeResponse(500, "Problemas en el servidor");
  }
}

module.exports = { deleteUserByEmail };
