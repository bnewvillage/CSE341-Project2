const router = require('express').Router();
const passport = require('passport');

router.use('/', require('./swagger'))
router.use('/products', require('./products'));
router.use('/users', require('./users'));

router.get('/login', passport.authenticate('github', { scope: ['user:email'] }));

router.use('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err);}
        res.redirect('/');
    });
});



module.exports = router;