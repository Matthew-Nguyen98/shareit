const express = require('express');
const asyncHandler = require('express-async-handler')
const passport = require('passport');
// const userCtrl = require('../controllers/user.controller');
const authCtrl = require('../controllers/auth.controller');
const config = require('../config/config');
const db = require('../database/db.js');

const router = express.Router();
module.exports = router;

async function register(req, res, next) {
    db.connect()
      .then(() => {
        db.createUser(req.body.username, req.body.password);
    })
    // db.close();
    next();
}

function login(req, res) {
    // let user = req.user;
    // console.log(user);
    // let token = authCtrl.generateToken(user);
    // res.json({ user, token });
    res.json({  });
}

router.post('/register', asyncHandler(register), login);
router.post('/login', passport.authenticate('local', { session: false }), login);
router.get('/me', passport.authenticate('jwt', { session: false }), login);
