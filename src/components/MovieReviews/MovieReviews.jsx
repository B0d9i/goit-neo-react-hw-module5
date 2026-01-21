import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from '../../services/api';
import styles from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getMovieReviews(movieId);
        setReviews(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (movieId) {
      fetchReviews();
    }
  }, [movieId]);

  if (loading) {
    return <div className={styles.loading}>Loading reviews...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className={styles.message}>We don't have any reviews for this movie.</div>
    );
  }

  return (
    <div className={styles.reviews}>
      <h2 className={styles.title}>Reviews</h2>
      <ul className={styles.list}>
        {reviews.map((review) => (
          <li key={review.id} className={styles.item}>
            <h3 className={styles.author}>Author: {review.author}</h3>
            <p className={styles.content}>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;

