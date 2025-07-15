import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const MovieDetail = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null)

    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
    const BASE_API_URL = "https://api.themoviedb.org/3";
    const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
  }

  const fetchMovies = async () => {
    try {
        const endPoint = `${BASE_API_URL}/tv/${id}`
        const responce = await fetch(endPoint, API_OPTIONS)
        const data = await responce.json();
        setMovie(data);
    } catch (error) {
        console.error(`can't find movie details ${error}`)
    }
  }

  useEffect(() => {
    fetchMovies();
  }, [id]);

  if(!movie){
    return <p>Loading....</p>
  }

  return(
     <div className="movie-detail text-white flex gap-x-5 border-gray-600 border-4 p-5 rounded-lg">
      <div className="w-[35%]">
        <img className="w-3/4 rounded-xl" src={movie.poster_path ?
          `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : '/no-movie.png'}
        alt={movie.name} />
      </div>
      <div className="w-[65%] space-y-3">
        <h1>{movie.name}</h1>
        <p><strong className="text-amber-300">Rating:</strong> {movie.vote_average}</p>
        <p><strong className="text-amber-300">Language:</strong> {movie.original_language}</p>
        <p><strong className="text-amber-300">First Air Date:</strong> {movie.first_air_date}</p>
        <p className="mt-3"><strong className="text-amber-300">Description:</strong> {movie.overview}</p>
      </div>
    </div>
  )
}

export default MovieDetail;