const express = require('express')
const router = express.Router();
const projectController = require('../controllers/projectController');
const { body } = require('express-validator/check');

module.exports = function() {
    router.get('/', projectController.projectsHome);
    router.get('/newProject', projectController.projectForm);
    router.post(
        '/newProject',
        body('name').not().isEmpty().trim().escape(), 
        projectController.newProject
        )
    return router;
}