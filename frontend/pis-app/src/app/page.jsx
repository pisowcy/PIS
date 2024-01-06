"use client";
import { Badge } from "@/components/ui/badge";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import Link from "next/link";
import { useFetchMovies, fetchMovieRating } from "./dataprocessing";
import { useState, useEffect } from "react";
import { StarIcon } from "@/components/staricon";
import axios from "axios";

export default function HomePage() {
  const [data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    const url = "http://20.229.152.181:9200/production/_search";
    const requestData = {
      query: {
        multi_match: {
          query: searchTerm,
          type: "phrase_prefix",
          fields: ["description", "title", "country", "genre"],
          slop: 3,
          max_expansions: 10,
        },
      },
    };
    const config = {
      auth: {
        username: "admin",
        password: "admin",
      },
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.post(url, requestData, config);
      setData(response.data.hits.hits);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  return (
    <div
      className="flex flex-col min-h-screen bg-gray-100"
      data-testid="home-page"
    >
      <Navbar />
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>No data</p>}
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
              <div className="mt-4 relative">
                <form onSubmit={handleSearchSubmit} className="flex">
                  <input
                    className="w-full py-2 px-4 rounded-l-md text-black"
                    placeholder="Search for a movie"
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  <button
                    type="submit"
                    className="bg-white hover:bg-blue-500 text-white py-2 px-4 rounded-r-md"
                  >
                    🔎
                  </button>
                </form>
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

function Movie({ id, title, description, rating, poster_url }) {
  console.log(poster_url);
  return (
    <Card>
      <Link href={`/movie-page/${id}`}>
        <CardHeader>
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-black">{title}</h3>
            <div className="flex items-center">
              <StarIcon className="w-4 h-4 inline-block mr-1" />
              <span className="text-lg">{rating}</span>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <img
            alt="Movie poster"
            className="w-full object-cover"
            src={poster_url}
            style={{
              aspectRatio: "27 / 40",
              objectFit: "cover",
            }}
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
