const express = require("express");
require("dotenv").config();
//Crear Servidor de Express
const app = express();

//Directorio Publico
app.use(express.static("public"));

// Rutas
app.use("/api/auth", require("./routes/auth"));

// TODO: CRUD: Eventos

//Escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`El servidor esta funcionando en el puerto ${process.env.PORT}`);
});
