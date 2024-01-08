import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StarIcon } from "../staricon";
import { ReviewForm } from "./reviewform";
import { ReviewList } from "./reviewlist";
import { FavouriteButton } from "./favouritebutton";

export function Movie({
  title,
  description,
  release_date,
  country,
  genre,
  duration,
  reviewNumber,
  reviewAverage,
  actors,
  movieId,
  comments,
  poster_url,
  trailer_url,
}) {
  return (
    <div className="container mx-auto">
      <Card className="max-w-4xl mx-auto mt-4 bg-white rounded-xl shadow-md overflow-hidden md:flex dark:bg-gray-800">
        <div className="md:flex">
          <div className="md:flex-shrink-0 ml-6 mt-6">
            <img
              alt="Movie 3 poster"
              className="w-56 h-80 object-cover rounded-md"
              height="600"
              src={poster_url}
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
            <div className="mt-2 mb-2 flex items-center">
              <FavouriteButton movieId={movieId} />
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
                <h3 className="text-lg mt-6 leading-6 font-medium text-gray-900 dark:text-white">
                  Trailer
                </h3>
                <video width="560" height="315" controls>
                  <source src={trailer_url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
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
