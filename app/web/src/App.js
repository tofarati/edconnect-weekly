import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {BrowserRouter as Router,
        Switch,
        Route} from 'react-router-dom';
import Home from './Home.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import CreateProject from './CreateProject.jsx';
import Project from './Project.jsx';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/login' component={Login}/>
          <Route path='/signup' component={Signup}/>
          <Route path='/projects/submit' component={CreateProject}/>
          <Route path='/project/:id' component={Project}/>
        </Switch>
      </Router>
    </>
  );
}

export default App;
