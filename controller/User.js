const User = require('../models/user');
const Trip = require('../models/Trip');
const Itinerary = require('../models/Itinerary');
const { hashPassword, verifyPassword } = require('../utilities/managePasswords')
const { genJWT, verifyJWT } = require('../utilities/jwtAuth');

module.exports = {
	signUp: async (req, res) => {
		const { username, password } = req.body;
		const secPassword = await hashPassword(password);

		try {
			const newUser = new User({ username: username, password: secPassword, itineraries: [] });
			await newUser.save();

			const token = genJWT({ userID: newUser.id });
			res.status(200).json({ token: token, message: "user details saved" });
		} catch (e) {
			res.status(400).json({ message: "user details not saved" });
		}
	},
	login: async (req, res) => {
		const { username, password } = req.body;
		try {
			const user = await User.findOne({ username });
			if (!user) {
				res.status(401).json({ message: "please login with correct credentials" });
			} else {
				const isCorrPass = await verifyPassword(password, user.password);
				if (!isCorrPass) {
					res.status(401).json({ message: "please login with correct credentials" });
				} else {
					const token = genJWT({ userID: user.id });
					res.status(200).json({ token: token, message: "user logged in successfully" });
				}
			}
		} catch (e) {
			res.status(500).json({ message: "server error occurred" })
		}
	},
	getAllItinerary: async (req, res) => {
		try {
			const { userID } = req.body;
			const userObj = await User.findById(userID);
			await userObj.populate('itineraries');
			res.status(200).json({itineraries: userObj.itineraries});
		} catch (e) {
			res.status(400).json({message: "could not get itineraries"});
		}
	}
}