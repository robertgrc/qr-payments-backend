const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const {
  getRegistros,
  getRegistroById,
  createRegistro,
  getUserInfoByUserId,
  deleteRegistro,
  updateRegistro,
} = require("../controllers/userInfo");

const router = Router();

//Obtener registro
router.get("/", getRegistros);
router.get("/:id", getRegistroById);
router.post("/", [validarJWT], createRegistro);
router.get("/usuario/:userId", getUserInfoByUserId);

//Actualizar un registro
router.put("/:id", [validarJWT], updateRegistro);

router.delete("/:id", [validarJWT], deleteRegistro);

module.exports = router;
