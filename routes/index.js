const express = require('express')
const router = express.Router();
const projectController = require('../controllers/projectController');

module.exports = function() {
    router.get('/', projectController.projectsHome);
    router.get('/newProject', projectController.projectForm);
    router.post('/newProject', projectController.newProject)
    return router;
}