import MovieCard from "../components/MovieCard"
import { useState } from "react"

function Home() {
    const [searchQuery, setSearchQuery] = useState("")
    const movies = [
        {id: 1, title: "Inception", release_date: 2010},
        {id: 2, title: "Interstellar", release_date: 2014},
        {id: 3, title: "The Dark Knight", release_date: 2008},
        {id: 4, title: "Pulp Fiction", release_date: 1994}
    ]

    const handleSubmit = (e) => {
        e.preventDefault()
        alert(searchQuery)
        setSearchQuery("")
    }

    return (
        <div className="home">
            <form className="search-form" onSubmit={handleSubmit}>
                <input type="text" placeholder="Search for movies..." 
                className="search-input" 
                onChange={(e) => {setSearchQuery(e.target.value)}}
                value={searchQuery}/>
                <button type="submit" className="search-button">Search</button>
            </form>

            <div className="movies-grid">
                {movies.map(movie => 
                    movie.title.toLowerCase().includes(searchQuery) && (
                        <MovieCard movie={movie} key={movie.id}/>
                        ) 
                )}
            </div>
        </div>
    )
}

export default Home