// add middlewares here related to actions
const Actions = require('./actions-model')

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

module.exports = {
    validateActionId
}