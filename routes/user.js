const express = require('express');
const wrapAsync = require('../utils/wrapAsync');
const passport = require('passport');
const router = express.Router();
const { saveRedirectUrl } = require('../middleware.js');
const UserController = require('../Controllers/user.js');

//SignUp
router.route("/signup")
.get( UserController.signUpPage )
.post( wrapAsync( UserController.signUp ));


//Login
router.route("/login")
.get( UserController.loginPage )
.post(
    saveRedirectUrl,
    passport.authenticate('local', {
        failureRedirect: '/login',
        failureFlash: true,
    }),
    UserController.login
    );


//Logout
router.get('/logout', UserController.logout);

module.exports = router;