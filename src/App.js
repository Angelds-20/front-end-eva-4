import React, { useState, useEffect } from 'react';
import MovieForm from './components/MovieForm';
import MovieList from './components/MovieList';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [editingMovie, setEditingMovie] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('movies');
    if (stored) {
      setMovies(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('movies', JSON.stringify(movies));
  }, [movies]);

  const agregarPelicula = (pelicula) => {
    setMovies([...movies, { ...pelicula, id: Date.now() }]);
  };

  const eliminarPelicula = (id) => {
    const filtradas = movies.filter((p) => p.id !== id);
    setMovies(filtradas);
  };

  const guardarCambios = (editada) => {
    const nuevas = movies.map((p) => (p.id === editada.id ? editada : p));
    setMovies(nuevas);
    setEditingMovie(null);
  };

  const editarPelicula = (p) => {
    setEditingMovie(p);
  };

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">🎬 Mis Películas Favoritas</h1>
      <MovieForm 
        agregar={agregarPelicula} 
        editando={editingMovie} 
        guardarCambios={guardarCambios} 
      />
      <hr />
      <MovieList 
        lista={movies} 
        eliminar={eliminarPelicula} 
        editar={editarPelicula} 
      />
    </div>
  );
};

export default App;