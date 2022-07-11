const router = require('express').Router();
const passport = require('passport');
const authController = require('../app/controllers/AuthController');

// [GET] 
// /auth/register
router.get('/register', authController.register);
// /auth/login
router.get('/login', authController.login);

// /auth/logout
router.get('/logout', authController.logout);
// /auth/reset
router.get('/reset', authController.reset);

// /auth/reset/:token
router.post('/reset/:id', authController.opassword);


//***  LOGIN with Facebook ***//
// /auth/facebook
router.get('/facebook',
    passport.authenticate('facebook', { scope: ['public_profile', 'email'] }));
// /auth/facebook/callback
// Chuyen huong
router.get('/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/user/' + req.user.id);
    });

//***  LOGIN with Google ***//
// /auth/google
router.get('/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);

router.get('/google/redirect',
    passport.authenticate('google', { failureRedirect: '/login', failureMessage: true }),
    function(req, res) {
        res.redirect('/user/' + req.user.id);
    }
);

//***  LOGIN with Twitter ***//
// /auth/twitter
router.get('/twitter',
    passport.authenticate('twitter')
);

router.get('/twitter/callback',
    passport.authenticate('twitter', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });



// [POST]
// Register Proccess
router.post('/register', authController.registerProcess);

// Login Process
router.post('/login', authController.loginProcess);

// Reset password process
router.post('/reset', authController.resetProcess);




module.exports = router;