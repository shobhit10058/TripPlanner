const router = require('express').Router()
const { signUp, login, getAllItinerary } = require('../controller/User');
const { validateUser } = require("../middleware/validateUser");

router.post("/signUp", signUp);
router.post("/login", login);
router.get("/itineraries", validateUser, getAllItinerary);

module.exports = router;