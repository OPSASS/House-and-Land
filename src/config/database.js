const mongoose = require('mongoose');
require('dotenv').config();

//Cai dat database
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then(() => {
    console.log('Connected to MongoDB!');
}).catch((err) => {
    console.log('Connection failed to MongoDB!', err);
});

mongoose.set('useFindAndModify', false);

mongoose.connection.on('error', err => {
    console.log('MongoDB connection error', err);
});