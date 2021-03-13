const AWS = require("aws-sdk");
const codeResponse = require("../../utils/statusCode");

AWS.config.update({
  region: "us-east-2",
  endpoint: "http://localhost:8000",
});

async function updateUser(event, context) {
  const DocumentClient = new AWS.DynamoDB.DocumentClient();

  try {
    //Parsea la data
    const data =
      typeof event.body === "string" ? JSON.parse(event.body) : event.body;

    // Busca un usuario que coincida con el email
    const userToUpdate = await DocumentClient.scan({
      TableName: "users",
      ExpressionAttributeValues: {
        ":e": data.email,
      },
      FilterExpression: "email = :e",
    }).promise();

    try {
      // Actualiza la password del usuario
      await DocumentClient.update(
        {
          TableName: "users",
          Key: {
            id_user: userToUpdate.Items[0].id_user,
          },
          UpdateExpression: "set password = :p",
          ExpressionAttributeValues: {
            ":p": data.password,
          },
        },
        function (err) {
          if (err) {
            console.log(err);
          }
        }
      );

      return codeResponse(200, "usuario actualizado campeon");
    } catch {
      return codeResponse(400, "usuario inexistente");
    }
  } catch {
    return codeResponse(500, "Problemas en el servidor");
  }
}

module.exports = { updateUser };
