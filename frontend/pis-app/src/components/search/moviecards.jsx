import { MovieCard } from "./moviecard"

export function MovieCards({ movies }) {
    return (
        <>
            {
                movies.map((movie) => {
                    return <MovieCard
                        key={movie.id}
                        id={movie.id}
                        title={movie.title}
                        premiere_date={movie.premiere_date}
                        genre={movie.genre}
                        duration={movie.duration}
                        description={movie.description}
                    />
                })
            }
        </>
    )
}