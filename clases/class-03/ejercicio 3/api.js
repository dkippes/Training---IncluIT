/*
Se necesita informar el precio del bitcoin en peso argentino, considerando el precio de venta oficial
*/
let axios = require('axios');

  let dolarsi = axios.get('https://www.dolarsi.com/api/api.php?type=valoresprincipales');
  let apiCoinDesk = axios.get('https://api.coindesk.com/v1/bpi/currentprice.json');

  function getAllRequest() {
     axios.all([dolarsi, apiCoinDesk])
     .then(axios.spread((...responses) => {
         
        // Tomos los datos
        const dolarsiResponse = responses[0].data;
        const apiCoinDeskResponse = responses[1].data;

        // Separo las propiedades de ambos objetos
        let dolaresEnPesosArgentino = parseFloat(dolarsiResponse[0].casa.compra);
        let bitcoinsEnDorales = parseFloat(apiCoinDeskResponse.bpi.USD.rate_float);

        // Muestro cuanto sale un bitcoin
        console.log(`Precio del bitcoin en pesos argentinos es: ${dolaresEnPesosArgentino * bitcoinsEnDorales}`);
        
      }))
      .catch(err => console.log(err));
  }

  getAllRequest();