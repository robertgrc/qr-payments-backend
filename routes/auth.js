/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/

const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();

const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
  crearUsuario,
  loginUsuario,
  revalidarToken,
  obtenerUsuarios,
  getUsuarioById,
} = require("../controllers/auth");

router.post(
  "/new",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("name", "El nombre debe tener al menos 3 caracteres").isLength({
      min: 3,
    }),
    check("email", "El correo Electronico es obligatorio").not().isEmpty(),
    check("email", "Ingresa un correo electronico valido").isEmail(),
    check(
      "password",
      "La contraseña debe tener al menos 6 caracteres"
    ).isLength({ min: 6 }),
    check("rol", "No es un rol valido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    validarCampos,
  ],

  crearUsuario
);

router.post(
  "/",
  [
    check("email", "El correo Electronico es obligatorio").not().isEmpty(),
    check("email", "Ingresa un correo electronico valido").isEmail(),
    check(
      "password",
      "La contraseña debe tener al menos 6 caracteres"
    ).isLength({ min: 6 }),
    validarCampos,
  ],
  loginUsuario
);

router.get("/renew", [validarJWT], revalidarToken);

router.get("/", [validarJWT], obtenerUsuarios);

router.get("/:id", [validarJWT], getUsuarioById);

module.exports = router;
