const { response } = require("express");
const Pago = require("../models/Pago");

const getPagosByUserId = async (req, res = response) => {
  try {
    const userId = req.params.userId;
    // console.log("UserID:", userId);
    const pagos = await Pago.find({ user: userId });

    if (pagos.length === 0) {
      return res.status(404).json({
        ok: false,
        msg: "No se encontraron pagos para el usuario con el ID proporcionado",
      });
    }

    res.json({
      ok: true,
      pagos,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador. Problema en el controlador getPagosByUserId",
    });
  }
};

const crearPago = async (req, res = response) => {
  const registro = new Pago(req.body);

  try {
    registro.user = req.uid;

    const registroPago = await registro.save();

    res.json({
      ok: true,
      registro: registroPago,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el Administrador Problema en RegistroPago",
    });
  }
};

const obtenerPagos = async (req, res = response) => {
  try {
    const pagos = await Pago.find();

    if (pagos.length === 0) {
      return res.status(404).json({
        ok: false,
        msg: "No se encontraron pagos",
      });
    }
    res.json({
      ok: true,
      pagos,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el Administrador. Problema al obtener los pagos",
    });
  }
};

module.exports = {
  crearPago,
  obtenerPagos,
  getPagosByUserId,
  // Agrega aquí otros controladores según tus necesidades
};
