"use client";

import React, { useState, useEffect } from "react";

function MovieSearchModal({ isOpen, onClose, onSelectMovie }) {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchTrendingMovies();
    }
  }, [isOpen]);

  const fetchTrendingMovies = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/search");
      if (!response.ok) throw new Error("Failed to fetch movies");

      const data = await response.json();
      setMovies(data.results || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredMovies = movies.filter((movie) =>
    (movie.title || movie.name).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectMovie = (movie) => {
    onSelectMovie(movie); //  the selected movie to the parent
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-zinc-900 p-6 rounded-lg w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Search Movie</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            ✕
          </button>
        </div>

        <input
          type="text"
          placeholder="Type movie name..."
          className="w-full bg-zinc-800 text-white px-4 py-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-red-600"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="max-h-96 overflow-y-auto">
          {isLoading ? (
            <p className="text-gray-400">Loading...</p>
          ) : filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <div
                key={movie.id}
                onClick={() => handleSelectMovie(movie)}
                className="flex items-center gap-4 p-2 hover:bg-zinc-800 cursor-pointer rounded"
              >
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
                      : "https://via.placeholder.com/64x96?text=No+Image"
                  }
                  alt={movie.title || movie.name}
                  className="w-16 h-24 object-cover rounded"
                />
                <div>
                  <h3 className="font-bold text-white">{movie.title || movie.name}</h3>
                  <p className="text-sm text-gray-400">
                    {movie.release_date
                      ? new Date(movie.release_date).getFullYear()
                      : "N/A"}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No movies found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieSearchModal;
