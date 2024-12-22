import MovieDetails from "@/components/movieDetails/MovieDetails";
import React from "react";

function DetailsPage({ params, searchParams }) {
  const { id } = params; // Extract the movie ID from params
  const { userId } = searchParams; // Extract the user ID from searchParams

  // console.log("User ID:", userId, "Movie ID:", id);

  return (
    <div>
      <MovieDetails id={id} userId={userId} />
    </div>
  );
}

export default DetailsPage;
