import connectMongo from "@/dbConnect/connectMongo";
import mongoose from "mongoose";

// Define WatchList Schema
const WatchListSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  movieId: { type: String, required: true },
});

// Create or Use Existing Model
const WatchList = mongoose.models.WatchList || mongoose.model("WatchList", WatchListSchema);

export default async function handler(req, res) {
  console.log("Request Body:", req.body);

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { userId, movieId } = req.body;

  // Validate input
  if (!userId || !movieId) {
    console.error("Missing required fields: userId or movieId");
    return res.status(400).json({ message: "Missing required fields." });
  }

  try {
    // Connect to MongoDB
    await connectMongo();
    console.log("MongoDB connection established successfully");

    // Save data to WatchList collection
    const watchListItem = new WatchList({ userId, movieId });
    const savedItem = await watchListItem.save();

    console.log("Saved WatchList Item:", savedItem);

    return res.status(201).json({ message: "Movie added to watch list successfully.", data: savedItem });
  } catch (error) {
    console.error("Error saving watch list item:", error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
}
