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
        .then(() => { return db.createUser(req.body.username, req.body.password); })
        .then(results => {
            res.json({ success: results.affectedRows > 0 });
            // db.close();
        }).catch(err => {
            throw err;
        });
    next();
}

function login(req, res) {
    let user = req.user;
    let token = authCtrl.generateToken(user);
    res.json({ user, token });
    // res.json({ success: true, user: '', accessTocken: '' });
}

router.post('/register', asyncHandler(register), (req, res) => { res.json({}) });
router.post('/login', passport.authenticate('local', { session: false }), login);
router.get('/me', passport.authenticate('jwt', { session: false }), login);
