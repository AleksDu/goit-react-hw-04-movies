import PropTypes from "prop-types";
import s from "./Container.module.scss";
const Container = ({ children }) => (
  <div className={s.cotainer}>{children}</div>
);
Container.defaultsProp = {
  children: [],
};
Container.propTypes = {
  children: PropTypes.node,
};
export default Container;
