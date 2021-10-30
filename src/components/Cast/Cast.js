import { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import PropTypes from "prop-types";
import Actor from "../Actor/Actor";
import Loader from "../Loader/Loader";
import Message from "../Message/Message";
import s from "./Cast.module.scss";
import api from "../../services/api";
// Компонент списка актёров
const Cast = () => {
  const [actors, setActors] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const match = useRouteMatch();

  // Срабатывает при маунте
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  // Запрос за актёрами
  const fetchData = async () => {
    const { movieId } = match.params; // Получаем id фильма из match.params

    setLoading(true);

    try {
      const { cast } = await api.fetchCast(movieId);
      setActors(cast);
    } catch (error) {
      console.error("Smth wrong with fetch cast on movie page", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {isLoading && <Loader />}

      {actors.length > 0 ? (
        <ul className={s.list}>
          {actors.map(({ id, profile_path, name, character }) => {
            return (
              <li key={id} className={s.item}>
                <Actor photo={profile_path} name={name} character={character} />
              </li>
            );
          })}
        </ul>
      ) : (
        <p>There is no information about actors for this movie.</p>
      )}

      {error && (
        <Message>
          <h2>
            The service is temporarily unavailable. Please try again later.
          </h2>
        </Message>
      )}
    </div>
  );
};

Cast.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Cast;
