const passport = require('passport');
const User = require('../models/User');
const crypto = require('crypto');
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op
const bcrypt = require('bcrypt-nodejs');
const sendEmail = require('../handlers/email')

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

exports.sendToken = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({
        where: {
            email
        }
    });
    if(!user){
        req.flash('error', 'No existe esa cuenta')
        res.render('restore');
    }
    user.token = crypto.randomBytes(20).toString('hex');
    user.expiration = Date.now() + 3600000;
    await user.save();
    const resetUrl = `http://${req.headers.host}/restore/${user.token}`;
    await sendEmail.send({
        user,
        subject: 'Recuperar contraseña',
        resetUrl,
        htmlFile: 'passwordMail'
    })
    req.flash('correcto', 'Enviamos un email a tu cuenta. Revisalo!')
    res.redirect('/login');
}

exports.validateToken = async (req, res) => {
    const user = await User.findOne({
        where: {
            token: req.params.token
        }
    });
    if(!user){
        req.flash('error', 'Acción inválida');
        res.redirect('/restore');
    }

    res.render('restorePassword', {
        pageName: 'Restablecer contraseña'
    });
}

exports.restorePassword = async (req, res) => {
    const user = await User.findOne({
        where: {
            token: req.params.token,
            expiration: {
                [Op.gte] : Date.now()
            }
        }
    });
    if(!user){
        res.flash('error', 'Acción inválida');
        res.redirect('/restore');
    }

    user.token = null;
    user.expiration = null;
    user.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

    await user.save();

    req.flash('correcto', 'La contraseña se modificó correctamente');
    res.redirect('/login');

}