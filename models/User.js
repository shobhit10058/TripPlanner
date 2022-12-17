const mongoose = require('mongoose')

const User = mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	itineraries: [{
		type: mongoose.SchemaTypes.ObjectId,
		ref: "Itinerary"
	}]
})

const UserModel = mongoose.model("User", User);

module.exports = UserModel;