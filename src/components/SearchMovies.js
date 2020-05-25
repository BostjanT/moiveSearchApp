import React, { useState } from "react";
import MovieCard from "./MovieCard";

function SearchMovies() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const searchMovies = async (e) => {
    e.preventDefault();
    console.log("Submitting");

    /* const query = "Star Wars"; */

    const url = `https://api.themoviedb.org/3/search/movie?api_key=314db76054ff02920d775a588c70228a&language=en-US&query=${query}&page=1&include_adult=false`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      /* console.log(data); */
      setMovies(data.results);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <form className="form" onSubmit={searchMovies}>
        <label htmlFor="query" className="label">
          Movie Name
        </label>
        <input
          className="input"
          type="text"
          name="query"
          value={query}
          placeholder="Enter your movie here"
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="button" type="submit">
          SEARCH
        </button>
      </form>

      <div className="card-list">
        {movies
          .filter((movie) => movie.poster_path)
          .map((movie) => (
            <MovieCard movie={movie} />
          ))}
      </div>
    </>
  );
}

export default SearchMovies;
