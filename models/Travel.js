const { Schema, model } = require("mongoose");

const travelSchema = new Schema({
	owner: String,
	country: {
		name: String,
		code: String,
		flag: String
	},
	city: String,
    details: String,
	visited: Boolean
});

const Travel = model("Travel", travelSchema);

module.exports = Travel;