const AWS = require("aws-sdk");
const codeResponse = require("../../utils/statusCode");
const userSchema = require("../../utils/userSchema");

AWS.config.update({
  region: "us-east-2",
  endpoint: "http://localhost:8000",
});

async function registerUser(event, context) {
  const DocumentClient = new AWS.DynamoDB.DocumentClient();

  try {
    //Parsea la data
    const data =
      typeof event.body === "string" ? JSON.parse(event.body) : event.body;

    // Crea el item
    const Item = {
      id_user: parseInt(Date.now() + Math.random()),
      email: data.email,
      password: data.password,
    };

    //Checkea si las keys estan correctas
    if (!userSchema.validate(Item)) {
      return codeResponse(400, userSchema.getValidationErrors())
      
    }

    // Se fija si el email ya esta registrado
    const emailYaRegistrado = await DocumentClient.scan({
      TableName: 'users',
      ExpressionAttributeValues: {
          ":e": Item.email
      },
      FilterExpression: "email = :e",
      ProjectionExpression: "email"
    }).promise();

    if(emailYaRegistrado.Items[0] == undefined) {

      //Mete el usuario en la db
      await DocumentClient.put({
        TableName: "users",
        Item,
      }).promise();

      return codeResponse(200, "Usuario registrado", Item);
    } else {

      return codeResponse(250, "El usuario ya se encuentra registrado");

    }   

  } catch {
    return codeResponse(500, "Hubo un problema en el servidor");
  }
}

module.exports = { registerUser };
