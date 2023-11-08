const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();

const { validarJWT } = require("../middlewares/validar-jwt");
const {
  crearPago,
  obtenerPagos,
  getPagosByUserId,
} = require("../controllers/pago");

// Ruta para crear un nuevo pago (puedes agregar rutas adicionales según tus necesidades)
router.post("/", [validarJWT], crearPago);
router.get("/", obtenerPagos);

router.get("/:userId", getPagosByUserId);

//getCrearPagoByUsuarioId

module.exports = router;
