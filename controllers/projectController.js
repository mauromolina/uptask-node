const Project = require('../models/Project');
const Task = require('../models/Task');
const slug = require('slug');

exports.projectsHome = async (req, res) => {
    const projects = await Project.findAll();
    res.render('index', {
        pageName: 'Proyectos',
        projects
    });
}

exports.projectForm = async (req, res) => {
    const projects = await Project.findAll();
    res.render('projectForm', {
        pageName: 'Nuevo Proyecto',
        projects
    })
}

exports.newProject = async (req, res) => {
    const { name } = req.body;
    let errors = [];
    const projects = await Project.findAll();
    if(!name){
        errors.push({
            text: 'El nombre de proyecto es obligatorio'
        })
    }
    if(errors.length > 0){
        res.render('projectForm', {
            pageName: 'Nuevo Proyecto',
            errors,
            projects
        })
    }
    else {
        const url = (slug(name));
        await Project.create({
            name,
            url
        });
        res.redirect('/')
    }
}

exports.getProject = async (req, res) => {
    const projects = await Project.findAll();
    const project = await Project.findOne({
        where: {
            url: req.params.url
        }
    });
    const tasks = await Task.findAll({
        where: {
            projectId: project.id
        }
    });
    if(!project) return next();
    console.log(project);
    res.render('tasks', {
        pageName: 'Tareas del proyecto',
        project,
        projects,
        tasks
    });
}

exports.editProject = async (req, res) => {
    const { name } = req.body;
    let errors = [];
    const projects = await Project.findAll();
    if(!name){
        errors.push({
            text: 'El nombre de proyecto es obligatorio'
        })
    }
    if(errors.length > 0){
        res.render('projectForm', {
            pageName: 'Editar Proyecto',
            errors,
            projects
        })
    }
    else {
        await Project.update({
            name
        },
        {
            where: {
                id: req.params.id
            }
        });
        res.redirect('/')
    }
}

exports.editProjectForm = async (req, res) => {
    const projects = await Project.findAll();
    const project = await Project.findOne({
        where: {
            id: req.params.id
        }
    });
    res.render('projectForm', {
        pageName: 'Editar Proyecto',
        project,
        projects
    })
}

exports.deleteProject = async (req, res, next) => {
    const { urlProject } = req.query;
    console.log('URL: ', urlProject);    
    const result = await Project.destroy({
        where: {
            url: urlProject
        }
    });
    if(!result){
        return next();
    }
    res.send('Proyecto eliminado correctamente');
}