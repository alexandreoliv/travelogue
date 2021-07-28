const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    facebookId: String,
    name: String,
    avatar: String,
    username: String,
    password: String,
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    }
});

const User = model("User", userSchema);

module.exports = User;