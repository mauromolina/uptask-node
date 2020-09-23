const Project = require('../models/Project');
const slug = require('slug');

exports.projectsHome = (req, res) => {
    res.render('index', {
        pageName: 'Proyectos'
    });
}

exports.projectForm = (req, res) => {
    res.render('projectForm', {
        pageName: 'Nuevo Proyecto'
    })
}

exports.newProject = async (req, res) => {
    const { name } = req.body;
    let errors = [];
    if(!name){
        errors.push({
            text: 'El nombre de proyecto es obligatorio'
        })
    }
    if(errors.length > 0){
        res.render('projectForm', {
            pageName: 'Nuevo Proyecto',
            errors
        })
    }
    else {
        const url = (slug(name));
        const project = Project.create({
            name,
            url
        });
        res.redirect('/')
    }
}