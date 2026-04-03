import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

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
  const toggleFavorite = (movie) => {
  const exists = favorites.find((m) => m.imdbID === movie.imdbID);

    if (exists) {
      setFavorites(favorites.filter((m) => m.imdbID !== movie.imdbID));
    } else {
      setFavorites([...favorites, movie]);
    }
  };

  return (
    <div className="container">
      <h1>🎬 Movie Search App</h1>
      <div style={{ marginBottom: "15px" }}>
        <button onClick={() => setShowFavorites(false)}>🔍 Search</button>
        <button onClick={() => setShowFavorites(true)} style={{ marginLeft: "10px" }}>
          ❤️ Favorites
        </button>
      </div>
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
        {(showFavorites ? favorites : movies).map((movie) => (
          <div
            key={movie.imdbID}
            className="card"
            onClick={() => getMovieDetails(movie.imdbID)}
          >
            <img
              src={
                movie.Poster !== "N/A"
                  ? movie.Poster
                  : "https://via.placeholder.com/200x300"
              }
              alt={movie.Title}
            />

            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>

            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(movie);
              }}
              style={{
                background: favorites.find((m) => m.imdbID === movie.imdbID)
                  ? "red"
                  : "#444",
                color: "white",
                marginTop: "5px",
              }}
            >
              {favorites.find((m) => m.imdbID === movie.imdbID)
                ? "❤️ Added"
                : "🤍 Add"}
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
    </div>
  );
}

export default App;