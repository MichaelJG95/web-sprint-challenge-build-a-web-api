// Write your "actions" router here!
const express = require('express')

const Actions = require('./actions-model')

const {} = require('./actions-middlware')

const router = express.Router()

router.get('/', (req, res, next) => {
    Actions.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(error => next({ error }))
})

module.exports = router