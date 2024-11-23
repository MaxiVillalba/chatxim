import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io"; // Importar correctamente Server desde socket.io

const app = express();

// Para que nuestro servidor express pueda interpretar en forma automática mensajes de tipo JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Configuración de handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", "./views");  // Asumiendo que las vistas están en la carpeta "./views"
app.set("view engine", "handlebars");

// Ruta principal
app.get("/", (req, res) => {
  res.render("index"); // Renderizar la vista "index"
});

const PORT = 8080;

// Servidor HTTP
const httpServer = app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});

// Configuración del socket.io
const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log(`Nuevo cliente conectado con el id ${socket.id}`);


});

socket.on("newUser", (data) => {
    socket.broadcast.emit("newUser", data);
  });

  socket.on("message", (data)=>{
    messages.push(data);
    io.emit("messageLogs", message)
  })


