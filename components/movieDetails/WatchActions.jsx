"use client";

import { useState, useEffect } from "react";
import AddToWatch from "./AddToWatch";
import AddedToWatch from "./AddedToWatch";

export default function WatchActions({ userId, movieId, movieTitle, ImageSrc }) {
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    const checkWatchList = async () => {
      const response = await fetch(`/api/watchlist/${movieId}`);
      const { isAdded } = await response.json();
      setIsAdded(isAdded);
    };
    checkWatchList();
  }, [movieId]);

  const handleAddToWatchSuccess = () => {
    setIsAdded(true); // Update state when successfully added
  };

  return (
    <div>
      {isAdded ? (
        <AddedToWatch />
      ) : (
        <AddToWatch
          userId={userId}
          movieId={movieId}
          movieTitle={movieTitle}
          ImageSrc={ImageSrc}
          onAddSuccess={handleAddToWatchSuccess}
        />
      )}
    </div>
  );
}
