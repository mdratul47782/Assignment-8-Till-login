import HeroSection from "@/components/HeroSection";
import PopularMovies from "@/components/PopularMovies";
import TopRatedMovies from "@/components/TopRatedMovies";
import TrendingMovies from "@/components/TrendingMovies";

export default function Home({ params: { id } }) {
  
  return (
    <div>
      <HeroSection id={id} />
      {/* <!-- Movie Sections --> */}
      <div className="container mx-auto px-4 py-8">
        {/* <!-- Trending Movies --> */}
        <TrendingMovies id={id}/>
        {/* <!-- Popular Movies --> */}
        <PopularMovies id={id}/>
        {/* <!-- Top Rated Movies --> */}
        <TopRatedMovies id={id}/>
      </div>
    </div>
  );
}
