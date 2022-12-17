const router = require('express').Router()
const {createItinerary, deleteItinerary, shareItinerary, getIteraryByID, customizeItinerary} = require('../controller/Itinerary');
const getUserFromJWT = require("../middleware/validateUser");

router.post("/create", getUserFromJWT, createItinerary);
router.delete("/delete/:id", getUserFromJWT, deleteItinerary);
router.post("/share/:id", getUserFromJWT, shareItinerary);
router.get("/:id", getUserFromJWT, getIteraryByID);
router.put("/customize/:id", getUserFromJWT, customizeItinerary);

module.exports = router;