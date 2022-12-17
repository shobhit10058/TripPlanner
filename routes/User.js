const router = require('express').Router()
const { signUp, login, getAllItinerary } = require('../controller/User');
const getUserFromJWT = require("../middleware/validateUser");

router.post("/signUp", signUp);
router.post("/login", login);
router.get("/itineraries", getUserFromJWT, getAllItinerary);

module.exports = router;