const { response } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/Usuario");
const { generarJWT } = require("../helpers/jwt");

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
    //Generar JWT
    const token = await generarJWT(usuario.id, usuario.name);

    res.status(201).json({
      ok: true,
      msg: "usuario creado con exito",
      uid: usuario.id,
      name: usuario.name,
      state: usuario.state,
      salario: usuario.salario,
      token,
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
    const token = await generarJWT(usuario.id, usuario.name);

    res.json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      msg: "Usuario Logeado con exito",
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el Administrador",
    });
  }
};

const revalidarToken = async (req, res = response) => {
  const { uid, name } = req;
  //Generar un nuevo JWT y retornarlo en esta peticion
  const token = await generarJWT(uid, name);

  res.json({
    ok: true,
    msg: "registroRevalidarToken",
    uid,
    name,
    token,
  });
};

const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find(); // Esto busca todos los usuarios en tu base de datos

    res.status(200).json({
      ok: true,
      msg: "Usuarios encontrados",
      usuarios: usuarios.map((usuario) => ({
        uid: usuario.id,
        name: usuario.name,
        state: usuario.state,
        salario: usuario.salario,
      })),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor, hable con el Administrador",
    });
  }
};

module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken,
  obtenerUsuarios,
};
