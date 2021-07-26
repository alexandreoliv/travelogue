const { Schema, model } = require("mongoose");

const travelSchema = new Schema({
	owner: String,
	country: String,
	countryCode: String,
    city: String,
    date: Date
});

const Travel = model("Travel", travelSchema);

module.exports = Travel;