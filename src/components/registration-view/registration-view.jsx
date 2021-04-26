import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


export function RegistrationView(props) {
    //call the useState() method (imported from React) with an empty string This method returns an array that you destructure (break down into variables)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');

    

    const handleRegister = (e) => {
        e.preventDefault();
        // sends request to server for authentication
        // entire URL is in package.json under 'proxy' to get past CORS
        axios.post('https://camsmyflic.herokuapp.com/users', {
            Username: username,
            Email: email,
            Password: password,
            Birthday: birthday
        })
            .then(response => {
                const data = response.data;
                console.log(data);
                window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
            })
            .catch(e => {
                console.log(e.response)
            });
    };

    

    return (
        <Form>
            <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBirthday">
                <Form.Label>Date of Birth:</Form.Label>
                <Form.Control type="birthday" value={birthday} onChange={(e) => setBirthday(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleRegister}>
                Submit
          </Button>
        </Form>
    );
}

RegistrationView.propTypes = {
    register: PropTypes.shape({
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired,
        Birthday: PropTypes.string,
      }),
    onRegister: PropTypes.func,
};