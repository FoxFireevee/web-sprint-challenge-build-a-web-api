const express = require('express');
const server = express();
const actionsRouter = require('./actions/actions-router');
const projectsRouter = require('./projects/projects-router');

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

server.use(express.json());

server.use('/api/actions', actionsRouter);
server.use('/api/projects', projectsRouter);
server.get('/', (req, res) => {
    res.send(`<h2>Let's get this project launched!<h2>`);
});

server.use((error, req, res, next) => {
    res.status(error.status || 500).json({ message: error.message});
});

server.use('*', (req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

module.exports = server;
