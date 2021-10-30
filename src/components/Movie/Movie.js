import PropTypes from "prop-types";
import s from "./Movie.module.scss";
import placeholder from "../../images/placeholder.png";
const Movie = ({ movie }) => {
  const { title, release_date, vote_average, poster_path, overview, genres } =
    movie;
  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : placeholder;
  const voteStyle = vote_average > 5 ? s["vote--top"] : s["vote--low"];
  return (
    <article className={s.article}>
      <div className={s.thumb}>
        <img src={posterUrl} alt={title} title={title} className={s.poster} />
      </div>
      <div>
        {title && (
          <h1 className={s.title}>
            {title}{" "}
            {release_date ? (
              <span>({release_date.substring(0, 4)})</span>
            ) : (
              <span>(N/A)</span>
            )}
          </h1>
        )}

        <p className={s.score}>
          <b className={s.label}>User score:</b>
          {vote_average ? <span>{vote_average * 10}%</span> : <span>N/A</span>}
          {vote_average ? <b className={voteStyle}>{vote_average}</b> : null}
        </p>

        <p className={s.overview}>
          <b className={s.label}>Overview:</b>
          {overview ? <span>{overview}</span> : <span>N/A</span>}
        </p>

        <b className={s.label}>Genres:</b>

        {genres.length > 0 ? (
          <ul className={s.genresList}>
            {genres.map(({ id, name }) => (
              <li key={id} className={s.genresItem}>
                <span>{name}</span>
              </li>
            ))}
          </ul>
        ) : (
          <span>N/A</span>
        )}
      </div>
    </article>
  );
};

Movie.defaultProps = {
  movie: PropTypes.shape({
    release_date: "",
    vote_average: 0,
    poster_path: placeholder,
    overview: "",
    genres: [],
  }),
};

Movie.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    release_date: PropTypes.string,
    vote_average: PropTypes.number,
    poster_path: PropTypes.string,
    overview: PropTypes.string,
    genres: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ),
  }),
};

export default Movie;
