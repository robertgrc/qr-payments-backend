const { response } = require("express");
const Pago = require("../models/Pago");

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
  // Agrega aquí otros controladores según tus necesidades
};
