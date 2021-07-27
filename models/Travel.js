const { Schema, model } = require("mongoose");

const travelSchema = new Schema({
	owner: String,
	country: String,
	countryCode: String,
	flag: String,
    city: String,
    date: Date,
	visited: Boolean
});

const Travel = model("Travel", travelSchema);

module.exports = Travel;