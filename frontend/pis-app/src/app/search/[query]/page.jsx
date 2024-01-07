"use client";
import axios from "axios";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Component({ params }) {
    const [data, setData] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        const url = "http://20.229.152.181:9200/production/_search";
        const requestData = {
            query: {
              multi_match: {
                query: params.query,
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
          const movies = response.data.hits.hits.map((hit) => hit._source);
          setData(movies);
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      };
  
      fetchData();
    }, []);

    return (
        <div className="flex flex-col gap-6 p-4 md:p-6">
            <SearchInput />
            <MovieCards movies={data}/>
        </div>
    );
}

function SearchInput() {
    return (
        <div className="flex items-center gap-4">
            <Input className="flex-grow" placeholder="Search for films..." />
            <Button>Search</Button>
        </div>
    )
}

function MovieCards({ movies }) {
    return (
        <>
            {
                movies.map((movie) => {
                    return <MovieCard
                        key={movie.id}
                        id={movie.id}
                        title={movie.title}
                        premiere_date={movie.premiere_date}
                        genre={movie.genre}
                        duration={movie.duration}
                        description={movie.description}
                    />
                })
            }
        </>
    )
}

function MovieCard({
    id,
    title,
    premiere_date,
    genre,
    duration,
    description
}) {
    return (
        <Link href={`/movie-page/${id}`}>
            <Card>
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>Release Date: {premiere_date}</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Genre: {genre}</p>
                    <p>Runtime: {duration} minutes</p>
                    <p>{description}</p>
                </CardContent>
            </Card>
        </Link>
    )
}