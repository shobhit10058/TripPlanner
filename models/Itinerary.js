const mongoose = require('mongoose')

const Itinerary = mongoose.Schema({
	usersRef: [{
		type: mongoose.SchemaTypes.ObjectId,
		ref: 'User'
	}],
	dayWisePlan: {
		type: [Array],
		default: []
	},
	tripRef: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: 'Trip'
	}
}) 

const ItineraryModel = mongoose.model('Itinerary', Itinerary);

module.exports = ItineraryModel;