const router = require('express').Router()
const {createItinerary, deleteItinerary, shareItinerary, getIteraryByID, customizeItinerary} = require('../controller/Itinerary');
const { validateUser } = require("../middleware/validateUser");

router.post("/create", validateUser, createItinerary);
router.delete("/delete/:id", validateUser, deleteItinerary);
router.post("/share/:id", validateUser, shareItinerary);
router.get("/:id", validateUser, getIteraryByID);
router.put("/customize/:id", validateUser, customizeItinerary);

module.exports = router;