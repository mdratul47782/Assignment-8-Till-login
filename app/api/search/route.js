import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  const API_URL = "https://api.themoviedb.org/3/trending/all/day?language=en-US";
  const API_KEY =
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjllYzkyZTEyOWYxNTcwMWM2MDI4MjBhZWM3MGE3NSIsIm5iZiI6MTczNDQxNjU4OS4yMjEsInN1YiI6IjY3NjExOGNkNTJjY2FjNTdjZmNiZGI5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xU9K_Vje2wcpjX3imJIcgrwr47rObA2EW-ZvL9-Yxh8";

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: API_KEY,
    },
  };

  try {
    const response = await fetch(API_URL, options);
    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    const data = await response.json();
    const filteredResults = query
      ? data.results.filter((movie) =>
          (movie.title || movie.name)
            .toLowerCase()
            .includes(query.toLowerCase())
        )
      : data.results;

    return NextResponse.json({ results: filteredResults });
  } catch (error) {
    console.error("Error fetching movies:", error);
    return NextResponse.json({ results: [] }, { status: 500 });
  }
}
