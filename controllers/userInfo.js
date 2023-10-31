const { response } = require("express");
const Registro = require("../models/UserInfo");

const getUserInfoByUserId = async (req, res = response) => {
  const userId = req.params.userId; // Obtener el ID del usuario de los parámetros

  try {
    // Buscar registros de usuario que corresponden al ID de usuario
    const registros = await Registro.find({ user: userId });

    if (registros.length === 0) {
      return res.status(404).json({
        ok: false,
        msg: "No se encontraron registros para este usuario",
      });
    }

    res.json({
      ok: true,
      registros,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

//*-------------------------------------
// const getUserInfoByUserId = async (req, res = response) => {
//   const idUsuario = req.params.idUsuario;

//   try {
//     const userInformation = await Registro.find({ idUsuario });

//     if (userInformation.length === 0) {
//       return res.status(404).json({
//         ok: false,
//         msg: "No se encontro userInformation con ese id de usuario",
//       });
//     }

//     res.json({
//       ok: true,
//       userInformation,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       ok: false,
//       msg: "Hable con el administrador. Problema al userInfo por ID",
//     });
//   }
// };

//*-----------------------------------
const getRegistros = async (req, res = response) => {
  //verificar que tenga el evento

  const registros = await Registro.find();

  res.json({
    ok: true,
    desdeRegistro: true,
    registros,
  });
};

const getRegistroById = async (req, res = response) => {
  const registroId = req.params.id;
  console.log(registroId);
  try {
    const registroById = await Registro.findById(registroId);
    if (!registroById) {
      return res.status(404).json({
        ok: false,
        msg: "No existe Reserva con ese id",
      });
    }

    const registro = {
      ...registroById,
    };
    console.log(registro);
    res.json({
      ok: true,
      registro: registroById,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "hable con el administrador",
    });
  }
};

const createRegistro = async (req, res = response) => {
  const registro = new Registro(req.body);

  try {
    registro.user = req.uid;

    const solicitudRegistroGuardado = await registro.save();

    res.json({
      ok: true,
      registro: solicitudRegistroGuardado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el Administrador",
    });
  }
};

const updateRegistro = async (req, res = response) => {
  const registroId = req.params.id;

  try {
    const registro = await Registro.findById(registroId);

    if (!registro) {
      return res.status(404).json({
        ok: false,
        msg: "No existe ningun registro con ese id",
      });
    }
    const nuevaSolicitudRegistro = {
      ...req.body,
    };

    const registroUpdate = await Registro.findByIdAndUpdate(
      registroId,
      nuevaSolicitudRegistro,
      { new: true }
    );

    res.json({
      ok: true,
      registro: registroUpdate,
    });

    console.log(req.body);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "hable con el administrador",
    });
  }
};
const deleteRegistro = async (req, res = response) => {
  const registroId = req.params.id;

  try {
    const registro = await Registro.findById(registroId);

    if (!registro) {
      return res.status(404).json({
        ok: false,
        msg: "No existe ningun registro con ese id",
      });
    }

    await Registro.findByIdAndDelete(registroId);
    res.json({
      ok: true,
    });

    console.log(req.body);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "hable con el administrador",
    });
  }
};

module.exports = {
  getRegistros,
  getRegistroById,
  createRegistro,
  getUserInfoByUserId,
  //   updateRegistro,
  //   deleteRegistro,
};
