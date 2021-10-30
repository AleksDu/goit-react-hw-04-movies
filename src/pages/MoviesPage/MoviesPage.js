import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import queryString from "query-string";
import api from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import SearchForm from "../../components/SearchForm/SearchForm";
import MovieList from "../../components/MovieList/MovieList";
import LoadMoreButton from "../../components/LoadMoreButton/LoadMoreButton";
import Loader from "../../components/Loader/Loader";
import "react-toastify/dist/ReactToastify.min.css";

const MoviesPage = () => {
  const location = useLocation();
  const history = useHistory();
  const { search } = location;
  const { query } = queryString.parse(search);
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState(query || "");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!searchQuery) return;
    getMovies();
    // eslint-disable-next-line
  }, [searchQuery]);
  const getMovies = async () => {
    setIsLoading(true);
    try {
      const results = await api.fetchMoviesBySearch(searchQuery, page);
      if (results.length === 0) {
        toast.info("Nothing found 🙄😫", {
          autoClose: 2000,
        });
      }
      setMovies((prev) => [...prev, ...results]);
      setPage((prev) => prev + 1);
      setIsLoading(true);
    } catch (error) {
      console.error("Smth wrong with search fetch", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  const onChangeQuery = (query) => {
    setMovies([]);
    setSearchQuery(query);
    setPage(1);
    setError(null);

    history.push({ ...location, search: `query=${query}` });
  };
  return (
    <main>
      <SearchForm onSearch={onChangeQuery} />
      <MovieList movies={movies} />
      {movies.length > 0 && <LoadMoreButton onClick={getMovies} />}
      {isLoading && <Loader />}
      <ToastContainer />
    </main>
  );
};
export default MoviesPage;
