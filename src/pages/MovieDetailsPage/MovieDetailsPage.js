import { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useRouteMatch, useLocation, useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import GoBackButton from "../../components/GoBackButton/GoBackButton";
import Movie from "../../components/Movie/Movie";
import MovieNavigation from "../../components/MovieNavigation/MovieNavigation";
import Cast from "../../components/Cast/Cast";
import Reviews from "../../components/Reviews/Reviews";
import Loader from "../../components/Loader/Loader";

import routes from "../../routes";
import api from "../../services/api";

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState(null);
  const [isLoading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [error, setError] = useState(null);

  const history = useHistory();
  const location = useLocation();
  const match = useRouteMatch();

  // Запрос при маунте
  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  // Функция запроса за фильмом
  const getData = async () => {
    const { movieId } = match.params; // Получаем id фильма из match.params

    setLoading(true);

    try {
      const result = await api.fetchMovieById(movieId);

      setMovie(result);
    } catch (error) {
      console.error("Smth wrong with fetch movie on movie page", error);
      setError({ error });
    } finally {
      setLoading(false);
    }
  };

  // Функция для кнопки "Назад"
  const handleGoBack = () => {
    history.push(location?.state?.from || routes.home);
  };

  return (
    <>
      <GoBackButton onBack={handleGoBack} />

      {movie && <Movie movie={movie} />}

      {movie && <MovieNavigation />}

      {/* Роутинг на основе match.path */}

      <Switch>
        <Route exact path={`${match.path}${routes.cast}`} component={Cast} />
        <Route
          exact
          path={`${match.path}${routes.reviews}`}
          component={Reviews}
        />
      </Switch>

      {isLoading && <Loader />}
    </>
  );
};

MovieDetailsPage.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default MovieDetailsPage;
