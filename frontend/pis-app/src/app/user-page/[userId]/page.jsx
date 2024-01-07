"use client";
import { Navbar } from "@/components/navbar";
import { useState, useEffect } from "react"
import { LoadingAnimation } from "@/components/loadinganimation";
import { FavoriteCards } from "@/components/user-page/favoritecards";
import { UserData } from "@/components/user-page/userdata";

export default function Component({ params }) {
    const userId = params.userId
    const [userFavorites, setUserFavorites] = useState([])
    const [user, setUser] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadingError, setLoadingError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            let favoriteFilms;
            let userData;

            try {
                const responseFavorite = await fetch(`http://20.229.152.181/favoriteUserProductionByUser/${userId}`);
                if (!responseFavorite.ok) {
                    throw new Error(`HTTP error! Status: ${responseFavorite.status}`);
                }
                const favoriteData = await responseFavorite.json();

                const responseUser = await fetch(`http://20.229.152.181/users/${userId}`);
                if (!responseUser.ok) {
                    throw new Error(`HTTP error! Status: ${responseUser.status}`);
                }
                userData = await responseUser.json();

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

            setUserFavorites(favoriteFilms);
            setUser(userData);
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
                <UserData email={user.email} username={user.username} />
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
