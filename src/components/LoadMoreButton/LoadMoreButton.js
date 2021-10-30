import PropTypes from "prop-types";
import s from "./LoadMoreButton.module.scss";
const LoadMoreButton = ({ onClick }) => (
  <div className={s.wrapper}>
    <button type="button" className={s.button} onClick={s.onClick}>
      Load More
    </button>
  </div>
);
LoadMoreButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default LoadMoreButton;
