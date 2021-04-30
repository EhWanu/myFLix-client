import React from 'react';
import { Container } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';

import { MovieCard } from '../movie-card/movie-card';

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  if (!movies) return <div className="main-view"/>;

 return filteredMovies.map(m => (
   <Container flex='sm' className="justify-conent-md-center" fluid="md"  key={m._id}>
     <div className='container d-flex flex-wrap justify-content-center'>
       
         <MovieCard movie={m} />
      
    </div>
  </Container>
  ));
}

export default connect(mapStateToProps)(MoviesList);