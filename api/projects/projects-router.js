// Write your "projects" router here!
const express = require('express')

const Projects  = require('./projects-model')

const { validateProjectId, validateProject, validateProjectUpdate } = require('./projects-middleware')

const router = express.Router()

router.get('/', (req, res, next) => {
    Projects.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(error => next({ error }))
})

router.get('/:id', validateProjectId, (req, res) => {
   res.status(200).json(req.existingProject)
})

router.post('/', validateProject, (req, res, next) => {
    Projects.insert(req.body)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(error => next({ error }))
})

router.put('/:id', validateProjectUpdate, validateProjectId, (req, res, next) => {
    Projects.update(req.params.id, req.body)
        .then((updated) => {
            res.status(200).json(updated)
        })
        .catch(error => next({ error }))
})

router.delete('/:id', validateProjectId, (req, res, next) => {
    Projects.remove(req.params.id)
        .then(() => {
            res.status(200).json({ message: "project deleted" })
        })
        .catch(error => next({ error }))
})

router.get('/:id/actions', validateProjectId, (req, res, next) => {
    Projects.getProjectActions(req.params.id)
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(error => next({ error }))
})

module.exports = router