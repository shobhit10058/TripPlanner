const Itinerary = require('../models/Itinerary');
const User = require('../models/user');
const Trip = require('../models/Trip');

module.exports = {
	createItinerary: async (req, res) => {
		const { body } = req;
		const { tripID, userID } = body;

		if (!tripID)
			return res.status(400).json({ message: "request format improper" });

		const tripObj = Trip.findById(tripID);
		const userObj = User.findById(userID);

		let activities = [["time", "activity"]];
		for (let iterator = 1; iterator < tripObj.duration; iterator += 1)
			activities.push([["time", "activity"]]);

		if (tripObj && userObj) {
			const ItineraryObj = new Itinerary({
				userID: [userID],
				tripRef: tripID,
				activities: activities
			});
			await ItineraryObj.save();
			userObj.itineraries.push(ItineraryObj.id);
			return res.status(200).json({ message: "Itinerary created" });
		}
		return res.status(400).json({ message: "Itinerary not created" });
	},
	// body -> {TripID, UserID, day, time, activity, operation}
	// UserID is added from token
	customizeItinerary: async (req, res) => {
		const { body } = req;
		const {id} = req.params;
		const {userID, day, time, activity, operation } = body;

		if (!id || !userID || !day || !time || !activity, !operation)
			return res.status(400).json({ message: "request format improper" });

		const itineraryObj = Itinerary.findById(id);
		const userObj = User.findById(userID);

		itineraryObj.populate("tripRef");

		const found = itineraryObj.activities.find((currActivity) => currActivity == activity);
		if (!found)
			return res.status(400).json({ message: "activity not present in trip" });

		if (operation == "add") {
			itineraryObj.activities[day].push([time, activity]);
		} else if (operation == "remove") {
			itineraryObj.activities[day] = itineraryObj.activities[day].filter((time_activity) => {
				return (!(time_activity[0] == time) || !(time_activity[1] == activity));
			})
		}
		await itineraryObj.save();
		return res.status(200).json({ message: "Itinerary updated" });
	},
	deleteItinerary: (req, res) => {
		
	}
}