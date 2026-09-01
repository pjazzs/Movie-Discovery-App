const API_KEY = "a036d6be4b4c8d754d8fb0f6d92317b1";

const BASE_URL = "https://api.themoviedb.org/3";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

document.querySelector(".current-year").textContent = new Date().getFullYear();

// ================================
// GET POPULAR MOVIES
// ================================

export async function getPopularMovies(page = 1) {
  const url =
    `${BASE_URL}/movie/popular` +
    `?api_key=${API_KEY}` +
    `&language=en-US` +
    `&page=${page}`;

  const response = await fetch(url);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.status_message || "Failed to fetch movies.");
  }

  return data;
}

// ================================
// SEARCH MOVIES
// ================================

export async function searchMovies(query, page = 1) {
  const url =
    `${BASE_URL}/search/movie` +
    `?api_key=${API_KEY}` +
    `&language=en-US` +
    `&query=${encodeURIComponent(query)}` +
    `&page=${page}`;

  const response = await fetch(url);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.status_message || "Failed to search movies.");
  }

  return data;
}

// ================================
// GET MOVIE GENRES
// ================================

export async function getGenres() {
  const url =
    `${BASE_URL}/genre/movie/list` + `?api_key=${API_KEY}` + `&language=en-US`;

  const response = await fetch(url);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.status_message || "Failed to fetch genres.");
  }

  return data;
}

// ================================
// GET MOVIES BY GENRE
// ================================

export async function getMoviesByGenre(genreId, page = 1) {
  const url =
    `${BASE_URL}/discover/movie` +
    `?api_key=${API_KEY}` +
    `&language=en-US` +
    `&with_genres=${genreId}` +
    `&sort_by=popularity.desc` +
    `&page=${page}`;

  const response = await fetch(url);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.status_message || "Failed to fetch movies by genre.");
  }

  return data;
}

// ================================
// GET MOVIE DETAILS
// ================================

// ================================
// GET MOVIE DETAILS
// ================================

export async function getMovieDetails(movieId) {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movie details");
  }

  return response.json();
}

// ================================
// GET POSTER URL
// ================================

export function getPosterUrl(posterPath) {
  if (!posterPath) {
    return "https://via.placeholder.com/" + "500x750?text=No+Poster";
  }

  return `${IMAGE_BASE_URL}${posterPath}`;
}

// ================================
// GET MOVIE VIDEOS
// ================================

export async function getMovieVideos(movieId) {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movie videos");
  }

  return response.json();
}

// ================================
// GET SIMILAR MOVIES
// ================================

export async function getSimilarMovies(movieId) {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}/similar?api_key=${API_KEY}&language=en-US&page=1`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch similar movies");
  }

  return response.json();
}

// ================================
// GET MOVIE VIDEOS
// ================================
