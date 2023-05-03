const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const router = express.Router();

router.get('/register', (req, res) => {
  res.render('users/register');
});

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.redirect('/users/login');
  } catch (error) {
    res.render('users/register', { error: 'Error creating user' });
  }
});


router.get('/login', (req, res) => {
  res.render('users/login');
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
        req.session.userId = user._id;
        res.redirect('/cars');
        } else {
        res.render('users/login', { error: 'Invalid username or password' });
        }
        } catch (error) {
        res.render('users/login', { error: 'Error logging in' });
        }
        });
        
        router.get('/logout', (req, res) => {
        req.session.destroy(() => {
        res.redirect('/users/login');
        });
        });
        
        module.exports = router;
