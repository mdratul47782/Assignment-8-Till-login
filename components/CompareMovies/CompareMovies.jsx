"use client";
import React, { useState, useEffect } from "react";
import MovieSearchModal from "./MovieSearchModal";
import { fetchTrendingMovies } from "@/app/lib/HomePageCalles/trendingMovies";
import { fetchmovieDetails } from "@/app/lib/MovieDetails/movieDetalis";

function CompareMovies() {
  const [movieSlots, setMovieSlots] = useState([{ id: Date.now(), movie: null }]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  const [activeSlotId, setActiveSlotId] = useState(null);

  // Fetch trending movies on initial render
  useEffect(() => {
    const fetchMovies = async () => {
      const fetchedMovies = await fetchTrendingMovies();
      setMovies(fetchedMovies);
    };
    fetchMovies();
  }, []);

  const addMovieSlot = () => {
    setMovieSlots([...movieSlots, { id: Date.now(), movie: null }]);
  };

  const removeMovieSlot = (id) => {
    setMovieSlots(movieSlots.filter((slot) => slot.id !== id));
  };

  const openModal = (slotId) => {
    setActiveSlotId(slotId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectMovie = async (movie) => {
    const movieDetails = await fetchmovieDetails(movie.id);
    setMovieSlots((prevSlots) =>
      prevSlots.map((slot) =>
        slot.id === activeSlotId ? { ...slot, movie: movieDetails } : slot
      )
    );
    closeModal();
  };

  return (
    <>
      <MovieSearchModal
        isOpen={isModalOpen}
        onClose={closeModal}
        movies={movies}
        onSelectMovie={handleSelectMovie}
      />
      <main className="container mx-auto px-4 pt-24 pb-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Compare Movies</h1>
          <button
            onClick={addMovieSlot}
            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors"
          >
            Add Movie +
          </button>
        </div>

        {/* Movie Comparison Container */}
        <div className="grid gap-6 md:grid-cols-2">
          {movieSlots.map((slot) => (
            <div key={slot.id} className="bg-zinc-900 rounded-lg p-4 flex flex-col min-h-[400px]">
              <div className="flex justify-end mb-4">
                {movieSlots.length > 1 && (
                  <button
                    onClick={() => removeMovieSlot(slot.id)}
                    className="text-gray-400 hover:text-white"
                  >
                    ✕
                  </button>
                )}
              </div>
              {slot.movie ? (
                <div className="grid grid-cols-5 gap-8">
                  <div className="col-span-2 h-full">
                    <img
                      src={`https://image.tmdb.org/t/p/original/${slot.movie.poster_path}`}
                      alt={slot.movie.title || slot.movie.name}
                      className="w-full rounded-lg mb-4 object-contain max-h-full"
                    />
                    <h2 className="text-xl font-bold mb-2 text-center">
                      {slot.movie.title || slot.movie.name}
                    </h2>
                  </div>
                  <div className="w-full space-y-4 col-span-3">
                    <div className="bg-zinc-800 p-3 rounded">
                      <span className="text-gray-400">Rating:</span>
                      <span className="float-right">{slot.movie.vote_average}/10</span>
                    </div>
                    <div className="bg-zinc-800 p-3 rounded">
                      <span className="text-gray-400">Release Year:</span>
                      <span className="float-right">
                        {slot.movie.release_date
                          ? new Date(slot.movie.release_date).getFullYear()
                          : "N/A"}
                      </span>
                    </div>
                    <div className="bg-zinc-800 p-3 rounded">
                      <span className="text-gray-400">Runtime:</span>
                      <span className="float-right">{slot.movie.runtime || "N/A"} min</span>
                    </div>
                    <div className="bg-zinc-800 p-3 rounded">
                      <span className="text-gray-400">Budget:</span>
                      <span className="float-right">
                        {slot.movie.budget
                          ? `$${(slot.movie.budget / 1_000_000).toFixed(1)}M`
                          : "N/A"}
                      </span>
                    </div>
                    <div className="bg-zinc-800 p-3 rounded">
                      <span className="text-gray-400">Revenue:</span>
                      <span className="float-right">
                        {slot.movie.revenue
                          ? `$${(slot.movie.revenue / 1_000_000).toFixed(1)}M`
                          : "N/A"}
                      </span>
                    </div>
                    <div className="bg-zinc-800 p-3 rounded">
                      <span className="text-gray-400">Genres:</span>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {slot.movie.genres?.map((genre) => (
                          <span
                            key={genre.id}
                            className="bg-zinc-700 px-2 py-1 rounded-full text-sm"
                          >
                            {genre.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-grow flex flex-col items-center justify-center">
                  <button
                    onClick={() => openModal(slot.id)}
                    className="bg-zinc-800 text-white px-6 py-3 rounded hover:bg-zinc-700 transition-colors cursor-pointer"
                  >
                    Select Movie
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export default CompareMovies;
