const { Schema, model } = require("mongoose");

const UserInfoSchema = Schema({
  nombreCompleto: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  telefono: {
    type: String,
  },
  profesion: {
    type: String,
  },
  direccion: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
  },
});

UserInfoSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model("Registro", UserInfoSchema);
