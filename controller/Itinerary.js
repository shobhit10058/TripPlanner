const Itinerary = require('../models/Itinerary');
const User = require('../models/User');
const Trip = require('../models/Trip');

module.exports = {
	createItinerary: async (req, res) => {
		const { body } = req;
		const { tripID, userID } = body;

		if (!tripID)
			return res.status(400).json({ message: "request format improper" });

		const tripObj = await Trip.findById(tripID);
		const userObj = await User.findById(userID);

		let activities = [];
		for (let iterator = 0; iterator < tripObj.duration; iterator += 1)
			activities.push([["time", "activity"]]);

		if (tripObj && userObj) {
			const ItineraryObj = new Itinerary({
				usersRef: [userID],
				tripRef: tripID,
				activities: activities
			});
			await ItineraryObj.save();
			userObj.itineraries.push(ItineraryObj.id);
			await userObj.save();
			tripObj.itineraries.push(ItineraryObj.id);
			await tripObj.save();
			return res.status(200).json({ itinerary: ItineraryObj, message: "Itinerary created" });
		}
		return res.status(400).json({ message: "Itinerary not created" });
	},
	// body -> {TripID, UserID, day, time, activity, operation}
	// UserID is added from token
	customizeItinerary: async (req, res) => {
		const { body } = req;
		const { id } = req.params;
		const { userID, day, time, activity, operation } = body;

		if (!id || !userID || !day || !time || !activity, !operation)
			return res.status(400).json({ message: "request format improper" });

		const itineraryObj = await Itinerary.findById(id);
		const userObj = await User.findById(userID);
		let found = userObj.itineraries.find((itineraryID) => itineraryID.toString() === id);
		if (!found) {
			return res.status(401).json({ message: "User not authorized to modify this itinerary" });
		}
		await itineraryObj.populate("tripRef");

		found = itineraryObj.tripRef.activities.find((currActivity) => currActivity === activity);
		if (!found)
			return res.status(400).json({ message: "activity not present in trip" });

		if (operation == "add") {
			itineraryObj.activities[day] = [...itineraryObj.activities[day], [time, activity]];
		} else if (operation == "remove") {
			itineraryObj.activities[day] = itineraryObj.activities[day].filter((time_activity) => {
				return (!(time_activity[0] === time) || !(time_activity[1] === activity));
			})
		}
		await itineraryObj.save();
		return res.status(200).json({ itinerary: itineraryObj, message: "Itinerary updated" });
	},
	getIteraryByID: async (req, res) => {
		try {
			const { id } = req.params;
			const { userID } = body;
			const userObj = await User.findById(userID);
			let found = userObj.itineraries.find((itineraryID) => itineraryID === id);
			if (!found) {
				return res.status(401).json({ message: "User not authorized to modify this itinerary" });
			}
			const itineraryObj = await Itinerary.findById(id);
			return res.status(200).json(itineraryObj);
		} catch (e) {
			return res.status(400);
		}
	},
	deleteItinerary: async (req, res) => {
		try {
			const { id } = req.params;
			const { userID } = req.body;
			const userObj = await User.findById(userID);
			const found = userObj.itineraries.find((itineraryID) => itineraryID === id);
			if (!found) {
				return res.status(401).json({ message: "User not authorized to delete this itinerary" });
			}
			const itineraryObj = await Itinerary.findById(id);
			const tripObj = await Trip.findById(itineraryObj.tripRef);
			tripObj.itineraries = tripObj.itineraries.filter((itineraryID) => itineraryID !== id);
			await tripObj.save();
			userObj.itineraries = userObj.itineraries.filter((itineraryID) => itineraryID !== id);
			await userObj.save();
			res.status(200).json({ message: "Itinerary deleted" });
		} catch (e) {
			res.status(400).json({ error: e, message: "Itinerary not deleted" });
		}
	},
	shareItinerary: async (req, res) => {
		try {
			const { id } = req.params;
			const { userID, targetUsername } = req.body;
			const sharer = await User.findById(userID);
			const receiver = await User.find({ username: targetUsername });
			console.log({receiver, sharer})
			const itineraryObj = await Itinerary.findById(id);
			const found = sharer.itineraries.find((itineraryID) => itineraryID.toString() === id);
			if (!found) {
				return res.status(401).json({ message: "User not authorized to share this itinerary" });
			}
			receiver.itineraries.push(id);
			itineraryObj.usersRef.push(receiver.id);
			await receiver.save();
			await itineraryObj.save();
			return res.status(200).json({ itinerary: itineraryObj, message: "Itinerary shared" });
		} catch (e) {
			return res.status(400).json({ message: "Itinerary not shared", error: e })
		}
	}
}