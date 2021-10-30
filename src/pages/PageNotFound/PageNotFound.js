import s from "./PageNotFound.module.scss";
const PageNotFound = () => (
  <h1 className={s.error}>
    Error 404: Page not found{""}
    <span role="img" aria-label="sheep">
      🤯
    </span>
  </h1>
);
export default PageNotFound;
