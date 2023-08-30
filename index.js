const express = require("express");
require("dotenv").config();
//Crear Servidor de Express
const app = express();

//Directorio Publico
app.use(express.static("public"));

// Rutas
// app.get("/", (req, res) => {
//   console.log("se requiere /");
//   res.json({
//     ok: true,
//     nuevodato: "helloGrc",
//   });
// });

//Escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`El servidor esta funcionando en el puerto ${process.env.PORT}`);
});
