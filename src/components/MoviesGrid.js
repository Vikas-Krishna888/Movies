import React, { useEffect, useState } from "react";
import "../styles.css";

export default function MoviesGrid() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("movies.json")
      .then((response) => response.json())
      .then((data) => setMovies(data));
  }, []);

  return (
    <div className="movies-grid">
      {movies.map((movie) => (
        <div className="movie-card" key="movie.id">
          <img src={`images/${movie.image}`} alt={movie.title} />
          <div className="movie-card-info">
            <h3 className="movie-card-title">{movie.title}</h3>
            <h3 className="movie-card-genre">{movie.genre}</h3>
            <h3 className="movie-card-rating">{movie.rating}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}