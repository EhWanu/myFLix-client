import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

export class MovieView extends React.Component {


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
          </div>
         </Col>
       </Row>
      </Container>
          
        )}
};