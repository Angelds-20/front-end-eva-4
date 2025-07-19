import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Card } from 'react-bootstrap';

const MovieForm = ({ agregar, editando, guardarCambios }) => {
  const [titulo, setTitulo] = useState('');
  const [anio, setAnio] = useState('');
  const [puntuacion, setPuntuacion] = useState('');
  const [genero, setGenero] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (editando) {
      setTitulo(editando.titulo);
      setAnio(editando.anio);
      setPuntuacion(editando.puntuacion);
      setGenero(editando.genero);
    }
  }, [editando]);

  const validarFormulario = () => {
    if (!titulo || !anio || !puntuacion || !genero) {
      return 'Todos los campos son obligatorios.';
    }

    if (!/^\d{4}$/.test(anio)) {
      return 'El año debe tener exactamente 4 dígitos.';
    }

    const punt = Number(puntuacion);
    if (isNaN(punt) || punt < 1 || punt > 10) {
      return 'La puntuación debe estar entre 1 y 10.';
    }

    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const mensajeError = validarFormulario();
    if (mensajeError) {
      setError(mensajeError);
      return;
    }

    const nueva = { titulo, anio, puntuacion, genero };

    if (editando) {
      guardarCambios({ ...editando, ...nueva });
    } else {
      agregar(nueva);
    }

    setTitulo('');
    setAnio('');
    setPuntuacion('');
    setGenero('');
    setError('');
  };

  return (
    <Card className={`p-4 shadow ${editando ? 'border-warning bg-light' : ''}`}>
      <h4 className="mb-3">
        {editando ? '✏️ Editando Película' : '🎞️ Agregar Película'}
      </h4>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Título</Form.Label>
          <Form.Control 
            type="text" 
            value={titulo} 
            onChange={(e) => setTitulo(e.target.value)} 
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Año</Form.Label>
          <Form.Control 
            type="text" 
            value={anio} 
            onChange={(e) => setAnio(e.target.value)} 
            placeholder="Ej: 2024"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Puntuación (1-10)</Form.Label>
          <Form.Control 
            type="number" 
            value={puntuacion} 
            onChange={(e) => setPuntuacion(e.target.value)} 
            min="1" 
            max="10" 
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Género</Form.Label>
          <Form.Select 
            value={genero} 
            onChange={(e) => setGenero(e.target.value)}
          >
            <option value="">Selecciona un género</option>
            <option value="acción">Acción</option>
            <option value="aventura">Aventura</option>
            <option value="ciencia ficción">Ciencia ficción</option>
            <option value="comedia">Comedia</option>
            <option value="drama">Drama</option>
            <option value="terror">Terror</option>
            <option value="romance">Romance</option>
            <option value="musical">Musical</option>
            <option value="documental">Documental</option>
          </Form.Select>
        </Form.Group>

        <Button variant={editando ? "warning" : "primary"} type="submit">
          {editando ? 'Guardar cambios' : 'Agregar película'}
        </Button>
      </Form>
    </Card>
  );
};

export default MovieForm;