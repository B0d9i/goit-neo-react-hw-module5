import axios from 'axios';

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzM1ODQyNGY1NzcwMGZkMDUyMDUyZmNkMjcxZWQwOCIsIm5iZiI6MTc2OTAwOTM3Mi4zNzEsInN1YiI6IjY5NzBmMGRjNjhiOTBkZDlmZDI2ZjI4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LFW_d8N6aQCKxmmurKRj9rR8ddXTfVQujKPDT8CabbA'; // Replace with your actual token
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

export const getTrendingMovies = async () => {
  const response = await axiosInstance.get('/trending/movie/day');
  return response.data.results;
};

export const searchMovies = async (query) => {
  const response = await axiosInstance.get('/search/movie', {
    params: {
      include_adult: false,
      language: 'en-US',
      page: 1,
      query,
    },
  });
  return response.data.results;
};

export const getMovieDetails = async (movieId) => {
  const response = await axiosInstance.get(`/movie/${movieId}`);
  return response.data;
};

export const getMovieCredits = async (movieId) => {
  const response = await axiosInstance.get(`/movie/${movieId}/credits`);
  return response.data.cast;
};

export const getMovieReviews = async (movieId) => {
  const response = await axiosInstance.get(`/movie/${movieId}/reviews`);
  return response.data.results;
};

export const getImageUrl = (path) => {
  if (!path) return null;
  return `${IMAGE_BASE_URL}${path}`;
};

