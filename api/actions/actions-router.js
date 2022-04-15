// Write your "actions" router here!
const express = require('express')

const Actions = require('./actions-model')

const { validateActionId, validateAction } = require('./actions-middlware')

const router = express.Router()

router.get('/', (req, res, next) => {
    Actions.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(error => next({ error }))
})

router.get('/:id', validateActionId, (req, res) => {
    res.status(200).json(req.existingAction)
})

router.post('/', validateAction, (req, res, next) => {
    Actions.insert(req.body)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(error => next({ error }))
})

router.put('/:id', validateAction, validateActionId, (req, res, next) => {
    Actions.update(req.params.id, req.body)
        .then((updated) => {
            res.status(200).json(updated)
        })
        .catch(error => next({ error }))
})

module.exports = router