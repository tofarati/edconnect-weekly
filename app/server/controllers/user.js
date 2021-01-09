const express = require('express');

const router = express.Router();

const school = require('../services/school');
const user = require('../services/user');

router.get('/signup', (req, res) => {
  const programs = school.getPrograms();
  const graduationYears = school.getGradYears();

  const errorMsg = req.flash('error');
  let formData, errors;
  if(errorMsg.length){
    [errors, formData] = JSON.parse(errorMsg);
  }

  res.status(200)
  .render('Signup', {user: req.session.user, programs, graduationYears, errors, formData});
});

router.post('/signup', (req, res) => {
  const newUser = req.body;
  const [isCreated, result] = user.create(newUser);

  if(isCreated){
    req.session.user = result;
    res.status(200)
    .redirect('/');
  } else {
    req.flash('error', JSON.stringify([result, newUser]));
    res.status(400)
    .redirect('/signup');
  }
});

router.get('/login', (req, res) => {
  const errorMsg = req.flash('error');
  let errors;
  if(errorMsg.length){
    errors = JSON.parse(errorMsg);
  }
  res.status(200)
  .render('Login', {user: req.session.user, errors});
});

router.post('/login', (req, res) => {
  const {email, password} = req.body;
  const [isAuthenticated, result] = user.authenticate(email, password);

  if(isAuthenticated){
    req.session.user = result;
    res.status(200)
    .redirect('/');
  } else {
    req.flash('error', JSON.stringify(result));
    res.status(400)
    .redirect('/login');
  }
});

module.exports = router;
