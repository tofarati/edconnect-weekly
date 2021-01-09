require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const flash = require('express-flash');
const session = require('express-session');
const register = require('@react-ssr/express/register');
const app = express();
const SERVER_PORT = process.env.SERVER_PORT;

( async() => {

  await register(app);

  app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      next();
  });

  app.use(morgan('combined'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
      extended: true
  }));
  app.use(flash());

  app.use(session({
      secret: 'secret',
      cookie: {
          maxAge: 1000 * 60 * 60 * 24 * 7
      },
      resave: true,
      saveUninitialized: false
  }));

  app.use('/api', require('./routes/api'));
  app.use('/', require('./controllers/home'));
  app.use('/', require('./controllers/user'));
  app.use('/', require('./controllers/project'));
  app.use(express.static('public'));

  app.listen(SERVER_PORT, () => console.log('Server listening on port ' + SERVER_PORT));
})()
