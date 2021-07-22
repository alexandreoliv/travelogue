const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    // unique: true -> Ideally, should be unique, but its up to you
  },
  password: String,
});

const User = model("User", userSchema);

module.exports = User;