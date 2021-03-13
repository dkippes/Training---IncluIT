const jwt = require('jwt-simple');

function createToken(user) {
    const token = jwt.encode({
        email: user
    }, 'secret1');

    return token;
}

module.exports = createToken;