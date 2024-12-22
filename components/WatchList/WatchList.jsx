import Image from "next/image";
import { getWatchLists } from "@/actions/watchLists";

async function WatchList({id}) {

  const watchLists = await getWatchLists(); // Fetch the watchlist data
console.log(id)
  return (
    <div className="container mx-auto pt-24 pb-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-white">Your Watchlist</h1>
        <p className="text-light/70 mt-2">
          Movies you&apos;ve saved to watch in the future
        </p>
      </header>

      <div
        id="watchLaterList"
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {watchLists.length > 0 ? (
          watchLists.map((item) => (
            <div
              key={item._id}
              className="bg-moviedb-black rounded-lg overflow-hidden shadow-lg group relative"
            >
              <Image
                src={item.ImageSrc}
                alt={item.movieTitle}
                width={300}
                height={450}
                className="rounded-lg object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <h2 className="text-xl font-bold text-light mb-2">
                  {item.movieTitle}
                </h2>
                <div className="flex justify-between items-center">
                  <span className="text-primary">2010</span>
                  <button className="bg-moviedb-red text-light px-3 py-1 rounded-full hover:bg-moviedb-red/80 transition">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-light">Your watchlist is empty.</p>
        )}
      </div>
    </div>
  );
}

export default WatchList;
