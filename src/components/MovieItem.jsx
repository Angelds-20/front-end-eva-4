import React from 'react';
import { Card, Button } from 'react-bootstrap';

const obtenerEmoji = (genero) => {
  const mapa = {
    'acción': '💥',
    'aventura': '🏕️',
    'ciencia ficción': '👽',
    'comedia': '😂',
    'drama': '🎭',
    'terror': '👻',
    'romance': '❤️',
    'musical': '🎶',
    'documental': '📚',
  };
  return mapa[genero.toLowerCase()] || '🎬';
};

const MovieItem = ({ pelicula, eliminar, editar }) => {
  const emoji = obtenerEmoji(pelicula.genero || '');

  return (
    <Card className="h-100 shadow-sm bg-dark text-white border-light">
      <Card.Body>
        <Card.Title>{emoji} {pelicula.titulo}</Card.Title>
        <Card.Text>
          <strong>Año:</strong> {pelicula.anio}<br />
          <strong>Puntuación:</strong> {pelicula.puntuacion}<br />
          <strong>Género:</strong> {pelicula.genero}
        </Card.Text>
        <div className="d-flex justify-content-between">
          <Button 
            variant="warning" 
            onClick={() => editar(pelicula)}
          >
            Editar
          </Button>
          <Button 
            variant="danger" 
            onClick={() => eliminar(pelicula.id)}
          >
            Eliminar
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default MovieItem;