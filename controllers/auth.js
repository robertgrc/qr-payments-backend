const { response } = require("express");

const crearUsuario = (req, res = response) => {
  res.json({
    ok: true,
    msg: "registro",
  });
};

const loginUsuario = (req, res = response) => {
  res.json({
    ok: true,
    msg: "registroLoginUsuario",
  });
};

const revalidarToken = (req, res = response) => {
  res.json({
    ok: true,
    msg: "registroRevalidarToken",
  });
};

module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken,
};
