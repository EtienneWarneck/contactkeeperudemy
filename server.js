
//entry point to back end
const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

//initialize express 
const app = express();

//connect Database
connectDB();

//Init Middleware to accept body data
app.use(express.json({ extended: false }));

//first endpoint(route) to hit by server
// app.get('/', (req,res) => res.send("Hello World"));

//remove for deployment:
// app.get('/', (req, res) =>
//     res.json({ msg: "Welcome to Contact Keeper API" }));

//Define Routes
//Everything that goes to /api/ PATH get forwarded into the file ROUTE that is required
app.use('/api/users', require('./routes/user'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/contacts', require('./routes/contacts'))

//Serve static assets REACT in production
if (process.env.NODE_ENV === 'production') { //check environment, if in production
    app.use(express.static('client/build')); //load static react build folder
    //if we hit homepage, load index.html
    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    );
}

//prod var or whatever we want
const PORT = process.env.PORT || 5000;

//passing PORT to method 
app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));

