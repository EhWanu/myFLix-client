
import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route} from "react-router-dom";
import { DirectorView } from '../director-view/director-view';
import { RegistrationView } from '../registration-view/registration-view'
import { GenreView } from '../genre-view/genre-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { ProfileView } from "../profile-view/profile-view";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



export class MainView extends React.Component {

  constructor() {
    super();
// Initial state is set to null
    this.state = {
      movies: [],
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
      this.setState({
        movies: response.data
      });
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
    const { movies, selectedMovie, user } = this.state;
    
      
   
    
    if (selectedMovie) return <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />;
    
    
    return (
              <Router>
              
            <Route 
              path="/movies/:movieId" 
                render={({match}) => <MovieView movie={movies.find(m => m._id === match. params.movieId)}/>}/>

            <Route path="/register" render={() => <RegistrationView />} />


                
           <Row className="main-view">
            <Route
             exact path="/" 
               render={() => {
                if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
                  return movies.map(
                    m => 
                    <MovieCard
                      key={m._id} movie={m}
                    />
                  )
                }
              }
            />
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