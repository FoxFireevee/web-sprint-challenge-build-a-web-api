// add middlewares here related to actions
const Actions = require('../actions/actions-model');

async function validateActionId(req, res, next) {
    try {
        const action = await Actions.get(req.params.id);
        if(action) {
            req.action = action;
            next();
        } else {
            next({ status: 404, message: 'Action was not found'});
        }
    } catch(error) {
        next(error);
    }
}

function validateAction(req, res, next) {
    const { project_id, description, notes } = req.body;
    if(
        project_id !== undefined && 
        typeof project_id === 'number' && 
        description !== undefined && 
        typeof description === 'string' && 
        description.trim().length && 
        notes !== undefined && 
        typeof notes === 'string' && 
        notes.trim().length
    ) {
        next();
    } else {
        next({ status: 400, message: 'A project id, description, and notes are required'});
    }
}

module.exports = {
    validateActionId,
    validateAction
}