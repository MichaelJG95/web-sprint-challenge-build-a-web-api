// add middlewares here related to actions
const Actions = require('./actions-model')
const Projects = require('../projects/projects-model')

function validateActionId(req, res, next) {
    Actions.get(req.params.id)
        .then(action => {
            if(action) {
                req.existingAction = action
                next()
            } else {
                res.status(404).json({ message: "action not found"})
            }
        })
        .catch(error => next({ error }))
}

function validateAction(req, res, next) {
    if (typeof req.body.description !== 'string' || req.body.description.trim() === '') {
        res.status(400).json({ message: "description is required"})
        return
    }
    if (req.body.description.length > 128) {
        res.status(400).json({ message: "description must not exceed 128 characters"})
        return
    }
    if (typeof req.body.notes !== 'string' || req.body.notes.trim() === '') {
        res.status(400).json({ message: "notes is required"})
        return
    }
    if (typeof req.body.project_id !== 'number') {
        res.status(400).json({ message: "valid project_id is required"})
        return
    }
    Projects.get(req.body.project_id)
        .then(project => {
            if(project) {
                // req.existingProject = project
                next()
            } else {
                res.status(400).json({ message: "valid project_id is required" })
                return
            }
        })
        .catch(error => next({ error }))
    // next()
}

module.exports = {
    validateActionId,
    validateAction
}