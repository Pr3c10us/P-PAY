require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// express middleware
const corsOptions = {
    origin: process.env.CLIENT_ORIGIN,
    credentials: true, //access-control-allow-credentials:true
};
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.json());

// home route
app.get('/', (req, res) => {
    console.log(req.cookies);
    res.json('hi');
});

// authentication routes
const authentication = require('./routers/authentication');
app.use('/api/auth', authentication);

// user routes
const user = require('./routers/user');
app.use('/api/user', user);

// transfer routes
const transfer = require('./routers/transfer');
app.use('/api/transfer', transfer);

// Route not found
app.use((req, res) => {
    res.json({ msg: 'Route not Found' });
});
// error Handler
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

// Server and connect to database
const port = process.env.PORT || 5000;
const serve = async () => {
    try {
        await mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGO_URL);
        app.listen(port, () =>
            console.log(`app listening on port http://localhost:${port} `)
        );
    } catch (error) {
        console.log(error);
    }
};

serve();
