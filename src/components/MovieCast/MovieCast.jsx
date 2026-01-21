import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCredits, getImageUrl } from '../../services/api';
import styles from './MovieCast.module.css';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getMovieCredits(movieId);
        setCast(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (movieId) {
      fetchCast();
    }
  }, [movieId]);

  if (loading) {
    return <div className={styles.loading}>Loading cast...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  if (!cast || cast.length === 0) {
    return (
      <div className={styles.message}>We don't have any cast information for this movie.</div>
    );
  }

  return (
    <div className={styles.cast}>
      <h2 className={styles.title}>Cast</h2>
      <ul className={styles.list}>
        {cast.map((actor) => (
          <li key={actor.id} className={styles.item}>
            <img
              src={getImageUrl(actor.profile_path)}
              alt={actor.name}
              className={styles.image}
            />
            <p className={styles.name}>{actor.name}</p>
            <p className={styles.character}>Character: {actor.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;

