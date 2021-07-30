const { Schema, model } = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
	username: {
		type: String,
		unique: true
	},
	password: String,
	role: {
		type: String,
		enum: ['user', 'admin'],
		default: 'user'
	}
});

userSchema.plugin(uniqueValidator, {message: 'is already taken.'});

const User = model("User", userSchema);

module.exports = User;