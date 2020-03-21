
//entry point to back end
const express = require('express');
const connectDB = require('./config/db');

//initialize express 
const app = express();

//connect Database
connectDB();

//Init Middleware to accept body data
app.use(express.json({ extended: false }));

//first endpoint(route) to hit by server
// app.get('/', (req,res) => res.send("Hello World"));
app.get('/', (req, res) =>
    res.json({ msg: "Welcome to Contact Keeper API" }));

//Define Routes
//Everything that goes to /api/ PATH get forwarded into the file ROUTE that is required
app.use('/api/users', require('./routes/user'))
app.use('/api/contacts', require('./routes/contacts'))
app.use('/api/auth', require('./routes/auth'))

//prod var or whatever we want
const PORT = process.env.PORT || 5000;

//passing PORT to method 
app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));

