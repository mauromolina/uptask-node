const User = require('../models/User');

exports.newAccountForm = (req, res) => {
    res.render('newAccount', {
        pageName: 'Crear cuenta'
    })
}

exports.newAccount = async (req, res) => {
    const { email, password } = req.body;
    let errorName;
    try {
        await User.create({
            email,
            password
        });
        res.redirect('/logIn');
    } catch (error) {
        console.log(error);
        req.flash('error', error.errors.map( error => error.message));
        if (error.name = 'SequelizeUniqueConstraintError') errorName = error.name;
        res.render('newAccount', {
            pageName: 'Nueva cuenta',
            errors: req.flash(),
            email
        })
    }
}

exports.loginForm = (req, res) => {
    const { error } = res.locals.errors
    res.render('login', {
        pageName: 'Iniciar sesión',
        error
    });
}