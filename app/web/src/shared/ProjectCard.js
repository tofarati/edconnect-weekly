import React from 'react';
import {Card} from 'react-bootstrap';

const ProjectCard = ({id, name, authors, abstract, tags}) => {
  return (
    <Card style={{ width: '18rem' }} className='mb-4 hoverable' onClick={() => window.location.href = `/project/${id}`}>
      <Card.Body>
        <Card.Title className='text-primary'>{name}</Card.Title>
        <Card.Subtitle>{authors.join(', ')}</Card.Subtitle>
        <Card.Text className='mt-2'>{abstract.substring(0,50)}...</Card.Text>
      </Card.Body>
      <Card.Footer className='text-primary small font-weight-bold'>
        {tags.join(' ')}
      </Card.Footer>
    </Card>
  );
}

export default ProjectCard;
