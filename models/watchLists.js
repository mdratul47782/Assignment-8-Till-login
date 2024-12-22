import mongoose from "mongoose";

// Clear existing model if it exists
delete mongoose.models.WatchList;

const WatchListSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  movieId: { type: String, required: true },
});

export default mongoose.model("WatchList", WatchListSchema);
