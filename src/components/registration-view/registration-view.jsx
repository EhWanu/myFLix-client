import axios from 'axios';


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
