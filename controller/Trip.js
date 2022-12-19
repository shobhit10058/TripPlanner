
const Trip = require('../models/Trip');

module.exports = {
	// GET all trips
	getAllTrips:
	(req, res) => {
		Trip.find((error, trips) => {
			if (error) {
				res.json({error});
			} else {
				res.json({trips});
			}
		});
	},
	// GET a single trip
	getTripByID: 
	(req, res) => {
		Trip.findById(req.params.id, (error, trip) => {
		if (error) {
			res.json({error});
		} else {
			res.json({trip});
		}
		});
  	},
	addTrip: 
	(req, res) => {
		const trip = new Trip(req.body);
		trip.save((error) => {
		  if (error) {
			res.json({error});
		  } else {
			res.json({trip: trip, message: "trip added"});
		  }
		});
	},
	updateTrip: 
	(req, res) => {
		Trip.findByIdAndUpdate(req.params.id, req.body, (error, trip) => {
		  if (error) {
			res.json({error});
		  } else {
			res.json({trip});
		  }
		});
	},
	deleteTrip: 
	(req, res) => {
		Trip.findByIdAndDelete(req.params.id, (error) => {
		  if (error) {
			res.json({error});
		  } else {
			res.json({message: 'Trip deleted'});
		  }
		});
	},
	searchTrip: 
	async (req, res) => {
		const query = req.body;
		const trips = await Trip.find(query).select("-itineraries -_id");
		console.log(trips);
		res.send({trips});
	}
}