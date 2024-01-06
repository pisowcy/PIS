import Link from "next/link"
import { StarIcon } from "../staricon"

export function Movie(props) {
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