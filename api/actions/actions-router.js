// Write your "actions" router here!
const express = require('express');

const { validateActionId, validateAction } = require('./actions-middleware');
const Actions = require('./actions-model')

const router = express.Router();

router.get('/', (req, res, next) => {
    Actions.get()
        .then(action => {
            res.status(200).json(action)
        })
        .catch(next);
});

router.get('/:id', validateActionId, (req, res, next) => {
    res.json(req.action);
});

router.post('/', validateAction, (req, res, next) => {
    Actions.insert(req.body)
        .then(action => {
            res.status(201).json(action);
        })
        .catch(next);
});

router.put('/:id', [validateActionId, validateAction], (req, res, next) => {
    Actions.update(req.params.id, req.body)
        .then(action => {
            res.status(200).json(action);
        })
        .catch(next);
});

router.delete('/:id', validateActionId, (req, res, next) => {
    const deletedAction = req.action;
    Actions.remove(req.params.id)
        .then(() => {
            res.status(200).json(deletedAction);
        })
        .catch(next);
});

module.exports = router;