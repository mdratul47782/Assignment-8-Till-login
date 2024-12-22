import mongoose from "mongoose";

const WatchListSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  movieId: {
    type: String,
    required: true,
  },
  ImageSrc: {
    type: String,
    required: true,
  },
  movieTitle: {
    type: String,
    required: true,
  },
});

// Use existing model if available, or define a new one
const WatchList = mongoose.models.WatchList || mongoose.model("WatchList", WatchListSchema);

export default WatchList;
