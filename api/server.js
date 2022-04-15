// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!
const express = require('express');

const projectsRouter = require('./projects/projects-router')

const server = express();

server.use(express.json())
server.use('/api/projects', projectsRouter)

server.get('/', (req, res) => {
    res.send('My Web Api')
})

server.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      message: err.message || 'internal server error',
      stack: err.error.stack,
    });
  });
  

module.exports = server;
