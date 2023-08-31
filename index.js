const express = require("express");
require("dotenv").config();
const { dbConnection } = require("./database/config");
//Crear Servidor de Express
const app = express();

//Base de Datos
dbConnection();

//Directorio Publico
app.use(express.static("public"));

//Lectura y Parseo del Body
app.use(express.json());

// Rutas
app.use("/api/auth", require("./routes/auth"));

// TODO: CRUD: Eventos

//Escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`El servidor esta funcionando en el puerto ${process.env.PORT}`);
});
