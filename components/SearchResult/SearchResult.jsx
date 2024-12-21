"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

function SearchResult() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      fetchMovies(query);
    }
  }, [query]);

  const fetchMovies = async (query) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/search?query=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      setMovies(data.results || []);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-4 pt-24 pb-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          Search Results for `{query || "No query provided"}`
        </h1>
        <p className="text-gray-400">
          {loading ? "Loading..." : `${movies.length} results found`}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <Link
            key={movie.id}
            href={`/Details/${movie.id}`}
            className="bg-zinc-900 rounded-lg overflow-hidden hover:scale-105 transition-transform"
          >
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title || movie.name}
              width={300}
              height={450}
              className="rounded-lg object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold mb-2">{movie.title || movie.name}</h3>
              <div className="flex justify-between text-sm text-gray-400">
                <span>
                  {movie.release_date?.slice(0, 4) ||
                    movie.first_air_date?.slice(0, 4)}
                </span>
                <span>⭐ {movie.vote_average}</span>
              </div>
            </div>
          </Link>
        ))}
        {movies.length === 0 && !loading && (
          <p className="text-gray-400">No movies found.</p>
        )}
      </div>
    </main>
  );
}

export default SearchResult;
