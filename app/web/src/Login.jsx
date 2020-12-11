import {React, useState} from 'react';
import {Form, Button, Alert} from 'react-bootstrap';
import Layout from './shared/Layout';

const Login = (props) => {
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errAlerts, setErrAlerts] = useState([]);

  const handleChange = (evt) => {
    switch(evt.target.name){
      case 'email':
        setEmail(evt.target.value);
        break;
      case 'password':
        setPassword(evt.target.value);
        break;
      default:
    }
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    const form = evt.currentTarget;
    if (form.checkValidity()) {
      fetch(`/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({email: email, password: password})
      }).then(async (response) => {
        let body = await response.json();
        if (response.status === 200){
          let key = 'uid';
          let val = encodeURIComponent(body.data.id);
          document.cookie = `${key}=${val};path=/;max-age=${60*60*24*30};`;
          window.location.href= '/';
        } else {
          setErrAlerts(body.errors);
        }
      })
    }
    setValidated(true);
  }

  return (
    <Layout>
      <h2 className="mt-4">Login</h2>
      <Form noValidate validated={validated} onSubmit={handleSubmit} id='loginForm'>
        {errAlerts.map((err, index) => <Alert variant='danger' key={index}>{err}</Alert>)}
        <Form.Group controlId='validationCustom1'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control required type="email" name='email' placeholder="Enter email" onChange={handleChange}/>
          <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type='invalid'>Please enter a valid email address</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId='validationCustom2'>
          <Form.Label>Password</Form.Label>
          <Form.Control required type="password" name='password' placeholder="Enter password" onChange={handleChange}/>
          <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type='invalid'>Please enter a valid password</Form.Control.Feedback>
        </Form.Group>
        <Button type='submit'>Login</Button>
      </Form>
    </Layout>
  );
}

export default Login;
