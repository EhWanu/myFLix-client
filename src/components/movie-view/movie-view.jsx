import React from 'react';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

export class MovieView extends React.Component {


  addFavouriteMovie(movie) {
    let token = localStorage.getItem("token");
    let url =
      "https://camsmyflic.herokuapp.com/users/" +
      (localStorage.getItem("user")) +
      "/movies/" +
      movie._id;
    console.log(token);

    axios
      .post(url, "", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        // window.open("/", "_self");



        window.open("/users/"(localStorage.getItem("user")).Username, "_self");
        alert("Added to favourites!");
      });
  }

    render() {
        const { movie, } = this.props;
    
        return (
        <Container className="wrapper container-fluid">
          <Row>
            <Col className="col-3" />
            <Col className="director-view container-fluid align-items-center col-6">
          <div className="movie-view">
            <div className="movie-poster">
              <img src={movie.ImagePath} />
            </div>
            <div className="movie-title">
              <span className="label">Title: </span>
              <span className="value">{movie.Title}</span>
            </div>
            <div className="movie-description">
              <span className="label">Description: </span>
              <span className="value">{movie.Description}</span>
            </div>
            <Link to={`/directors/${movie.Director.Name}`}>
              <Button variant="primary">Director</Button>
            </Link>
            <Link to={`/genres/${movie.Genre.Name}`}>
             <Button variant="primary">Genre</Button>
            </Link>
            <Link to={`/`}>
                <Button variant="primary">Return</Button>
            </Link>
            <Link to={'/'}> <Button variant="primary">Back</Button> </Link>
        <Button variant="primary" onClick={() => this.addFavouriteMovie(movie)}>Favourite</Button>
          </div>
         </Col>
       </Row>
      </Container>
          
        )}
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string,
    Year: PropTypes.number,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string,
      Biography: PropTypes.string
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string,
      Bio: PropTypes.string,
      Birthdate: PropTypes.string
    }),
    Featured: PropTypes.bool
  })
}