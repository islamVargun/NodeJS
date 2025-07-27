const mongoose = require("mongoose");
const { type } = require("os");
const { ref } = require("process");
const Schema = mongoose.Schema;

const useSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  roles: {
    User: {
      type: Number,
      default: 2001, // default role for User
    },
    Editor: Number,
    Admin: Number,
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
  },
});

module.exports = mongoose.model("User", useSchema);
