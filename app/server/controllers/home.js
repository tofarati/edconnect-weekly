const express = require('express');

const router = express.Router();

const project = require('../services/project');

router.get('/', (req, res) => {
    const projects = project.getAll();
    const projectShowcase = projects.slice(0,4);
    res.status(200)
    .render('Home', {projects: projectShowcase, user: req.session.user });
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.status(200).redirect('/')
});

module.exports = router;
