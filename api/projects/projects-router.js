// Write your "projects" router here!
const express = require('express');

const { validateProjectId, validateProject } = require('./projects-middleware');
const Projects = require('../projects/projects-model');

const router = express.Router();

router.get('/', (req, res, next) => {
    Projects.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(next);
});

router.get('/:id', validateProjectId, (req, res, next) => {
    res.json(req.project);
});

router.post('/', validateProject, (req, res, next) => {
    Projects.insert(req.body)
        .then(project => {
            res.status(201).json(project);
        })
        .catch(next);
});

router.put('/:id', [validateProjectId, validateProject], (req, res, next) => {
    Projects.update(req.params.id, req.body)
        .then(project => {
            res.status(200).json(project);
        })
        .catch(next);
});

router.delete('/:id', validateProjectId, (req, res, next) => {
    const deletedProject = req.projects;
    Projects.remove(req.params.id)
        .then(() => {
            res.status(200).json(deletedProject)
        })
        .catch(next);
});

router.get('/:id/actions', [validateProjectId], (req, res, next) => {
    Projects.getProjectActions(req.params.id)
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(next);
});

module.exports = router;