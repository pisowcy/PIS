import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import Link from "next/link";

export default function MovieRanking() {
  return (
    <main className="mx-auto px-4 md:px-6 max-w-7xl grid gap-12 flex justify-center">
      <Navbar />
      <Card className="w-full">
        <CardHeader>
          <h2 className="text-2xl font-bold">Top Movies</h2>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <Link href="/movie-page">
              <div className="flex gap-4">
                <div className="font-bold text-2xl">1</div>
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
                  <h3 className="font-semibold text-lg">Movie 1</h3>
                  <p className="text-gray-500 dark:text-gray-400 line-clamp-2">
                    This is a brief description of the Movie 1. It is a
                    thrilling and captivating film.
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">
                    Genre: Action
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">Year: 2023</p>
                </div>
                <div className="self-start ml-auto text-lg">
                  <StarIcon className="w-4 h-4 inline-block mr-1" />
                  4.9
                </div>
              </div>
            </Link>
            <Link href="/movie-page">
              <div className="flex gap-4">
                <div className="font-bold text-2xl">2</div>
                <img
                  alt="Movie 2 poster"
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
                  <h3 className="font-semibold text-lg">Movie 2</h3>
                  <p className="text-gray-500 dark:text-gray-400 line-clamp-2">
                    This is a brief description of the Movie 2. It is a
                    thrilling and captivating film.
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">
                    Genre: Drama
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">Year: 2022</p>
                </div>
                <div className="self-start ml-auto text-lg">
                  <StarIcon className="w-4 h-4 inline-block mr-1" />
                  4.5
                </div>
              </div>
            </Link>
            <Link href="/movie-page">
              <div className="flex gap-4">
                <div className="font-bold text-2xl">3</div>
                <img
                  alt="Movie 3 poster"
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
                  <h3 className="font-semibold text-lg">Movie 3</h3>
                  <p className="text-gray-500 dark:text-gray-400 line-clamp-2">
                    This is a brief description of the Movie 3. It is a
                    thrilling and captivating film.
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">
                    Genre: Sci-Fi
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">Year: 2021</p>
                </div>
                <div className="self-start ml-auto text-lg">
                  <StarIcon className="w-4 h-4 inline-block mr-1" />
                  4.2
                </div>
              </div>
            </Link>
          </div>
        </CardContent>
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
