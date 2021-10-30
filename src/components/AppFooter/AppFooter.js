import s from "./AppFooter.module.scss";
const AppFooter = () => {
  return (
    <footer className={s.footer}>
      <p className={s.text}>
        &copy; {new Date().getFullYear()} Trending movies
      </p>
    </footer>
  );
};

export default AppFooter;
