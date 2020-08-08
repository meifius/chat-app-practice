// Importar Bibliotecas
const path = require( 'path' );
// const http = require( 'http' );
const express = require( 'express' );
const app = express();
const socketio = require( 'socket.io' );
require( 'dotenv' ).config();
// const io = socketio( app );

// Configuraciones
const puerto_alternativo = 7000;
app.set( 'PORT', process.env.PORT || puerto_alternativo );

// Create a server with Express and http
// const server = http.createServer( app );
// Socket listening to the listener
// const io = socketio( server );

// Middlewares
app.use( express.static( path.join( __dirname, 'public' ) ) );

// Paths
app.get('/api', ( req, res ) => {
  res.send('Holita desde home')
});

// Escuchando peticiones con un servidor Express
const expressServer = app.listen( app.get('PORT'), () => {
  console.log( `Escuchando en el puerto: ${app.get( 'PORT' )}.` );
} );

// SocketIO create a Server, or handle a Server that listen the http server
// io is a Socket Server -> doc: server.<method> == io.<method>
const io = socketio( expressServer );

// Handle the socket
io.on( 'connection', socket => {
  socket.emit( 'messageFromServer', 'Hellooooo from the server' );

  socket.on( 'client', msg => {
    console.log(`chat: ${msg.text}`)
    io.emit('messageToClients', {text : msg.text} );
  } );
})