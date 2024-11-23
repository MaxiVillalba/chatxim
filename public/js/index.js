const socket = io(); // hacemos referencia a socket.io

let user; 

// Asignar correctamente el chatBox
let chatBox = document.getElementById("chatBox");  // Asegúrate de que el id coincida con el HTML

// Usamos SweetAlert2 para obtener el nombre del usuario
Swal.fire({
    title: "Identificate",
    input: "text",
    text: "Ingrese el usuario para identificarse",
    inputValidator: (value) => {
        return !value && "Por favor ingresar el nombre de un usuario";
    },
    allowOutsideClick: false
}).then((result) => {
    user = result.value;
    console.log(user);  // Muestra el usuario en la consola

    // Enviamos el usuario al servidor
    socket.emit("newUser", user);
});

// Escuchar el evento keyup en el chatBox
chatBox.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        if (chatBox.value.trim().length > 0) {
            // Emitir el mensaje al servidor
            socket.emit("message", { user: user, message: chatBox.value });
            chatBox.value = "";  // Limpiar el chatBox después de enviar el mensaje
        }
    }
});

// Escuchar el evento "messageLogs" del servidor
socket.on("messageLogs", (data) => {
    let messageLogs = document.getElementById("messageLogs");
    let messages = "";  // Variable para almacenar los mensajes

    console.log(data);  // Ver los datos recibidos

    // Recorrer los mensajes y agregarlos al contenedor
    data.forEach((message) => {
        // Agregar el nuevo mensaje al string
        messages += `${message.user} dice: ${message.message}</br>`;
    });

    // Insertar los mensajes en el contenedor
    messageLogs.innerHTML = messages;
});

socket.on("newUser", (data) => {
    Swal.fire({
        text: `se conectó el ${data}`,
        toast: true,
        position: "top-right",
        timer: 2000
    })
})