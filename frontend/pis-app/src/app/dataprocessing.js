import { useState, useEffect } from "react";

export function useFetchMovies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const ids = generateUniqueRandomIds(6, 10, 4);
      const moviesData = [];

      for (let id of ids) {
        try {
          const response = await fetch(
            `http://20.229.152.181/productions/${id}`
          );
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          moviesData.push(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
      setMovies(moviesData);
    };

    fetchMovies();
  }, []);

  function generateUniqueRandomIds(min, max, num) {
    let ids = [];
    while (ids.length < num) {
      let id = Math.floor(Math.random() * (max - min + 1) + min);
      if (ids.indexOf(id) === -1) ids.push(id);
    }
    return ids;
  }

  return movies;
}

export async function fetchMovieRating(movieId) {
  try {
    const response = await fetch(`http://20.229.152.181/reviewsByProductionStats/${movieId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return Number(data.average_score);
  } catch (error) {
    console.error("Error fetching movie rating:", error);
  }
}
