require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const userRoutes = require("./routes/User");
const tripRoutes = require("./routes/Trip");
const itineraryRoutes = require("./routes/Itinerary");

const app = express();

// middlewares
app.use(cors()); 
app.use(express.json());

// routes
app.use("/users", userRoutes);
app.use("/trips", tripRoutes);
app.use("/itinerary", itineraryRoutes);

// connect to db
mongoose.connect(process.env.DB_URI, { 
	useNewUrlParser: true, 
	useUnifiedTopology: true
}, () => {
  console.log("connected to database");
}) 

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  console.log('server running');
})