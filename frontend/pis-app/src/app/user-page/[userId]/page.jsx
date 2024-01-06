"use client";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { CardContent, Card } from "@/components/ui/card"
import { Navbar } from "@/components/navbar";
import { useState, useEffect } from "react"
import Link from "next/link";
import { LoadingAnimation } from "@/components/loadinganimation";

export default function Component({ params }) {
    const userId = params.userId
    const [userFavorites, setUserFavorites] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [loadingError, setLoadingError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            let favoriteFilms
            try {
            const responseFavorite = await fetch(`http://20.229.152.181/favoriteUserProductionByUser/${userId}`);
            if (!responseFavorite.ok) {
                throw new Error(`HTTP error! Status: ${responseFavorite.status}`);
            }
            const favoriteData = await responseFavorite.json();

            favoriteFilms = favoriteData.map((film) => {
                return {
                id: film.production
                }
            })

            } catch (error) {
                console.error("Error fetching data:", error);
                setLoadingError(error);
            } finally {
                setIsLoading(false);
            }

            setUserFavorites(favoriteFilms)
        };
    
        fetchData();
      }, []);

    return (    
        <main>
            <Navbar />
            {isLoading ? (
                <LoadingAnimation />
            ) : loadingError ? (
            alert('There is a problem with Your internet connection\nCheck it and try again')
            ) : (
                <div className="flex flex-col gap-10 p-4 md:p-6">
                <UserData />
                <section className="grid gap-6">
                <h2 className="text-2xl font-bold">Favorites</h2>
                <div className="flex overflow-x-scroll gap-4 md:gap-6 lg:gap-8">
                    {userFavorites ? (
                        <FavoriteCards films={userFavorites} />
                    ) : (
                        <p>You have not got any favorite films</p>
                    )}
                </div>
                </section>
            </div>
            )}
        </main>
  )
}

function UserData(props) {
    return (
        <section className="grid gap-6">
            <h2 className="text-2xl font-bold">User Data</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Avatar className="w-24 h-24 border">
                <AvatarImage alt="User Name" src="/placeholder-user.jpg" />
                <AvatarFallback>UN</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                <h3 className="font-semibold text-lg md:text-xl">User Name</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">User Bio</p>
                </div>
            </div>
        </section>
    )
}

function FavoriteCards({ films }) {
    return (
        <>
            {films.map((card) => {
                return <FavoriteCard key={card.id} productionId={card.id}/>
            })}
        </>
    )
}

function FavoriteCard({ productionId }) {
    console.log(productionId)
    const [production, setProduction] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            let productionData;
            try {
            const responseProduction = await fetch(`http://20.229.152.181/productions/${productionId}`);
            if (!responseProduction.ok) {
                throw new Error(`HTTP error! Status: ${responseProduction.status}`);
            }
            productionData = await responseProduction.json();

            } catch (error) {
            console.
            error("Error fetching data:", error);
            }
            setProduction(productionData)
        };

        fetchData();
        }, []);

    return (
        <Link href={`/movie-page/${production.id}`}>
        <Card style={{ maxWidth: '300px'}}>
        <CardContent>
        <img
        alt="Favorite Item 3"
        className="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
        max-height="200"
        src="https://pisstorage2.blob.core.windows.net/static/poster_example.jpg"
        max-width="200"
        />
        <h3 className="font-semibold text-lg md:text-xl">{production.title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{production.description}</p>
        </CardContent>
        </Card>
        </Link>
    )
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
  )
}
