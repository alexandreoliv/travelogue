const { Schema, model } = require("mongoose");

const travelSchema = new Schema({
	owner: String,
	country: String,
    city: String,
    date: Date,
	transportation: {
		in: String,
		out: String
	},
    picture: String
});

const Travel = model("Travel", travelSchema);

module.exports = Travel;