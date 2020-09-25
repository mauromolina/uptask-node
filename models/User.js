const Sequelize = require('sequelize');
const db = require('../config/db');
const Project = require('./Project');
const bcrypt = require('bcrypt-nodejs');

const User = db.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: {
                msg: 'Por favor, agrega un e-mail válido'
            },
            notEmpty: {
                msg: 'El email es obligatorio'
            }
        },
        unique: {
            msg: 'Error! El usuario ya está registrado'
        }
    },
    password: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'La contraseña es obligatoria'
            }
        }
    }
}, {
    hooks: {
        beforeCreate(user){
            user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
        }
    }
}
);

User.prototype.verifyPassword = function (password){
    return bcrypt.compareSync(password, this.password);
}

User.hasMany(Project);
module.exports = User;