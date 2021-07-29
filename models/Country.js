const { Schema, model } = require("mongoose");
const User = require('./User');

const countrySchema = new Schema({
	country: {
		name: String,
		code: String,
		flag: String
	},
	city: String,
    details: String,
	visited: Boolean,
	owner: { type: Schema.Types.ObjectId, ref: 'User' }
});

const Country = model("Country", countrySchema);

module.exports = Country;