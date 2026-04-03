import { useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const searchMovies = async () => {
  try {
    const res = await fetch(
      `https://movie-backend-xew0.onrender.com/search?query=${query}`
    );
    const data = await res.json();

    console.log(data); // 👈 ADD THIS

    if (data.Search) {
      setMovies(data.Search);
    } else {
      setMovies([]);
    }
  } catch (err) {
    console.error(err);
  }
};
  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>🎬 Movie Search App</h1>

      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button onClick={searchMovies}>Search</button>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "20px" }}>
        {movies.map((movie) => (
          <div key={movie.imdbID} style={{ width: "200px" }}>
            <img src={movie.Poster} alt={movie.Title} width="100%" />
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;