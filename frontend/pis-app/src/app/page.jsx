"use client";
import { Badge } from "@/components/ui/badge";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import Link from "next/link";
import { useFetchMovies, fetchMovieRating } from "./dataprocessing";
import { useState, useEffect } from "react";

export default function HomePage() {
  return (
    <div
      className="flex flex-col min-h-screen bg-gray-100"
      data-testid="home-page"
    >
      <Navbar />
      <main className="flex-1">
        <section className="relative w-full h-96">
          <img
            alt="Cinematic background"
            className="object-cover h-full w-full"
            height="768"
            src="https://wallpaperaccess.com/full/229832.jpg"
            style={{
              aspectRatio: "1366/768",
              objectFit: "cover",
            }}
            width="1366"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black/40 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white">
                Cinemania - all your movies in one place
              </h1>
              <p className="text-lg text-white mt-2">
                Explore and rate your favourite productions
              </p>
              <div className="mt-4">
                <input
                  className="w-64 py-2 px-4 rounded-md text-black"
                  placeholder="Search for a movie"
                  type="text"
                />
              </div>
            </div>
          </div>
        </section>
        <MovieCards />
      </main>
      <footer className="py-4 px-6 bg-white shadow-t">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            © Cinemania. Projekt na przedmiot PIS.
          </p>
          <nav className="flex gap-4"></nav>
        </div>
      </footer>
    </div>
  );
}

function Movie({ id, title, description, rating }) {
  return (
    <Card>
      <Link href={`/movie-page/${id}`}>
        <CardHeader>
          <h3 className="text-lg font-bold text-black">{title}</h3>
          <Badge className="text-black">{rating}</Badge>
        </CardHeader>
        <CardContent>
          <img
            alt="Movie poster"
            className="w-full h-64 object-cover"
            height="200"
            src="https://pisstorage2.blob.core.windows.net/static/poster_example.jpg"
            style={{
              aspectRatio: "200/200",
              objectFit: "cover",
            }}
            width="200"
          />
          <p className="mt-4 text-black">{description}</p>
        </CardContent>
      </Link>
    </Card>
  );
}

function MovieCards() {
  const movies = useFetchMovies();
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    const fetchRatings = async () => {
      const ratingsData = {};
      for (const movie of movies) {
        ratingsData[movie.id] = await fetchMovieRating(1); //should be movie.id
      }
      setRatings(ratingsData);
    };

    if (movies.length) {
      fetchRatings();
    }
  }, [movies]);

  return (
    <section className="px-6 py-12">
      <h2 className="text-2xl font-bold text-black mb-6">Trending Movies</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <Movie
            key={movie.id}
            id={movie.id}
            title={movie.title}
            description={movie.description}
            rating={ratings[movie.id]} // Use the fetched rating here
          />
        ))}
      </div>
    </section>
  );
}
