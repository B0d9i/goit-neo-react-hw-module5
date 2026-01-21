import { useEffect, useState, useRef } from 'react';
import { useParams, Link, Outlet, NavLink, useLocation } from 'react-router-dom';
import { getMovieDetails, getImageUrl } from '../../services/api';
import styles from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const backLinkRef = useRef(location.state?.from?.pathname || '/movies');

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getMovieDetails(movieId);
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (movieId) {
      fetchMovieDetails();
    }
  }, [movieId]);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>Error: {error}</div>
      </div>
    );
  }

  if (!movie) {
    return null;
  }

  return (
    <div className={styles.container}>
      <Link to={backLinkRef.current} className={styles.backLink}>
        ← Go back
      </Link>

      <div className={styles.movieCard}>
        <img
          src={getImageUrl(movie.poster_path)}
          alt={movie.title}
          className={styles.poster}
        />
        <div className={styles.details}>
          <h1 className={styles.title}>{movie.title}</h1>
          <p className={styles.overview}>
            <strong>Overview:</strong> {movie.overview}
          </p>
          <p className={styles.info}>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p className={styles.info}>
            <strong>Rating:</strong> {movie.vote_average?.toFixed(1)} / 10
          </p>
        </div>
      </div>

      <div className={styles.nav}>
        <NavLink to="cast" className={styles.navLink}>
          Cast
        </NavLink>
        <NavLink to="reviews" className={styles.navLink}>
          Reviews
        </NavLink>
      </div>

      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;

