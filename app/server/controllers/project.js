const express = require('express');

const router = express.Router();

const project = require('../services/project');
const user = require('../services/user')

router.get('/projects/submit', (req, res) => {
  if(req.session.user){
    const errorMsg = req.flash('error');
    let errors;
    if(errorMsg.length){
      errors = JSON.parse(errorMsg);
    }
    res.status(200)
    .render('CreateProject', {user: req.session.user, errors});
  } else {
    res.status(401)
    .redirect('/login');
  }
});

router.post('/projects/submit', (req, res) => {
  let authors, tags;
  if(req.body.tags.length){
	tags = req.body.tags.split('#')
	.map(tag => tag.trim()).filter(word => word.length);}
  if(req.body.authors.length){
	authors = req.body.authors.split(',')
	.map(name => name.trim()).filter(word => word.length);}
	
  const newProject = {...req.body, createdBy: req.session.user.id, authors, tags};
 
  const [isCreated, result] = project.create(newProject);
  if(isCreated){
    res.status(200)
    .redirect('/');
  } else {
    req.flash('error', JSON.stringify(result));
    res.status(400)
    .redirect('/projects/submit');
  }
});

router.get('/projects/:id', (req, res) => {
  const projectData = project.getById(req.params.id);
  const creator = user.getById(projectData.createdBy);
  const creatorName = creator.firstname + ' ' + creator.lastname;

  res.status(200)
  .render('Project', {user: req.session.user, project: projectData, creatorName});
});

module.exports = router;
