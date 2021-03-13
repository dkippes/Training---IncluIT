const Schemy = require("schemy");

module.exports = new Schemy({
    id_user: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  });