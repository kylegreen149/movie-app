import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext()

export const useMovieContext = () => useContext(MovieContext)

// Provide state to any components wrapped inside it (gets access to specific functions or state when it is needed for use)
// Children is a reserved prop when you write a component and is anything inside the component that you rendered
export const MovieProvider = ({children}) => {
    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        const storedFavs = localStorage.getItem("favorites")

        if (storedFavs) setFavorites(JSON.parse(storedFavs))
    }, [])

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites))
    }, [favorites])

    const addToFavorites = (movie) => {
        setFavorites((prev) => [...prev, movie])
    }

    const removeFromFavorites = (movieId) => {
        setFavorites((prev) => {
            prev.filter(movie => movie.id !== movieId)
        })
    }

    const isFavorite = (movieId) => {
        return favorites.some((movie) => movie.id === movieId)
    }

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    }

    return (
        <MovieContext.Provider value={value}>
            {children}
        </MovieContext.Provider>
    )
}