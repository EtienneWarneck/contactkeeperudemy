
//entry point to back end
const express = require('express');

//initialize express 
const app =  express();

//prod var or whatever we want
const PORT = process.env.PORT || 5000;

//first endpoint(route) ot hit by server
// app.get('/', (req,res) => res.send("Hello World"));
app.get('/', (req,res) => res.json({msg: "Welcome to Contact Keeper API"}));

//Define Routes
app.use('/api/users', require('./routes/user'))
app.use('/api/contacts', require('./routes/contacts'))
app.use('/api/auth', require('./routes/auth'))

//passing PORT to method 
app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));

