import { useState, useEffect } from "react";

export function FavouriteButton(movieId) {
  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    fetchFavorites();
  }, []);
  const fetchFavorites = async () => {
    try {
      const response = await fetch(
        `http://20.229.152.181/favoriteUserProductionByUser/1`
      );
      const favorites = await response.json();
      const isFav = favorites.some(
        (fav) => fav.production === +movieId.movieId
      );
      console.log(isFav, +movieId.movieId);
      setIsFavorite(isFav);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };
  const addToFavorites = async () => {
    try {
      const response = await fetch(
        `http://20.229.152.181/favoriteUserProduction`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user: 1, production: movieId.movieId }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setIsFavorite(true);
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };
  const removeFromFavorites = async () => {
    try {
      const response = await fetch(
        `http://20.229.152.181/favoriteUserProduction/user/1/production/${+movieId.movieId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setIsFavorite(false);
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  };

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites();
    } else {
      addToFavorites();
    }
  };
  return (
    <button
      className="w-1/2 py-2 text-white bg-blue-500 hover:bg-blue-700 rounded mx-auto"
      onClick={toggleFavorite}
    >
      {isFavorite ? "Remove ♥" : "Add ♡"}
    </button>
  );
}
