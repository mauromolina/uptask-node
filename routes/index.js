const express = require('express')
const router = express.Router();
const projectController = require('../controllers/projectController');

module.exports = function() {
    router.get('/', projectController.projectsHome);

    return router;
}