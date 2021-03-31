import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios from 'axios';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios.post('https://camsmyflic.herokuapp.com/login', {
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log('no such user')
    });
  }

  
  

  return (
    <Container>
      <Form>
       <Row className="justify-content-md-center">
        <Col md>
      
        
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
        </Form.Group>
       </Col>
       

       
        <Col md>
          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
          </Form.Group>
        </Col>
       </Row>

        <Row>
          <Col>
          
            <Button 
              variant="primary" 
               type="submit" 
               onClick={handleSubmit}>
               Login
          </Button>
         </Col>
       </Row>
      </Form>
     </Container>
  );
}