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