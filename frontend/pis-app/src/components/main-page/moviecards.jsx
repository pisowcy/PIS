"use client";
import { useFetchMovies, fetchMovieRating } from "@/app/dataprocessing";
import { useState, useEffect } from "react";
import { Movie } from "./movie";

export function MovieCards() {
    const movies = useFetchMovies();
    const [ratings, setRatings] = useState({});
  
    useEffect(() => {
      const fetchRatings = async () => {
        const ratingsData = {};
        for (const movie of movies) {
          const rating = await fetchMovieRating(movie.id);
          ratingsData[movie.id] = Number(rating).toFixed(2);
        }
        setRatings(ratingsData);
      };
  
      if (movies.length) {
        fetchRatings();
      }
    }, [movies]);
  
    return (
      <section className="px-6 py-12">
        <h2 className="text-2xl font-bold text-black mb-6">Explore Movies</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <Movie
              key={movie.id}
              id={movie.id}
              title={movie.title}
              description={movie.description}
              rating={ratings[movie.id]}
              poster_url={movie.poster_url}
            />
          ))}
        </div>
      </section>
    );
  }