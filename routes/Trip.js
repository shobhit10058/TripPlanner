const {getAllTrips, getTripByID, addTrip, updateTrip, deleteTrip, searchTrip} = require("../controller/Trip")
const router = require('express').Router()

router.get('/', getAllTrips)
router.get('/:id', getTripByID)
router.post('/', addTrip)
router.put('/:id', updateTrip)
router.delete('/:id', deleteTrip)
router.get("/search", searchTrip)

export default router