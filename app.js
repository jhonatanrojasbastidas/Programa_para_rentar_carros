const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const User = require('./models/User');
const Car = require('./models/Car');
const Rent = require('./models/Rent');
const userRoutes = require('./routes/user');
const carRoutes = require('./routes/car');
const rentRoutes = require('./routes/rent');

const app = express();
const store = new MongoDBStore({
  uri: 'mongodb://localhost:27017/dbRentacar',
  collection: 'sessions',
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(
  session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  next();
});

app.use('/users', userRoutes);
app.use('/cars', carRoutes);
app.use('/rents', rentRoutes);

mongoose
  .connect('mongodb://localhost:27017/dbRentacar')
  .then(() => {
    app.listen(3000);
    console.log('Server running on port 3000');
  })
  .catch((err) => {
    console.log(err);
  });
