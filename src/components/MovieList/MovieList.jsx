import { Link, useLocation } from 'react-router-dom';
import { getImageUrl } from '../../services/api';
import styles from './MovieList.module.css';

const MovieList = ({ movies }) => {
  const location = useLocation();

  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <ul className={styles.list}>
      {movies.map((movie) => (
        <li key={movie.id} className={styles.item}>
          <Link
            to={`/movies/${movie.id}`}
            state={{ from: location }}
            className={styles.link}
          >
            <img
              src={getImageUrl(movie.poster_path)}
              alt={movie.title}
              className={styles.image}
            />
            <p className={styles.title}>{movie.title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;

