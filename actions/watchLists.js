import connectMongo from "@/dbConnect/connectMongo";
import WatchList from "@/models/watchLists";

export const getWatchLists = async () => {
  try {
    await connectMongo();

    // Fetch watchlist items from the database
    const watchLists = await WatchList.find();
    return watchLists;
  } catch (err) {
    console.error("Error fetching watchlists:", err);
    return [];
  }
};
