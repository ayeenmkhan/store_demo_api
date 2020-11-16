const path = require('path');
const express = require('express');
var bodyParser = require('body-parser')
var cors = require('cors')
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env' });

connectDB();
const app = express();
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())

// parse application/json
app.use(bodyParser.json())

// const trnasactions = require('./routes/transactions');
const signup = require('./routes/user/signup');
const login = require('./routes/user/login');
const product = require('./routes/product/product');

app.use(express.json());
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
// app.use('/api/v1/transactions', trnasactions);
app.use('/api/v1/product', product);
app.use('/api/v1/signup', signup);
app.use('/api/v1/login', login);



// Configuration for deploymnet of on server and run on one port
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}
const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server running  in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));