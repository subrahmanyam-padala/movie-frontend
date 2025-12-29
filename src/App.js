import './App.css';
import api from './api/axiosConfig';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './components/home/Home';
import Trailer from './components/trailer/Trailer';
import Reviews from './components/reviews/Reviews';
import WatchList from './components/watchList/WatchList.js';
import NotFound from './components/notFound/NotFound';

function App() {

  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);

  const getMovies = async () => {
    try {
      const response = await api.get("/api/v1/movies");
      setMovies(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getMovieData = async (movieId) => {
    try {
      const response = await api.get(`/api/v1/movies/${movieId}`);
      setMovie(response.data);
      setReviews(response.data.reviews);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home movies={movies} />} />
        <Route path="watchList" element={<WatchList />} />
        <Route path="trailer/:ytTrailerId" element={<Trailer />} />
        <Route
          path="reviews/:movieId"
          element={
            <Reviews
              getMovieData={getMovieData}
              movie={movie}
              reviews={reviews}
              setReviews={setReviews}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
