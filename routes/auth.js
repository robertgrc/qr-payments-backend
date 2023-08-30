/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/

const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();

const {
  crearUsuario,
  loginUsuario,
  revalidarToken,
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
  ],
  loginUsuario
);

router.get("/renew", revalidarToken);

module.exports = router;
