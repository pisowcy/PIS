"use client";
import { useEffect, useState } from "react"
import React from "react";
import { Badge } from "@/components/ui/badge";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import { Rating } from "@mui/material";


export default function ProductDetails({ params }) {
    const [movie, setMovie] = useState({});
    const [actors, setActors] = useState([]);
    const [reviewAverage, setReviewAverage] = useState(0);
    const [reviewNumber, setReviewNumber] = useState(0);

    useEffect(() => {
        const fetchMovies = async () => {
          try {
            const responseReviews = await fetch(`http://20.229.152.181/reviews`);
            if (!responseReviews.ok) {
              throw new Error(`HTTP error! Status: ${responseReviews.status}`);
            }
            const reviewsData = await responseReviews.json();
            const filteredReviews = reviewsData.filter((review) => {
                return review.production == params.movieId
            })

            const totalReviews = filteredReviews.length
            const totalRating = filteredReviews.reduce((sum, review) => sum + review.review, 0);

            const averageRating = (totalRating / totalReviews).toFixed(2)

            const responseMovie = await fetch(`http://20.229.152.181/productions/${params.movieId}`);
            if (!responseMovie.ok) {
              throw new Error(`HTTP error! Status: ${responseMovie.status}`);
            }
            const movieData = await responseMovie.json();
            
            setReviewAverage(averageRating);
            setReviewNumber(totalReviews);
            setMovie(movieData);
    
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchMovies();
      }, []);

    console.log(movie)
    return (
        <Movie
            title={movie.title}
            description={movie.description}
            release_date={movie.premiere_date}
            country={movie.country}
            genre={movie.genre}
            duration={movie.duration}
            reviewNumber={reviewNumber}
            reviewAverage={reviewAverage}
        />
    )
}

function Movie(props) {
    const title = props.title
    const description = props.description
    const release_date = props.release_date
    const country = props.country
    const genre = props.genre
    const duration = props.duration
    const reviewNumber = props.reviewNumber
    const reviewAverage = props.reviewAverage

    const [rating, setRating] = React.useState(0);

    return (
        <main className="container mx-auto">
            <Navbar />
            <Card className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden md:flex dark:bg-gray-800">
            <div className="md:flex">
                <div className="md:flex-shrink-0 ml-6 mt-6">
                <img
                    alt="Movie 3 poster"
                    className="w-56 h-80 object-cover rounded-md"
                    height="600"
                    src="/poster-example.jpg"
                    style={{
                    aspectRatio: "140/200",
                    objectFit: "cover",
                    }}
                    width="420"
                />
                <div className="mt-2 flex items-center">
                    <p className="text-base leading-6 text-gray-500 dark:text-gray-300">
                    Average Rating: {reviewAverage}
                    </p>
                    <StarIcon className="w-4 h-4 ml-2 dark:text-white" />
                </div>
                <div className="mt-2 mb-2 flex items-center">
                    <p className="text-base leading-6 text-gray-500 dark:text-gray-300">
                    Number of Ratings: {reviewNumber}
                    </p>
                </div>
                <Rating
                    name="simple-controlled"
                    value={rating}
                    size="large"
                    onChange={(event, newValue) => {
                    setRating(newValue);
                    }}
                />
                </div>
                <div>
                <CardHeader>
                    <Badge className="inline-flex items-center px-3 py-0.5 mt-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {}
                    </Badge>

                    <h2 className="mt-2 text-2xl leading-7 font-bold text-gray-900 dark:text-white">
                    {title}
                    </h2>
                    <p className="mt-3 text-base leading-6 text-gray-500 dark:text-gray-300">
                    Release Date: {release_date} | Country: {country} | Duration: {duration} min
                    </p>
                </CardHeader>
                <CardContent>
                    <p className="mt-3 text-base leading-6 text-gray-500 dark:text-gray-300">
                    {description}
                    </p>
                    <div className="mt-10">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                        Director and Cast
                    </h3>
                    <div className="mt-2 dark:text-white">
                        <ul>
                        <li>Director: John Doe</li>
                        <li>Actor 1 as Character 1</li>
                        <li>Actor 2 as Character 2</li>
                        <li>Actor 3 as Character 3</li>
                        </ul>
                    </div>
                    </div>
                </CardContent>
                </div>
            </div>
            </Card>
        </main>
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
