export async function fetchSimilarMovies(id) {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjllYzkyZTEyOWYxNTcwMWM2MDI4MjBhZWM3MGE3NSIsIm5iZiI6MTczNDQxNjU4OS4yMjEsInN1YiI6IjY3NjExOGNkNTJjY2FjNTdjZmNiZGI5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xU9K_Vje2wcpjX3imJIcgrwr47rObA2EW-ZvL9-Yxh8", // Replace with your actual token
      },
    };
  
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/similar`,
        options
      );
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      const data = await response.json();
      return data.results; // Return only the results array
    } catch (error) {
      console.error("Error fetching similar movies:", error);
      return [];
    }
  }
  