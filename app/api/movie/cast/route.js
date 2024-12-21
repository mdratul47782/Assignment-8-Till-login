import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const movieId = searchParams.get("id"); // Get movie ID from query params

  if (!movieId) {
    return NextResponse.json({ error: "Movie ID is required" }, { status: 400 });
  }

  const API_URL = `https://api.themoviedb.org/3/movie/${movieId}/credits`;
  const API_KEY =  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjllYzkyZTEyOWYxNTcwMWM2MDI4MjBhZWM3MGE3NSIsIm5iZiI6MTczNDQxNjU4OS4yMjEsInN1YiI6IjY3NjExOGNkNTJjY2FjNTdjZmNiZGI5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xU9K_Vje2wcpjX3imJIcgrwr47rObA2EW-ZvL9-Yxh8"
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch cast details");
    }

    const data = await response.json();
    return NextResponse.json(data.cast, { status: 200 });
  } catch (error) {
    console.error(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
