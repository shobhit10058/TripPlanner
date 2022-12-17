require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express();

// middlewares
app.use(cors()); 
app.use(express.json());

// routes


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