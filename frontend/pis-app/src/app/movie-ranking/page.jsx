"use client";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";

export default function MovieRanking() {
  return (
    <>
    <Navbar />
    <main className="mx-auto px-4 md:px-6 max-w-7xl grid gap-12 flex justify-center">
      <Card className="w-full">
        <CardHeader>
          <h2 className="text-2xl font-bold">Top Movies</h2>
        </CardHeader>
        <CardContent>
          <Ranking />
        </CardContent>
      </Card>
    </main>
    </>
  );
}

function Ranking() {
  const [movies, setMovies] = useState([]);
  const [reviewsAverage, setReviewsAverage] = useState({});

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const responseReviews = await fetch(`http://20.229.152.181/reviews`);
        if (!responseReviews.ok) {
          throw new Error(`HTTP error! Status: ${responseReviews.status}`);
        }
        const reviewsData = await responseReviews.json();

        const mappedReviews = reviewsData.flat();
        const reviewsAverageData = mappedReviews.reduce((acc, review) => {
          const { production, review: reviewValue } = review;

          if (!acc[production]) {
            acc[production] = { total: 0, count: 0 };
          }

          acc[production].total += reviewValue;
          acc[production].count += 1;

          return acc;
        }, {});

        for (const production in reviewsAverageData) {
          const { total, count } = reviewsAverageData[production];
          reviewsAverageData[production] = (total / count).toFixed(2);
        }

        setReviewsAverage(reviewsAverageData);

        const responseMovies = await fetch(`http://20.229.152.181/productions`);
        if (!responseMovies.ok) {
          throw new Error(`HTTP error! Status: ${responseMovies.status}`);
        }
        const moviesData = await responseMovies.json();

        const sortedMovies = moviesData.sort((a, b) => {
          const ratingA = reviewsAverageData[a.id] || 0;
          const ratingB = reviewsAverageData[b.id] || 0;
          return ratingB - ratingA;
        });

        const limitedMovies = sortedMovies.slice(0, 100);
        setMovies(limitedMovies);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      {
        movies.map((movie, index) => {
          var dateString = movie.premiere_date
          var date = new Date(dateString)
          var year = date.getFullYear()
          return <Movie 
            key={movie.id}
            id={movie.id}
            description={movie.description}
            title={movie.title}
            genre={movie.genre}
            year={year}
            review={reviewsAverage[movie.id]}
            number={index+1}
          />
        })
      }
    </div>
  )
}

function Movie(props) {
  const description = props.description
  const title = props.title
  const genre = props.genre
  const year = props.year
  const review = props.review
  const number = props.number
  const id = props.id
  return (
    <Link href={`/movie-page/${id}`}>
      <div className="flex gap-4">
        <div className="font-bold text-2xl">{number}</div>
        <img
          alt="Movie 1 poster"
          className="w-28 h-40 object-cover rounded-md"
          height="200"
          src="/poster-example.jpg"
          style={{
            aspectRatio: "140/200",
            objectFit: "cover",
          }}
          width="140"
        />
        <div className="flex flex-col gap-2 text-sm flex-grow">
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-gray-500 dark:text-gray-400 line-clamp-2">
            {description}
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            Genre: {genre}
          </p>
          <p className="text-gray-500 dark:text-gray-400">Year: {year}</p>
        </div>
        <div className="self-start ml-auto text-lg">
          <StarIcon className="w-4 h-4 inline-block mr-1" />
          {review}
        </div>
      </div>
    </Link>
  );
}


function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
