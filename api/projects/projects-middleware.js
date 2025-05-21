// add middlewares here related to projects
const Projects = require('../projects/projects-model')

async function validateProjectId(req, res, next) {
    try {
        const project = await Projects.get(req.params.id);
        if(project) {
            req.project = project;
            next();
        } else {
            next({ status: 404, message: 'Project is not found.'});
        }
    } catch(error) {
        next(error);
    }
}

function validateProject(req, res, next) {
    const { name, description, completed } = req.body;
    if(
        name !== undefined && 
        typeof name === 'string' && 
        name.trim().length && 
        description !== undefined && 
        typeof description === 'string' && 
        description.trim().length && 
        completed !== undefined && 
        typeof completed === 'boolean'
    ) {
        next();
    } else {
        next({ status: 400, message: "A name, completion status and description is required" });
    }
}


module.exports = {
    validateProjectId,
    validateProject
}