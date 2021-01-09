import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Layout from './shared/Layout';

const ProjectCard = ({id, name, authors, abstract, tags}) => {
  return (
    <Card style={{ width: '18rem' }} className='mb-4 hoverable'>
      <a href={`/project/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <Card.Body>
          <Card.Title className='text-primary'>{name}</Card.Title>
          <Card.Subtitle>{authors.join(', ')}</Card.Subtitle>
          <Card.Text className='mt-2'>{abstract.substring(0,50)}...</Card.Text>
        </Card.Body>
        <Card.Footer className='text-primary small font-weight-bold'>
          {tags.join(' ')}
        </Card.Footer>
      </a>
    </Card>
  );
}

const Home = ({projects, user}) => {

  return (
    <Layout user={user}>
      <>
        <Jumbotron>
          <h1>Welcome to Project Explorer</h1>
          <p>Project Explorer is a repository for final year projects across all departments at your institution. You can upload and search projects and learn from others.</p>
          <Button href="/signup" variant="primary" className='mr-2'>Get Started</Button>
          <Button href="/login" variant="secondary">Login</Button>
        </Jumbotron>
        <Container fluid bg='light' className='showcase d-flex flex-row flex-wrap justify-content-around'>
        {projects.map((project, index) => <ProjectCard key={index} {...project}/>)}
        </Container>
      </>
    </Layout>
  );
}

export default Home;
