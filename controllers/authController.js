const passport = require('passport');

exports.authUser = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
    badRequestMessage: 'Ambos campos son obligatorios'
})

exports.userAuthenticated = (req, res, next) => {

    if(req.isAuthenticated()){
        return next();
    }

    return res.redirect('/login')

}

exports.logOut = (req, res) => {
    req.session.destroy( () => {
        res.redirect('/login');
    })
}