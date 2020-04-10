const mongoose = require('mongoose');
const config = require('config'); //access default
const db = config.get('mongoURI'); //grab Uniform Resource Identifier to Mongo

const connectDB = async () => {
    try {
        await mongoose
            .connect(db, {
                useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: false,
                useUnifiedTopology: true,
            });
        console.log('MongoDB Connected...');
    }
    catch (err) {
        console.error(err.message);
        process.exit(1) //with failure
    }
};

module.exports = connectDB;

//SAME AS:----------------------------------------------------------------
// const connectDB = () => {
//     mongoose
//         .connect(db, {
//             useNewUrlParser: true,
//             useCreateIndex: true,
//             useFindAndModify: false
//         })
//         .then(() => console.log('MongoDB Connected'))
//         .catch(err => {
//         console.error(err.message);
//         process.exit(1)
//     });
// };

// module.exports = connectDB;


