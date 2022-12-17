const {getAllTrips, getTripByID, addTrip, updateTrip, deleteTrip, searchTrip} = require("../controller/Trip")
const router = require('express').Router()
const getUserFromJWT = require("../middleware/validateUser");

router.get('/', getUserFromJWT, getAllTrips)
router.get('/:id', getUserFromJWT, getTripByID)
router.post('/new', getUserFromJWT, addTrip)
router.put('/:id', getUserFromJWT, updateTrip)
router.delete('/:id', getUserFromJWT, deleteTrip)
router.get("/search", getUserFromJWT, searchTrip)

module.exports = router