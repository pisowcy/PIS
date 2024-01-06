"use client";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import { Rating } from "@mui/material";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { StarIcon } from "@/components/icons";

export default function ProductionDetails({ params }) {
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

  console.log(movie);
  return (
      <main>
      <Navbar />
      {loadingError ? (
        alert(`There is a problem with Your internet connection\nCheck it and try again`)
      ) : (
        isLoading ? (
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
          />
        )
      )}
    </main>
  );
}

function Movie(props) {
  const title = props.title;
  const description = props.description;
  const release_date = props.release_date;
  const country = props.country;
  const genre = props.genre;
  const duration = props.duration;
  const reviewNumber = props.reviewNumber;
  const reviewAverage = props.reviewAverage;
  const actors = props.actors;
  const movieId = props.movieId;
  const comments = props.comments;

  return (
    <div className="container mx-auto">
      <Card className="max-w-4xl mx-auto mt-4 bg-white rounded-xl shadow-md overflow-hidden md:flex dark:bg-gray-800">
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
                Average Rating: {reviewAverage.toFixed(2)}
              </p>
              <StarIcon className="w-4 h-4 ml-2 dark:text-white" />
            </div>
            <div className="mt-2 mb-2 flex items-center">
              <p className="text-base leading-6 text-gray-500 dark:text-gray-300">
                Number of Ratings: {reviewNumber}
              </p>
            </div>
          </div>
          <div>
            <CardHeader>
              <Badge className="inline-block items-center px-3 py-0.5 mt-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {genre}
              </Badge>

              <h2 className="mt-2 text-2xl leading-7 font-bold text-gray-900 dark:text-white">
                {title}
              </h2>
              <p className="mt-3 text-base leading-6 text-gray-500 dark:text-gray-300">
                Release Date: {release_date} | Country: {country} | Duration:{" "}
                {duration} min
              </p>
            </CardHeader>
            <CardContent>
              <p className="mt-3 text-base leading-6 text-gray-500 dark:text-gray-300">
                {description}
              </p>
              <div className="mt-10">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  Cast
                </h3>
                <div className="mt-2 dark:text-white">
                  <ul>
                    {actors.map((actor) => {
                      return (
                        <li key={actor.id}>
                          {actor.name} {actor.surname}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </CardContent>
          </div>
        </div>
      </Card>
      <ReviewForm movieId={movieId} />
      <ReviewList reviews={comments} />
    </div>
  );
}

function ReviewForm({ movieId }) {
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(0);

  const handleReviewChange = (event) => {
    console.log("change:", event.target.value);
    setNewReview(event.target.value);
  };

  const handleReviewSubmit = async (event) => {
    event.preventDefault();
    console.log("New review:", newReview);

    try {
      const response = await fetch("http://20.229.152.181/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          review: rating,
          comment: newReview,
          user: 1,
          production: movieId,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      alert("Your review has been successfully added!");
      window.location.reload();
    } catch (error) {
      console.error("Error posting review:", error);
    }
  };

  return (
    <div className="mt-6 mx-auto w-2/3">
      <h3 className="text-lg font-semibold mb-2">Write a review:</h3>
      <Rating
        name="simple-controlled"
        value={rating}
        size="large"
        onChange={(event, newValue) => {
          setRating(newValue);
        }}
      />
      <form className="flex flex-col space-y-4" onSubmit={handleReviewSubmit}>
        <Textarea
          placeholder="Type your review here."
          onChange={handleReviewChange}
        />
        <Button
          className="w-1/2 py-2 text-white bg-blue-500 hover:bg-blue-700 rounded mx-auto"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

function ReviewList({ reviews }) {
  return (
    <div className="mt-6 mx-auto w-2/3">
      <h3 className="text-lg font-semibold mb-4">Reviews</h3>
      <div className="space-y-4">
        {reviews.map((review) => {
          return (
            <ReviewItem
              key={review.username}
              username={review.username}
              comment={review.comment}
              review={review.review}
            />
          );
        })}
      </div>
    </div>
  );
}

function ReviewItem({ username, comment, review }) {
  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <div className="flex items-center space-x-2 mb-2">
        <Avatar>
          {/* <AvatarImage
            alt="User profile"
            src="/placeholder.svg?height=40&width=40"
          /> */}
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold">{username}</p>
          <p className="text-xs text-gray-600">
            {review} {review === 1 ? "star" : "stars"}
          </p>
        </div>
      </div>
      <p>{comment}</p>
    </div>
  );
}

function LoadingAnimation() {
  const [dots, setDots] = useState(1);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDots((prevDots) => (prevDots === 3 ? 1 : prevDots + 1));
    }, 300);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      alert("There seems to be a connection with backend problem.\nTry again later");
    }, 10000);

    return () => clearTimeout(timeoutId);
  }, []);

  return <p>Loading{Array(dots).fill('.').join('')}</p>;
}
