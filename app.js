const mongoose = require('mongoose');
const express = require('express');
const morgan = require("morgan");
const helmet = require("helmet");
const app = express();
const usersRoute = require('./routes/usersRoutes');
const productsRoute = require('./routes/productsRoutes');
const ordersRoute = require('./routes/orderRoutes');

// REGISTER HTTP MIDDLEWARE
app.use(morgan("dev"));

//SECURITY MIDDLEWERES
app.use(helmet());

// SANITAZE FILTER
mongoose.set("sanitizeFilter", true);

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//ROUTES
app.use('/users', usersRoute);
app.use('/products', productsRoute);
app.use('/orders', ordersRoute);

app.get('/', (req, res) => {
    res.status(200).json({ message: "Benvenuti in Orizon Agency" });
    });


app.get('*', (req, res) => {
    res.status(404).json({ message: "Route non trovata" });
});

module.exports = app