const jwt = require('jwt-simple');
const codeResponse = require('../../utils/statusCode');

async function welcomeUser(event, context) {

    console.log(event.headers.Authorization);

    // Recorda poner el Authorization en el header en el postman :D.. fijate cual es logueandote primero.
    const token = event.headers.Authorization || '';

    try {
        const user = jwt.decode(token, 'secret1');
        return codeResponse(200, `Bienvenido broda - ${user.email}`);
    }
    catch (err) {
        return codeResponse(400, 'No es valido el token, no podes entrar campeon')
    }

}

module.exports = { welcomeUser };