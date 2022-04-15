// add middlewares here related to projects
const Projects = require('./projects-model')

function validateProjectId(req, res, next) {
    Projects.get(req.params.id)
        .then(project => {
            if(project) {
                req.existingProject = project
                next()
            } else {
                res.status(404).json({ message: "project not found"})
            }
        })
        .catch(error => next({ error }))
}

function validateProject(req, res, next) {
    if (typeof req.body.name !== 'string' || req.body.name.trim() === '') {
        res.status(400).json({ message: "name is required"})
    }
    if (typeof req.body.description !== 'string' || req.body.description.trim() === '') {
        res.status(400).json({ message: "description is required"})
    }
    next()
}

module.exports = {
    validateProjectId,
    validateProject
}