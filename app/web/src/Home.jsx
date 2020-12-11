import {React,
        useState,
        useEffect} from 'react';
import {Jumbotron,
        Button,
        Container} from 'react-bootstrap';
import Layout from './shared/Layout';
import ProjectCard from './shared/ProjectCard';

const Home = (props) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch('/api/projects')
    .then(response => response.json()).then(projects => {
      const show = projects.slice(0,4);
      setProjects(show);
    }).catch(e => console.log(e));
  }, [])

  return (
    <Layout>
      <Jumbotron>
        <h1>Welcome to Project Explorer</h1>
        <p>Project Explorer is a repository for final year projects across all departments at your institution. You can upload and search projects and learn from others.</p>
        <Button href="/signup" variant="primary" className='mr-2'>Get Started</Button>
        <Button href="/login" variant="secondary">Login</Button>
      </Jumbotron>
      <Container fluid bg='light' className='showcase d-flex flex-row flex-wrap justify-content-around'>
      {projects.map((project, index) => <ProjectCard key={index} {...project}/>)}
      </Container>
    </Layout>
  );
}

export default Home;
