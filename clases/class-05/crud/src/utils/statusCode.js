/**
 * @param  {Number} code=100
 * @param  {String} msg="Messagepredeterminado"
 * @param  {Object} data
 */
function statusCode(code = 100,msg = "Message predeterminado", data) {
    return {
      statusCode: code,
        body: JSON.stringify({
          message: msg,
          data
        }),
      };
}

module.exports = statusCode;