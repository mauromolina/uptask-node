const User = require('../models/User');
const sendEmail = require('../handlers/email');

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

        const confirmUrl = `http://${req.headers.host}/confirm/${email}`;
        const user = {
            email
        }
        await sendEmail.send({
            user,
            subject: 'Confirmar cuenta',
            confirmUrl,
            htmlFile: 'confirmMail'
        })
        req.flash('correcto', 'Te enviamos un correo para la confirmación de tu cuenta')
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

exports.confirmAccount = async (req, res) => {
    const user = await User.findOne({
        email: req.params.email
    });
    if(!user){
        req.flash('error', 'Email inválido')
        res.redirect('/login');
    }
    user.active = 1;
    user.save();
    req.flash('correcto', 'Tu cuenta se activó correctamente');
    res.redirect('/login');
}

exports.loginForm = (req, res) => {
    const { error } = res.locals.errors
    res.render('login', {
        pageName: 'Iniciar sesión',
        error
    });
}

exports.restorePasswordForm = (req, res) => {
    res.render('restore', {
        pageName: 'Recuperar contraseña'
    })
}

