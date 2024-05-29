import React, { useState } from "react";
import "../styles.css";
import MovieCard from "./MovieCard";

export default function MoviesGrid({ movies, watchlist, toggleWatchlist }) {
  // const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [genre, setGenre] = useState("All Genres");
  const [rating, setRating] = useState("All");

  // useEffect(() => {
  //   fetch("movies.json")
  //     .then((response) => response.json())
  //     .then((data) => setMovies(data));
  // }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  // search results filter
  const matchesSearchTerm = (movie, searchTerm) => {
    return movie.title.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const handleGenreChange = (e) => {
    setGenre(e.target.value);
  };

  // genres filter
  const matchesGenre = (movie, genre) => {
    return (
      genre === "All Genres" ||
      movie.genre.toLowerCase() === genre.toLowerCase()
    );
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  // ratings filter
  const matchesRating = (movie, rating) => {
    switch (rating) {
      case "All":
        return true;
      case "Good":
        return movie.rating >= 7.5;
      case "Ok":
        return movie.rating >= 5 && movie.rating < 7.5;
      case "Bad":
        return movie.rating < 5;
      default:
        return false;
    }
  };

  // combined filtering
  const filterMovieResults = movies.filter(
    (movie) =>
      matchesRating(movie, rating) &&
      matchesGenre(movie, genre) &&
      matchesSearchTerm(movie, searchTerm)
  );

  return (
    <div>
      <input
        type="text"
        className="search-input"
        placeholder="Search Movies..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className="filter-bar">
        <div className="filter-slot">
          <label>Genre</label>
          <select
            className="filter-dropdown"
            value={genre}
            onChange={handleGenreChange}
          >
            <option>All Genres</option>
            <option>Action</option>
            <option>Drama</option>
            <option>Fantasy</option>
            <option>Horror</option>
          </select>
        </div>
        <div className="filter-slot">
          <label>Rating</label>
          <select
            className="filter-dropdown"
            value={rating}
            onChange={handleRatingChange}
          >
            <option>All</option>
            <option>Good</option>
            <option>Ok</option>
            <option>Bad</option>
          </select>
        </div>
      </div>
      <div className="movies-grid">
        {filterMovieResults.map((movie) => (
          // movies.map((movie) => ( // without searched data
          <MovieCard
            movie={movie}
            isWatchlisted={watchlist.includes(movie.id)}
            toggleWatchlist={toggleWatchlist}
            key={movie.id}
          />
        ))}
      </div>
    </div>
  );
}
