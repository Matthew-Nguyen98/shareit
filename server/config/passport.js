const passport = require('passport');
const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcrypt');

// const User = require('../models/user.model');
const config = require('./config');
const db = require('../database/db.js');

// const localLogin = new LocalStrategy({
//     usernameField: 'username'
// }, async (email, password, done) => {
//     let user = await User.findOne({ email });
//     if (!user || !bcrypt.compareSync(password, user.hashedPassword)) {
//         return done(null, false, { error: 'Your login details could not be verified. Please try again.' });
//     }
//     user = user.toObject();
//     delete user.hashedPassword;
//     done(null, user);
// });
// 
// const jwtLogin = new JwtStrategy({
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     secretOrKey: config.jwtSecret
// }, async (payload, done) => {
//     let user = await User.findById(payload._id);
//     if (!user) {
//         return done(null, false);
//     }
//     user = user.toObject();
//     delete user.hashedPassword;
//     done(null, user);
// });
// 
// passport.use(jwtLogin);
// passport.use(localLogin);

passport.use(new LocalStrategy((username, password, done) => {
    db.connect()
        .then(() => { return db.verifyCredentials(username, password); })
        .then(isCorrectPassword => {
            if (!isCorrectPassword)
                return done(null, false);
            return done(null, username);
        }).catch(err => {
            throw err;
        });
}));

passport.use(new JwtStrategy({ 
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret
}, (payload, done) => {
    console.log(payload);
    done();
}));

module.exports = passport;
