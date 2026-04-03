import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [favorites, setFavorites] = useState([]);

  // 🔹 Load favorites from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("fav")) || [];
    setFavorites(saved);
  }, []);

  // 🔹 Save favorites
  useEffect(() => {
    localStorage.setItem("fav", JSON.stringify(favorites));
  }, [favorites]);

  // 🔍 Search movies
  const searchMovies = async () => {
    if (!query) return;

    setLoading(true);
    try {
      const res = await fetch(
        "https://movie-backend-xew0.onrender.com/search?query=" + query
      );
      const data = await res.json();

      if (data.Search) {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
    } catch (err) {
      console.error("Error fetching movies:", err);
      setMovies([]);
    }
    setLoading(false);
  };

  // 🎬 Get movie details
  const getMovieDetails = async (id) => {
    try {
      const res = await fetch(
        `https://movie-backend-xew0.onrender.com/movie/${id}`
      );
      const data = await res.json();
      setSelectedMovie(data);
    } catch (err) {
      console.error("Error fetching details:", err);
    }
  };

  // ❤️ Add to favorites
  const addFavorite = (movie) => {
    if (!favorites.find((m) => m.imdbID === movie.imdbID)) {
      setFavorites([...favorites, movie]);
    }
  };

  return (
    <div className="container">
      <h1>🎬 Movie Search App</h1>

      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button onClick={searchMovies}>Search</button>

      {/* ⚡ Loading */}
      {loading && <p>Loading...</p>}

      {/* ❌ No results */}
      {!loading && movies.length === 0 && <p>No movies found</p>}

      {/* 🎬 Movie Grid */}
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
                e.stopPropagation();
                addFavorite(movie);
              }}
            >
              ❤️
            </button>
          </div>
        ))}
      </div>

      {/* 🔍 Movie Details (SAFE rendering) */}
      {selectedMovie && (
        <div style={{ marginTop: "30px" }}>
          <h2>{selectedMovie.Title}</h2>

          {selectedMovie.Poster && (
            <img src={selectedMovie.Poster} width="200" />
          )}

          <p>{selectedMovie.Plot}</p>
          <p>⭐ {selectedMovie.imdbRating}</p>
        </div>
      )}

      {/* ❤️ Favorites */}
      <h2 style={{ marginTop: "40px" }}>❤️ Favorites</h2>
      <div className="grid">
        {favorites.map((movie) => (
          <div key={movie.imdbID} className="card">
            <img src={movie.Poster} alt={movie.Title} />
            <p>{movie.Title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;