const Sequelize = require('sequelize');
const db = require('../config/db');

const Project = db.define('projects', {
    id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING,
    url: Sequelize.STRING
});

module.exports = Project;