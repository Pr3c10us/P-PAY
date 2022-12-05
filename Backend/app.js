// INSTALL DEPENDENCIES
// utils
require('dotenv').config();
require('express-async-errors');
const cookieParser = require('cookie-parser');
// mongoose dependency
const mongoose = require('mongoose');
// express dependency
const express = require('express');
const app = express();

// routes dependencies
const authRoutes = require('./Routes/authRoute');
const userRoutes = require('./Routes/userRoute');
// middleware dependencies
const errorHandler = require('./Middleware/errorHandler');

// MIDDLEWARE
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

//routes
app.use('/api/v1/auth/', authRoutes);
app.use('/api/v1/user/', userRoutes);

// create a default route
app.get('/', (req, res) => {
    res.json({ msg: 'Default Route' });
});
// not found
app.use((req, res) => {
    res.json({ msg: 'Route not found' });
});
// error handler
app.use(errorHandler);
// create port
const port = process.env.PORT || 5000;
// serve Api
const Serve = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to Database');
    app.listen(port, () =>
        console.log(`Api serving on http://localhost:${port}`)
    );
};
Serve();
