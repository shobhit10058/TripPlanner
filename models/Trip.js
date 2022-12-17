const mongoose = require("mongoose")

const Trip = new mongoose.Schema({
	destination: String,
	type: String,
	duration: Number,
	activities: [String]
  });

const TripModel = mongoose.model('Trip', Trip);

module.exports = TripModel