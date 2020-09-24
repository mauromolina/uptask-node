const express = require('express')
const router = express.Router();
const projectController = require('../controllers/projectController');
const taskController = require('../controllers/taskController');
const { body } = require('express-validator/check');

module.exports = function() {
    router.get('/', projectController.projectsHome);
    router.get('/newProject', projectController.projectForm);
    router.post(
        '/newProject',
        body('name').not().isEmpty().trim().escape(), 
        projectController.newProject
        );
    router.get('/projects/:url', projectController.getProject);
    router.get('/project/edit/:id', projectController.editProjectForm);
    router.post(
        '/newProject/:id',
        body('name').not().isEmpty().trim().escape(), 
        projectController.editProject
        );
    router.delete('/projects/:url', projectController.deleteProject);
    router.post('/projects/:url', taskController.addTask);
    router.patch('/tasks/:id', taskController.toggleStatus);
    router.delete('/tasks/:id', taskController.deleteTask);
    return router;
}