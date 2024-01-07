import { CardHeader, CardContent, Card } from "@/components/ui/card";
import Link from "next/link";
import { StarIcon } from "@/components/staricon";

export function Movie({ id, title, description, rating, poster_url }) {
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