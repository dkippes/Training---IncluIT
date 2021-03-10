let codeResponse = require("./utils/statusCode");

module.exports.main = (event, context, callback) => {
  let { transactions } = JSON.parse(event.body);
  let dolar = 90.58;
  let totalEnPesos = 0;

  // Si no existe el parametro
  if (transactions === undefined || transactions === []) {
    callback(
      null,
      codeResponse(400, "Bad Request due to missing a required parameter")
    );
  }

  // Bucle de transacciones
  for (let i = 0; i < transactions.length; i++) {
    
    //Verifica que las transacciones sean USD u ARS y no otra
    if (
      transactions[i].amount < 0 ||
      transactions[i].amount === "" ||
      (transactions[i].currency !== "USD" && transactions[i].currency !== "ARS")
    ) {
      callback(null, codeResponse(500, "Internal Server Error"));
    }

    // Hace el balance general
    if (transactions[i].status === "succeeded") {
      transactions[i].currency === "ARS"
        ? (totalEnPesos += parseFloat(transactions[i].amount))
        : (totalEnPesos += parseFloat(transactions[i].amount) * dolar);
    }
  }

  //Si la operacion fue bien
  callback(
    null,
    codeResponse(200, "OK", {
      balance: {
        amounts: {
          ars: totalEnPesos,
          usd: totalEnPesos / dolar,
        },
      },
    })
  );
};
