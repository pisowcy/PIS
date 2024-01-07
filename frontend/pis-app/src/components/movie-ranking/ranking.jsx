import { useState, useEffect } from "react";
import { LoadingAnimation } from "../loadinganimation";
import { Movie } from "./movie";

export function Ranking() {
    const [productions, setProductions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadingError, setLoadingError] = useState(null);
  
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
                poster_url: production.poster_url,
                average_score: productionsAverageScore[production.id]
            }
          })
  
          setProductions(productionsDataWithAverageScore);
  
        } catch (error) {
          console.error("Error fetching data:", error);
          setLoadingError(error);
        } finally {
          setIsLoading(false)
        }
      };
  
      fetchMovies();
    }, []);
  
    return (
      <div className="flex flex-col gap-6">
        {loadingError ? (
          alert(`There is a problem with Your internet connection\nCheck it and try again`)
        ) : isLoading ? (
          <LoadingAnimation />
        ) : (
          productions.map((production, index) => {
            var dateString = production.premiere_date;
            var date = new Date(dateString);
            var year = date.getFullYear();
            return (
              <Movie
                key={production.id}
                id={production.id}
                description={production.description}
                title={production.title}
                genre={production.genre}
                year={year}
                review={production.average_score}
                poster_url={production.poster_url}
                number={index + 1}
              />
            );
          })
        )}
      </div>
    )
  }