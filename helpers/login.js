const FACEBOOK_ACCESS_TOKEN = 'EAAFr75mEwRIBALfum2pd4gYsmVXNlFxLMWyessLcUZBuiLDwhqZBoCBYb7JZAyqtzmHoh7ex5LCM0X0f1lqHIbzZCCWUebLTH7p5iPKZAGZBC9FLJSus0xZC0nJQkMxHj56OQQv2ZCO2njlEFXbFGa67BsBKkwAgZBoZAfJ9eSu6td1gZDZD';
const usuario='{"args":{"documentoID":"984057918","clave":"qwe123","perfilUsuario":"Numero"},"session":{"imei":"1234567890","version":"2.2.28","id_session":0},"funcion":"IMOVISTAR_LOGIN"}';
var objetoUsuario =JSON.parse(usuario);

const request = require('request');

module.exports = (event) => {
    const senderId = event.sender.id;
    const message = event.message.text;
	var texto="hola";

    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: FACEBOOK_ACCESS_TOKEN },
        method: 'POST',
        json: {
            recipient: { id: senderId },
            message: {text: texto}
            }
    });
	console.log(message);
};



