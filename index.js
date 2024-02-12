// Importamos el módulo 'express' para crear nuestra aplicación web
var express = require('express');
// Importamos el módulo 'socket.io' para gestionar conexiones WebSocket
var socket = require('socket.io');

// Creamos una instancia de la aplicación Express
var app = express();
// Hacemos que nuestra aplicación escuche las solicitudes en el puerto 4000
var server = app.listen(4000,function(){
    console.log('Escuchando solicitudes en el puerto 4000');
});

// Le decimos a Express que sirva archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

// Creamos una instancia de Socket.IO y le pasamos el servidor HTTP de Express
var io = socket(server);

// Manejamos conexiones de Socket.IO
io.on('connection',function(socket){
    // Cuando un cliente se conecta, mostramos su ID en la consola del servidor
    console.log('Nueva conexión de socket:',socket.id)
    
    // Escuchamos el evento 'chat' cuando un cliente envía un mensaje
    socket.on('chat',function(data){
        // Enviamos el mensaje a todos los clientes conectados, incluyendo al emisor
        io.sockets.emit('chat', data);
    });
    
    // Escuchamos el evento 'typing' cuando un cliente está escribiendo
    socket.on('typing', function(data){
        // Emitimos un mensaje de que alguien está escribiendo a todos los clientes excepto al que está escribiendo
        socket.broadcast.emit('typing',data)
    });
});
