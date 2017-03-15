
//var con = new ws_miMovistar();
const FACEBOOK_ACCESS_TOKEN = 'EAAFr75mEwRIBAGRZCYFZBeaKNaGnbaSihKhYKaZBBdGJaZCzmCd1qLw647P67LTKeicVTar2o1q4ZAdPwZCGciEXIZBfxbMxlBZBqmzPyOiEUZAPcZBZBd2m514wIZBhRDx7BTM7YkQXW7SFw3lRg3PIZB3AXPzV1og3fdHlJnhcxhy0NGAZDZD';
const API_AI_TOKEN = '3a0ed0701dcc4bc7a242386623cca351';
const apiAiClient = require('apiai')(API_AI_TOKEN);
const usuario='{"args":{"documentoID":"984057918","clave":"qwe123","perfilUsuario":"Numero"},"session":{"imei":"1234567890","version":"2.2.28","id_session":0},"funcion":"IMOVISTAR_LOGIN"}';
const objetoUsuario =JSON.parse(usuario);
const wsM = require('./ws_miMovistar.js');


const request = require('request');

var celular;
var clavePi;

const sendTextMessage = (senderId, text) => {
	var text1 = text;
   request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: FACEBOOK_ACCESS_TOKEN },
        method: 'POST',
        json: {
            recipient: {id: senderId },
            message: {text: text1},
        }
    });
};

const sendQuickReplay = (senderId, text)=>{
	var text1 = text;
	return request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: FACEBOOK_ACCESS_TOKEN },
        method: 'POST',
        json: {
            recipient: { id: senderId },
            messages: 
				[ { type: 0, speech: 'Su saldo es:' },
				{ title: 'Nos ayudaría con una encuesta, por favor?',
				  replies: [ 'Sí,claro', 'No por el momento' ],
				 type: 2 } ]
        }
    });	
};

module.exports = (event) => {
    const senderId = event.sender.id;
    var message = event.message.text;
    const apiaiSession = apiAiClient.textRequest(message, {sessionId: 'botcube_co'});
	
	//Se inicia la sesión de intercambio con el bot en api.ai
	apiaiSession.on('response', (response) => {
	   
	   var resultBot = response.result.fulfillment.speech;	   
	   sendTextMessage(senderId, resultBot);
	   MADconexion();
	   if (response.result.metadata.intentName === 'clave') {
			   const numero = response.result.contexts[1].parameters.number;
			   celular=numero;
			   const clave = response.result.parameters.clave;
			   clavePi=clave;				   
			   if(validar(numero,clave)===true){
				  var resultBot1 = "Bienvenido ^_^";				     
				   console.log("EL USUARIO DICE:",response.result.resolvedQuery);
				   console.log ("DENTRO------**----- DEL IF DE VALIDACIÓN ");
				   console.log("mensaje de login: ",resultBot);
				   sendTextMessage(senderId, resultBot1);
			   }
			   else{
				  var resultBot2 = "Número o clave incorrectos :(";
				   sendTextMessage(senderId, resultBot2);
				   console.log("No funca la clave");
			   }
			 //console.log(validar(numero));	
        }
					//sendTextMessage(senderId, result);
					console.log("EL USUARIO DICE:",response.result.resolvedQuery);
					//console.log("MENSAJE DE USUARIO:",message);
					console.log("EL BOT DICE: ",resultBot);
	  					
    });
    apiaiSession.on('error', error => console.log(error));
    apiaiSession.end();
};

var validar = function (numero,clave){
	var estado = false;	
	var obj ='{"funcion":"IMOVISTAR_LOGIN","answer":{"login":{"lineaPrincipal":"984057918","claveTemporal":"1","tipoUsuario":"U","documentoID":"984057918"},"email":"christian.reinoso@bayteq.com","lineas":["984057918"],"isLogin":true}}';
    var documentoID = objetoUsuario.args.documentoID;
	var clave1 = objetoUsuario.args.clave;
	if(numero==documentoID && clave==clave1){
		estado = true;
		//console.log(estado);
	}	
	return estado;
};

var validarClave = function (clave){
	var estado = false;
	var clave1 = objetoUsuario.args.clave;
	if(clave==clave1){
		estado=true;
	}
	return estado;
};

function MADconexion(){

		var con = new wsM();
		con.setAccion('IMOVISTAR_LOGIN');
		var arg = {};
		arg.documentoID="999013585";		
		arg.clave="kathy123";
		arg.perfilUsuario="Numero";
		console.log('Argumentos',arg);
		var session = {};
		session.imei="1234567890";
		session.version="2.2.28";
		session.id_session="0";
		console.log ('Session: ',session);
		con.setArgumentos(arg);
		con.setSession(session);
		
		con.OnResponde =function(ans){
			// cuando mad responde ok
			console.log ("RESPUESTA DEL SERVIDOR EN EL PROCESS MESSAGE:----",ans);
			
		};
		
		con.setOnError(function(error){
			console.log(error);
		});
		
		con.consultarHttp();
};







