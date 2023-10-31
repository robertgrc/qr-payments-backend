const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const {
  getRegistros,
  //   getRegistrosPorMesYAnio,
  getRegistroById,
  createRegistro,
  //   updateRegistro,
  //   deleteRegistro,
} = require("../controllers/userInfo");

const router = Router();

//Obtener registro
router.get("/", getRegistros);
router.get("/:id", getRegistroById);
router.post("/", [validarJWT], createRegistro);

module.exports = router;
