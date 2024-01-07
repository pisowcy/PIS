"use client";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import { LoadingAnimation } from "@/components/loadinganimation";
import { Movie } from "@/components/movie-page/movie";

export default function Page({ params }) {
  const [movie, setMovie] = useState({});
  const [actors, setActors] = useState([]);
  const [reviewAverage, setReviewAverage] = useState(0);
  const [reviewNumber, setReviewNumber] = useState(0);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const responseReviews = await fetch(
          `http://20.229.152.181/reviewsByProduction/${params.movieId}`
        );
        if (!responseReviews.ok) {
          throw new Error(`HTTP error! Status: ${responseReviews.status}`);
        }
        const reviewsData = await responseReviews.json();

        const getUserName = async (id) => {
          let username;
          let userData;
          const responseUser = await fetch(`http://20.229.152.181/users/${id}`);
          if (!responseUser.ok) {
            throw new Error(`HTTP error! Status: ${responseUser.status}`);
          }
          userData = await responseUser.json();
          username = userData.username;
          return username;
        };

        const reviewsText = reviewsData.map((review) => {
          return {
            comment: review.comment,
            review: review.review,
            username: getUserName(review.user),
          };
        });

        const responseStats = await fetch(
          `http://20.229.152.181/reviewsByProductionStats/${params.movieId}`
        );
        if (!responseStats.ok) {
          throw new Error(`HTTP error! Status: ${responseStats.status}`);
        }
        const statsData = await responseStats.json();

        const responseActors = await fetch(
          `http://20.229.152.181/actorsByProduction/${params.movieId}`
        );
        if (!responseActors.ok) {
          throw new Error(`HTTP error! Status: ${responseReviews.status}`);
        }
        const actorsData = await responseActors.json();

        const actorsObject = actorsData.map((actor) => {
          return {
            name: actor.name,
            surname: actor.surname,
            id: actor.id,
          };
        });

        const responseMovie = await fetch(
          `http://20.229.152.181/productions/${params.movieId}`
        );
        if (!responseMovie.ok) {
          throw new Error(`HTTP error! Status: ${responseMovie.status}`);
        }
        const movieData = await responseMovie.json();

        setActors(actorsObject);
        setComments(reviewsText);
        setReviewAverage(statsData.average_score);
        setReviewNumber(statsData.review_count);
        setMovie(movieData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoadingError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <main>
      <Navbar />
      {loadingError ? (
        alert(
          `There is a problem with Your internet connection\nCheck it and try again`
        )
      ) : isLoading ? (
        <LoadingAnimation />
      ) : (
        <Movie
          title={movie.title}
          description={movie.description}
          release_date={movie.premiere_date}
          country={movie.country}
          genre={movie.genre}
          duration={movie.duration}
          reviewNumber={reviewNumber}
          reviewAverage={reviewAverage}
          actors={actors}
          movieId={params.movieId}
          comments={comments}
          poster_url={movie.poster_url}
          trailer_url={movie.trailer_url}
        />
      )}
    </main>
  );
}
