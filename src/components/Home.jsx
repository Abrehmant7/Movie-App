import { useState, useEffect } from 'react'
import Search from './Search'
import '../App.css'
import { useNavigate } from 'react-router-dom'
import Spinner from './Spinner'
import Pagination from "./pagination";
import Movies from './Movies'
import { useDebounce } from 'react-use'
import { updateSearchCount, getTrendingMovies } from '../trendingMovies'

function Home() {
  const [debouncedSearchTerm, setdebouncedSearchTerm] = useState("");
  const [searchTerm, setsearchTerm] = useState("");
  const [movieList, setmovieList] = useState([]);
  const [errorMessage, seterrorMessage] = useState("");
  const [Loading, setLoading] = useState(false);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const BASE_API_URL = "https://api.themoviedb.org/3";
  const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

  useDebounce(() => setdebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const FetchData = async (query = '') => {
    setLoading(true);
    seterrorMessage("");

    try {
      const endpoint = query? `${BASE_API_URL}/search/tv?query=${encodeURIComponent(query)}&page=${currentPage}`
       : `${BASE_API_URL}/discover/tv?sort_by=popularity.desc`;
      const responce = await fetch(endpoint, API_OPTIONS);
      
      if(!responce.ok){
        throw new Error("Can't fetch movies!")
      }

      const data = await responce.json();
      
      if(!data.results){
        seterrorMessage(data.error || "Could not load movies!");
        setmovieList([]);
        return;
      }

      setmovieList(data.results || []);
      setTotalPages(data.total_pages);

      if(query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }

    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      seterrorMessage("Error fetching movies, try again later!");
    }finally{
      setLoading(false);
    }
  }

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);

    } catch (error) {
      console.error(`error fetching trending TV shows: ${error}`);
    }
  }

  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/movie/${id}`);
  }

  useEffect(() => {
    loadTrendingMovies();
  }, [])

  useEffect(() => {
    FetchData(debouncedSearchTerm);
  }, [debouncedSearchTerm, currentPage])

return (
    <main>
      <div className="pattern"/>

      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle</h1>
          
          <Search searchTerm={searchTerm} setsearchTerm={setsearchTerm} />

          {trendingMovies && (
          <section className="trending">
            <h2>Trending TV shows</h2>
            {/* {console.log(trendingMovies)} */}
            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.id} onClick={() => handleClick(movie.movie_id)}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.name} />
                </li>
              ))}
            </ul>
          </section>
        )}

          <section className="all-movies">
            <h2>All TV shows.</h2>
            {Loading? (
              <Spinner />
            ): (errorMessage? (
              <p className='text-red-600'>{errorMessage}</p>
            ): (
              <ul>
                {movieList.map((movie) => (
                  <Movies key={movie.id} movie={movie} handleClick={() => handleClick(movie.id)}/>
                ))}
              </ul>
            ))}
          </section>

          <section className='mt-6' >
            <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
          </section>

        </header>

    </div>
  </main>
 )
}

export default Home;
