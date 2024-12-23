export async function fetchTrendingMovies() {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjllYzkyZTEyOWYxNTcwMWM2MDI4MjBhZWM3MGE3NSIsIm5iZiI6MTczNDQxNjU4OS4yMjEsInN1YiI6IjY3NjExOGNkNTJjY2FjNTdjZmNiZGI5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xU9K_Vje2wcpjX3imJIcgrwr47rObA2EW-ZvL9-Yxh8",
      },
    };
  
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/trending/all/day?language=en-US",
        options
      );
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error("Error fetching trending movies:", error);
      return []; // Return an empty array on error
    }
  }
  