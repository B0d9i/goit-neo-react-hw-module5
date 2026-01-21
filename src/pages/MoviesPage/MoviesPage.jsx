import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../../services/api';
import MovieList from '../../components/MovieList/MovieList';
import styles from './MoviesPage.module.css';

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const query = searchParams.get('query') || '';

  useEffect(() => {
    if (query) {
      const fetchMovies = async () => {
        try {
          setLoading(true);
          setError(null);
          const data = await searchMovies(query);
          setMovies(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchMovies();
    } else {
      setMovies([]);
    }
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const searchQuery = form.elements.query.value.trim();
    if (searchQuery) {
      setSearchParams({ query: searchQuery });
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Search Movies</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="query"
          defaultValue={query}
          placeholder="Search for movies..."
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Search
        </button>
      </form>

      {loading && <div className={styles.loading}>Loading...</div>}
      {error && <div className={styles.error}>Error: {error}</div>}
      {!loading && !error && movies.length > 0 && <MovieList movies={movies} />}
      {!loading && !error && query && movies.length === 0 && (
        <div className={styles.message}>No movies found for "{query}"</div>
      )}
    </div>
  );
};

export default MoviesPage;

