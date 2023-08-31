const { response } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/Usuario");

const crearUsuario = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    let usuario = await Usuario.findOne({ email });
    console.log(usuario);
    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: "Un Usuario existe con ese Email",
      });
    }
    usuario = new Usuario(req.body);

    //Encriptar contrasena
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();
    res.status(201).json({
      ok: true,
      msg: "usuario creado con exito",
      uid: usuario.id,
      name: usuario.name,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el Administrador",
    });
  }
};

const loginUsuario = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });
    console.log(usuario);
    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: "Un Usuario no existe con ese Email",
      });
    }
    //Confirmar los Passwords
    const validPassword = bcrypt.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Password incorrecto",
      });
    }

    //Gernerar JWT
    res.json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      msg: "Usuario Logeado con exito",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el Administrador",
    });
  }
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
