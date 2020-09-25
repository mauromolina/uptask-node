const express = require('express')
const router = express.Router();
const projectController = require('../controllers/projectController');
const taskController = require('../controllers/taskController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const { body } = require('express-validator/check');

module.exports = function() {
    router.get('/', 
        authController.userAuthenticated,
        projectController.projectsHome
    );
    router.get('/newProject', 
        authController.userAuthenticated,
        projectController.projectForm
    );
    router.post(
        '/newProject',
        authController.userAuthenticated,
        body('name').not().isEmpty().trim().escape(), 
        projectController.newProject
    );
    router.get('/projects/:url', 
        authController.userAuthenticated,
        projectController.getProject
    );
    router.get('/project/edit/:id', 
        authController.userAuthenticated,
        projectController.editProjectForm
    );
    router.post(
        '/newProject/:id',
        authController.userAuthenticated,
        body('name').not().isEmpty().trim().escape(), 
        projectController.editProject
    );
    router.delete('/projects/:url', 
        authController.userAuthenticated,
        projectController.deleteProject
    );
    router.post('/projects/:url', 
        authController.userAuthenticated,
        taskController.addTask
    );
    router.patch('/tasks/:id', 
        authController.userAuthenticated,
        taskController.toggleStatus
    );
    router.delete('/tasks/:id', 
        authController.userAuthenticated,
        taskController.deleteTask
    );
    router.get('/newAccount', userController.newAccountForm);
    router.post('/newAccount', userController.newAccount);
    router.get('/login', userController.loginForm);
    router.post('/login', authController.authUser);
    router.get('/logOut', authController.logOut);
    return router;
}