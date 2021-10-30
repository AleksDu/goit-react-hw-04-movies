import { useState, useEffect } from "react";
import Loader from "../../components/Loader/Loader";
import api from "../../services/api";
import Message from "../../components/Message/Message";
import MovieList from "../../components/MovieList/MovieList";

const HomePage = () => {
  const [trends, setTrends] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const movies = await api.fetchTrends();
      setTrends(movies);
    } catch (error) {
      console.error("Smth wrong with homepage trends fetch", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <main>
      {trends ? (
        <MovieList movies={trends} />
      ) : (
        <Message>
          <h2> The service is unavailable. Please try again later.</h2>
        </Message>
      )}
      {isLoading && <Loader />}
    </main>
  );
};
export default HomePage;
