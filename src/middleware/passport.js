const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook');
const GoogleStrategy = require('passport-google-oauth20');
const TwitterStrategy = require('passport-twitter');
const { User } = require('../app/models/User');
const bcrypt = require('bcrypt');
const config = require('../config/config')

module.exports = function(passport) {
    // Local Strategy
    passport.use('user', new LocalStrategy(function(username, password, done) {
        // Match Username
        let query = { username: username };
        User.findOne(query, function(err, user) {
            if (err) throw err;
            if (!user) {
                return done(null, false, { message: 'Người dùng không tồn tại' });
            }

            // Match Password
            bcrypt.compare(password, user.password, function(err, isMatch) {
                if (err) throw err;
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Mật khẩu không đúng' });
                }
            });
        });
    }));
    passport.use('admin', new LocalStrategy(function(username, password, done) {
        // Match admin
        let query = { username: username, isAdmin: true };
        User.findOne(query, function(err, user) {
            if (err) throw err;
            if (!user) {
                return done(null, false, { message: 'Người dùng không tồn tại' });
            }

            // Match Password
            bcrypt.compare(password, user.password, function(err, isMatch) {
                if (err) throw err;
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Mật khẩu không đúng' });
                }
            });
        });
    }));


    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // Facebook Strategy
    passport.use(new FacebookStrategy({
            clientID: config.facebookAuth.clientID,
            clientSecret: config.facebookAuth.clientSecret,
            callbackURL: config.facebookAuth.callbackURL
        },
        function(accessToken, refreshToken, profile, cb) {
            User.findOne({ facebookId: profile.id }, (err, user) => {
                if (err) { return cb(err); }
                if (!user) {
                    user = new User({
                        name: profile.displayName,
                        email: profile.id + "ex@gmail.com",
                        password: profile.id,
                        cpassword: profile.id,
                        facebookId: profile.id,

                    });
                    user.save(function(err) {
                        if (err) { throw err; }
                        return cb(null, user);
                    });
                } else {
                    return cb(null, user);
                }
                console.log(profile);
            });
        }));

    // Twitter Strategy
    // passport.use(new TwitterStrategy({
    //     consumerKey: config.twitterAuth.consumerKey,
    //     consumerSecret: config.twitterAuth.consumerSecret,
    //     callbackURL: config.twitterAuth.callbackURL
    // },
    // function(token, tokenSecret, profile, cb) {
    //     User.findOne({ twitterId: profile.id }, function(err, user) {
    //         if (err) { return cb(err); }
    //         if (!user) {
    //             user = new User({
    //                 username: profile.displayName,
    //                 twitterId: profile.id
    //             });
    //             user.save(function(err) {
    //                 if (err) { throw err; }
    //                 return cb(null, user);
    //             });
    //         } else {
    //             return cb(null, user);
    //         }
    //         console.log(profile);
    //     });
    // }));

    // Google Strategy
    passport.use(new GoogleStrategy({
            clientID: config.googleAuth.clientID,
            clientSecret: config.googleAuth.clientSecret,
            callbackURL: config.googleAuth.callbackURL
        },
        (token, tokenSecret, profile, cb) => {
            User.findOne({ googleId: profile.id }, function(err, user) {
                if (err) { return cb(err); }
                if (!user) {
                    user = new User({
                        username: profile.displayName,
                        email: profile.emails[0].value,
                        password: profile.id,
                        cpassword: profile.id,
                        profilePicture: profile.photos[0].value,
                        googleId: profile.id
                    });
                    user.save(function(err) {
                        if (err) { throw err; }
                        return cb(null, user);
                    });
                } else {
                    return cb(null, user);
                }
                console.log(profile);
            });
        }
    ));

}