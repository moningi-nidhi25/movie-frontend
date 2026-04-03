import { useState } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const searchMovies = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://movie-backend-xew0.onrender.com/search?query=" + query
      );
      const data = await res.json();

      console.log(data);

      if (data.Search) {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="grid">
      {movies.map((movie) => (
        <div
          key={movie.imdbID}
          className="card"
          onClick={() => getMovieDetails(movie.imdbID)}
        >
          <img
            src={
              movie.Poster !== "N/A"
                ? movie.Poster
                : "https://via.placeholder.com/200x300?text=No+Image"
            }
            alt={movie.Title}
          />

          <h3>{movie.Title}</h3>
          <p>{movie.Year}</p>

          <button
            onClick={(e) => {
              e.stopPropagation(); // prevents card click
              addFavorite(movie);
            }}
          >
            ❤️
          </button>
        </div>
      ))}
    </div>
  );
}

const getMovieDetails = async (id) => {
  try {
    const res = await fetch(
      `https://movie-backend-xew0.onrender.com/movie/${id}`
    );
    const data = await res.json();
    setSelectedMovie(data);
  } catch (err) {
    console.error(err);
  }
};

const addFavorite = (movie) => {
  setFavorites([...favorites, movie]);
};

export default App;