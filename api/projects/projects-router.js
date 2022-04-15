// Write your "projects" router here!
const express = require('express')

const Projects  = require('./projects-model')

const { validateProjectId, validateProject } = require('./projects-middleware')

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

module.exports = router