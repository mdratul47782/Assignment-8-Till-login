import React from "react";
import Image from "next/image";
import { fetchSimilarMovies } from "@/app/lib/MovieDetails/similarMovies";

async function SimilarMovies({ id }) {
  const similarMovies = await fetchSimilarMovies(id);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">More Like This</h2>
      {similarMovies.length > 0 ? (
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {similarMovies.map((movie) => (
            <div
              key={movie.id}
              className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform"
            >
              <a href={`/Details/${movie.id}`}>
                <Image
                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  alt={movie.title}
                  width={500} // Set desired width
                  height={750} // Set desired height
                  className="w-full rounded-lg object-cover" // Keep your custom styles
                  priority // Optional: Prioritize this image for faster loading
                  placeholder="blur" // Optional: Add a blur placeholder for better UX
                  blurDataURL="/placeholder.jpg" // Replace with your own placeholder image
                />
              </a>
              <p className="text-sm text-center mt-2 text-white">
                {movie.title}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No similar movies found.</p>
      )}
    </div>
  );
}

export default SimilarMovies;
