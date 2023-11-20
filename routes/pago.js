const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();

const { validarJWT } = require("../middlewares/validar-jwt");
const {
  crearPago,
  obtenerPagos,
  getPagosByUserId,
  getPagoById,
} = require("../controllers/pago");

// Ruta para crear un nuevo pago (puedes agregar rutas adicionales según tus necesidades)
router.post("/", [validarJWT], crearPago);
router.get("/", obtenerPagos);
// Ruta para obtener un pago por su ID
router.get("/detalle/:pagoId", getPagoById);
router.get("/:userId", getPagosByUserId);

//getCrearPagoByUsuarioId

module.exports = router;
