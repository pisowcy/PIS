import { FavoriteCard } from "./favoritecard"

export function FavoriteCards({ films }) {
    return (
        <>
            {films.map((card) => {
                return <FavoriteCard key={card.id} productionId={card.id}/>
            })}
        </>
    )
}