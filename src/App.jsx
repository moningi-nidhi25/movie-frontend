import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  // 🔹 Load favorites
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

      console.log(data); // debug

      if (data && data.Response !== "False") {
        setSelectedMovie(data);
      } else {
        alert("Movie details not found");
      }
    } catch (err) {
      console.error("Error fetching details:", err);
    }
  };

  // ❤️ Toggle favorite
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

      {/* 🔀 Navigation */}
      <div style={{ marginBottom: "15px" }}>
        <button onClick={() => setShowFavorites(false)}>🔍 Search</button>
        <button
          onClick={() => setShowFavorites(true)}
          style={{ marginLeft: "10px" }}
        >
          ❤️ Favorites
        </button>
      </div>

      {/* 🔍 Search */}
      {!showFavorites && (
        <>
          <input
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <button onClick={searchMovies}>Search</button>
        </>
      )}

      {/* ⚡ Loading */}
      {loading && <p>Loading...</p>}

      {/* ❌ No results */}
      {!loading && !showFavorites && movies.length === 0 && (
        <p>No movies found</p>
      )}

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
                movie.Poster && movie.Poster !== "N/A"
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
                background: favorites.find(
                  (m) => m.imdbID === movie.imdbID
                )
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

      {/* 🎬 MODAL (Movie Details) */}
      {selectedMovie && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={() => setSelectedMovie(null)}
        >
          <div
            style={{
              background: "#1e293b",
              padding: "20px",
              borderRadius: "10px",
              maxWidth: "400px",
              textAlign: "center",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>
              {selectedMovie.Title} ({selectedMovie.Year})
            </h2>

            <img
              src={
                selectedMovie.Poster && selectedMovie.Poster !== "N/A"
                  ? selectedMovie.Poster
                  : "https://via.placeholder.com/200x300"
              }
              width="200"
            />

            <p>
              {selectedMovie.Plot && selectedMovie.Plot !== "N/A"
                ? selectedMovie.Plot
                : "No description available"}
            </p>

            <p>⭐ {selectedMovie.imdbRating || "N/A"}</p>

            <button onClick={() => setSelectedMovie(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;