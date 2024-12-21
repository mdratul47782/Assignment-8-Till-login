import Image from "next/image";
import { fetchtopRattedMovies } from "@/app/lib/HomePageCalles/topRattedMovies";
import Link from "next/link";

export default async function PopularMovies() {
  // Fetch popular movies on the server side
  const movies = await fetchtopRattedMovies();

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Top Rated</h2>
      <div id="popularMovies" className="flex space-x-4 overflow-x-auto pb-4">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform"
          >
            <Link href={`Details/${movie.id}`}>
              <Image
                width={192}
                height={288}
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // Use `w500` for optimized image size
                alt={movie.title || "Movie Poster"}
                className="w-full rounded-lg"
                placeholder="blur" // Adds blur effect while loading
                blurDataURL={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} // Use smaller image as blur
              />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
