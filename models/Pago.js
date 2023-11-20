const { Schema, model } = require("mongoose");

const PagoSchema = Schema({
  nombreUsuario: {
    type: String,
    required: true,
  },
  fechaPago: {
    type: Date,
    required: true,
  },
  mesPago: {
    type: String,
    required: true,
  },
  monto: {
    type: Number,
    required: true,
  },
  estado: {
    type: Boolean,
    required: true,
  },
  qr: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
});

module.exports = model("Pago", PagoSchema);
