const express = require('express');
const router = express.Router();
const User = require('../models/user');
const wrapAsync = require('../utils/wrapAsync');
const passport = require('passport');
const users = require('../controllers/user');


router.route('/register')
    .get(users.registerUserForm)
    .post(wrapAsync(users.register))

router.route('/login')
    .get(users.loginForm)
    .post(passport.authenticate('local', {failureFlash: true, failureRedirect:'/login'}), 
    users.loginUser
    )

router.get('/logout', users.logout)

module.exports = router;