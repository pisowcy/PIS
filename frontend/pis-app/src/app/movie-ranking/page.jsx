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
  const [productions, setProductions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // hardcoded ids, have to find some way to get them from api
        const ids = Array.from({ length: 5}, (_, index) => 6 + index);
        let reviews = [];
        for (let id of ids) {
          const responseReviews = await fetch(`http://20.229.152.181/reviewsByProductionStats/${id}`);
          if (!responseReviews.ok) {
            throw new Error(`HTTP error! Status: ${responseReviews.status}`);
          }
          const reviewsData = await responseReviews.json();
          reviews.push({productionId: id, average_score: reviewsData.average_score})
        }

        reviews.sort((a, b) => b.average_score - a.average_score);
        const limitedReviews = reviews.slice(0,100);
        console.log(limitedReviews)

        const productionsAverageScore = limitedReviews.reduce((acc, review) => {
          acc[review.productionId] = review.average_score.toFixed(2);
          return acc;
        }, {});

        const bestProductionsIds = limitedReviews.map((production) => production.productionId)
        
        let productionsData = [];
        for (let id of bestProductionsIds) {
          const responseProduction = await fetch(`http://20.229.152.181/productions/${id}`);
          if (!responseProduction.ok) {
            throw new Error(`HTTP error! Status: ${responseProduction.status}`);
          }
          const productionData = await responseProduction.json();
          productionsData.push(productionData);
        }

        const productionsDataWithAverageScore = productionsData.map((production) => {
          return {
              id: production.id,
              title: production.title,
              description: production.description,
              premiere_date: production.premiere_date,
              country: production.country,
              genre: production.genre,
              average_score: productionsAverageScore[production.id]
          }
        })

        setProductions(productionsDataWithAverageScore);

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false)
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      {isLoading ? (
        <LoadingAnimation />
      ) : (
        productions.map((production, index) => {
          var dateString = production.premiere_date
          var date = new Date(dateString)
          var year = date.getFullYear()
          return <Movie 
            key={production.id}
            id={production.id}
            description={production.description}
            title={production.title}
            genre={production.genre}
            year={year}
            review={production.average_score}
            number={index + 1}
          />
        })
      )}
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
        <div className="flex items-center mt-auto" style={{paddingBottom: '8rem'}}>
            <StarIcon className="w-4 h-4 inline-block mr-1" />
            <span className="text-lg">{review}</span>
        </div>
      </div>
    </Link>
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

  return <p>Loading{Array(dots).fill('.').join('')}</p>;
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
