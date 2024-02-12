// Conectamos el cliente al servidor Socket.IO en localhost:4000
var socket = io.connect('http://localhost:4000');

// Obtenemos referencias a los elementos del DOM
var message = document.getElementById('message'); // Campo de entrada de texto para el mensaje
var handle  = document.getElementById('handle'); // Campo de entrada de texto para el nombre del usuario
var btn     = document.getElementById('send'); // Botón de enviar mensaje
var output  = document.getElementById('output'); // Contenedor para mostrar los mensajes
var feedback = document.getElementById('feedback'); // Contenedor para mostrar cuando alguien está escribiendo

// Agregamos un evento 'click' al botón de enviar
btn.addEventListener('click',function(){
    // Emitimos el evento 'chat' al servidor con el mensaje y el nombre del usuario
    socket.emit('chat', {
        message: message.value, // Contenido del mensaje
        handle: handle.value // Nombre del usuario
    });
    // Borrar el contenido del campo de entrada de texto
    document.getElementById('message').value = ''; // Limpiar el campo de entrada de texto
});

// Agregamos un evento 'keypress' al campo de mensaje
message.addEventListener('keypress', function(){
    // Emitimos el evento 'typing' al servidor con el nombre del usuario
    socket.emit('typing', handle.value); // Enviar un evento indicando que el usuario está escribiendo
});

// Escuchamos el evento 'chat' del servidor
socket.on('chat', function(data){
    // Mostramos el mensaje enviado por otro usuario en el chat
    output.innerHTML += '<p><strong>' + data.handle +': </strong>' + data.message + '</p>';
    // Limpiamos el área de retroalimentación (feedback)
    feedback.innerHTML = "";
});

// Escuchamos el evento 'typing' del servidor
socket.on('typing', function(data){
    // Mostramos un mensaje indicando que alguien está escribiendo
    feedback.innerHTML = '<p><em>' + data + ' está escribiendo un mensaje...</em></p>';
});
