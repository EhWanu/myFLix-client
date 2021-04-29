
import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';
import { setMovies } from '../../actions/actions'
import MoviesList from '../movies-list/movies-list'

import { BrowserRouter as Router, Route} from "react-router-dom";
import { DirectorView } from '../director-view/director-view';
import { RegistrationView } from '../registration-view/registration-view'
import { GenreView } from '../genre-view/genre-view';
import { LoginView } from '../login-view/login-view';
// import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { ProfileView } from "../profile-view/profile-view";
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Row, Col } from 'react-bootstrap/';



class MainView extends React.Component {

  constructor() {
    super();
// Initial state is set to null
    this.state = {
      selectedMovie: null,
      user: null
    };
  }

  
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  
  getMovies(token) {
    axios.get('https://camsmyflic.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the state
      this.props.setMovies(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });
  
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  logOut() {

    localStorage.removeItem('token')
    localStorage.removeItem('user')
    this.setState({
      user: null
    });
    alert('Logged out')
    window.open('/login', '_self');
  }
  onRegister(register) {
    this.setState({
      register
    });
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  render() {
    const {selectedMovie, user } = this.state;
    const { movies } = this.props;
    
      
   
    
    if (selectedMovie) return <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />;
    

   
    
    return (
             
    
             
        <Router>   
          <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">
              <img
                src="src\img\iconfinder_github_291716.svg"
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="Github Logo"
              />
             </Navbar.Brand>
             <Nav.Link href='/'>Home</Nav.Link>
                <Nav.Link href={`/users/${user}`}>Profile</Nav.Link>
                <Button onClick={() => this.logOut()}       variant="danger">Log Out</Button>

  {/* <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#link">Link</Nav.Link>
      <NavDropdown title="Dropdown" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-success">Search</Button>
    </Form>
  </Navbar.Collapse> */}
            </Navbar> 
            <Route 
              path="/movies/:movieId" 
                render={({match}) => <MovieView movie={movies.find(m => m._id === match. params.movieId)}/>}/>

            <Route path="/register" render={() => <RegistrationView />} />


                
           <Row className="main-view">
            <Route
             exact path="/" 
               render={() => {
                if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
                return <MoviesList movies={movies}/>;
              }} />
           </Row>


          


          <Route
              path="/directors/:name"
              render={({ match, history}) => {
                if (!movies) return <div className="main-view" />;
                return (
                  <DirectorView
                    director={movies.find(
                      (m) => m.Director.Name === match.params.name
                    )}
                    onBackClick={() => history.goBack()} 
                    movies={movies}
                  />
                );
              }}
            />

          <Route 
            exact path='/users/:username'
              render={({ history }) => {
                if (!user) return <LoginView onLoggedIn={(data) => this.onLoggedIn(data)} />;
                if (movies.length === 0) return;
                return <ProfileView history={history} movies={movies} />
              }
            }
         />


          <Route
              path="/genres/:name"
              render={({ match, history }) => {
                if (!movies) return <div className="main-view" />;
                return (
                  <GenreView
                    genre={movies.find(
                      (m) => m.Genre.Name === match.params.name
                    )}
                    onBackClick={() => history.goBack()} 
                    movies={movies}
                  />
                );
              }}
            />
     </Router>
    );
   }
}
  const mapStateToProps = state => {
    return { movies: state.movies}
}

export default connect(mapStateToProps, { setMovies })(MainView);