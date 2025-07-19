import React from 'react';
import MovieItem from './MovieItem';
import { Row, Col } from 'react-bootstrap';

const MovieList = ({ lista, eliminar, editar }) => {
  if (lista.length === 0) {
    return <p className="text-center mt-4">No hay películas aún.</p>;
  }

  return (
    <Row className="gy-3">
      {lista.map((pelicula) => (
        <Col xs={12} sm={6} lg={4} key={pelicula.id}>
          <MovieItem 
            pelicula={pelicula} 
            eliminar={eliminar} 
            editar={editar} 
          />
        </Col>
      ))}
    </Row>
  );
};

export default MovieList;