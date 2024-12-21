import Image from "next/image";
import Link from "next/link";
import { fetchTrendingMovies } from "@/app/lib/HomePageCalles/trendingMovies";

export default async function TrendingMovies() {
  // Fetch movies on the server side
  const movies = await fetchTrendingMovies();

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Trending Now</h2>
      <div id="trendingMovies" className="flex space-x-4 overflow-x-auto pb-4">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform"
          >
            <Link href={`Details/${movie.id}`}>
              <div className="relative w-full h-64">
                <Image
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  alt={movie.title || movie.name}
                  className="rounded-lg object-cover"
                  fill
                  priority
                />
              </div>
              <div className="mt-2">
                <h3 className="text-light text-sm font-bold truncate">
                  {movie.title || movie.name}
                </h3>
                <p className="text-primary text-xs">
                  {movie.release_date
                    ? new Date(movie.release_date).getFullYear()
                    : "N/A"}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
