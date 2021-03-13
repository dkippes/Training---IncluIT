const AWS = require("aws-sdk");
const codeResponse = require("../../utils/statusCode");
const userSchema = require("../../utils/userSchema");
const createToken = require('../../auth/createToken');

AWS.config.update({
  region: "us-east-2",
  endpoint: "http://localhost:8000",
});

async function loginUser(event, context) {
  const DocumentClient = new AWS.DynamoDB.DocumentClient();

  try {
    //Parsea la data
    const data =
      typeof event.body === "string" ? JSON.parse(event.body) : event.body;

    // Se fija si el email se encuentra en la base de datos y la pass coincide
    const isUserRegister = await DocumentClient.scan({
      TableName: "users",
      ExpressionAttributeValues: {
        ":e": data.email,
        ":p": data.password
      },
      FilterExpression: "email = :e AND password = :p ",
      ProjectionExpression: "email",
    }).promise();

    //Si encuentro al usuario
    if (isUserRegister.Items[0] == undefined) {
      return codeResponse(210, "Usuario no registrado / Error de credenciales");
    } else {
      
      // Si el usuario entra le crea el token.
      return codeResponse(200, "Usuario logueado con exito", {
        email: isUserRegister.Items[0].email,
        token: createToken(isUserRegister.Items[0].email)
      });
    }
    
  } catch {
    return codeResponse(500, "Hubo un problema en el servidor");
  }
}

module.exports = { loginUser };
