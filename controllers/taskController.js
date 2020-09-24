const Project = require('../models/Project');
const Task = require('../models/Task');

exports.addTask = async (req, res, next) => {
    const project = await Project.findOne({
        where: {
            url: req.params.url
        }
    });
    console.log('PARAM:', req.params.url);
    const { task } = req.body;
    const status = 0;
    const projectId = project.id;
    console.log('PROY:', project);
    console.log('ID:', project.id);
    const result = await Task.create({
        task,
        status,
        projectId
    });
    if(!result){
        return next()
    }
    res.redirect(`/projects/${req.params.url}`);
}

exports.toggleStatus = async (req, res) => {
    const { id } = req.params;
    const task = await Task.findOne({
        where: {
            id
        }
    });
    let status = 0;
    if(task.status === status){
        status = 1;
    }
    task.status = status;
    const result = await task.save();
    if(!result) return next();
    res.status(200).send('Actualizado');
}

exports.deleteTask = async (req, res) => {
    const { id } = req.params;
    const task = await Task.destroy({
        where: {
            id
        }
    });
    if(!task) return next();
    res.status(200).send('Tarea eliminada correctamente');
}