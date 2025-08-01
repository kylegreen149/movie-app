import MovieCard from "../components/MovieCard"
import { getPopularMovies, searchMovies } from "../services/api"
import { useState, useEffect } from "react"
import "../css/Home.css"

function Home() {
    const [searchQuery, setSearchQuery] = useState("")
    const [movies, setMovies] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies()
                setMovies(popularMovies)
            } catch (err) {
                console.log(err)
                setError("Failed to load movies...")
            } finally {
                setLoading(false)
            }
        }
        loadPopularMovies()
    }, [])

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

            {error && <div className="error-message">{error}</div>}

            {loading ? (<div className="loading">Loading...</div>) : (
                <div className="movies-grid">
                    {movies.map(movie => 
                        movie.title.toLowerCase().includes(searchQuery) && (
                            <MovieCard movie={movie} key={movie.id}/>
                            ) 
                    )}
                </div>
            )}
        </div>
    )
}

export default Home