# 🎬 Movie Explorer

A modern, responsive movie discovery web application built with **HTML, CSS, and Vanilla JavaScript**.

The application uses the **TMDB API** to allow users to discover popular movies, search for movies, filter movies by genre, view detailed movie information, watch trailers, explore similar movies, and save their favorite movies.

---

## 🚀 Live Demo

> Add your deployed application URL here after hosting.

**Live Demo:** `https://your-movie-app.netlify.app`

---

## 📸 Features

### 🎬 Movie Discovery
- Browse popular movies.
- Display movie posters, titles, release years, and ratings.
- Responsive movie card layout.

### 🔎 Search
- Search for movies by title.
- Press **Enter** or click the search button.
- Displays search results with pagination.

### 🎭 Genre Filtering
- Browse available movie genres.
- Filter movies by genre.
- Automatically resets the current search when a genre is selected.

### 📄 Pagination
- Navigate through movie results.
- Previous and Next buttons.
- Displays the current page and total pages.

### 🎥 Movie Details
Clicking a movie opens a detailed modal containing:

- Movie poster
- Backdrop image
- Movie title
- Release date
- Rating
- Runtime
- Genres
- Overview
- Original language
- Budget
- Revenue
- Official movie website
- Official trailer

### ▶️ Movie Trailers
- Displays the official YouTube trailer when available.
- Includes an option to watch the trailer directly on YouTube.

### 🎞️ Similar Movies
- Displays movies similar to the selected movie.
- Clicking a similar movie loads its details without leaving the modal.

### ❤️ Favorites
- Add movies to favorites.
- Remove movies from favorites.
- Favorites are stored using `localStorage`.
- Favorites remain available after refreshing the browser.
- Displays the total number of saved movies.

### 🔔 Notifications
Toast notifications provide feedback when:
- A movie is added to favorites.
- A movie is removed from favorites.

### ⏳ Loading & Error States
- Skeleton loading cards while movies are being fetched.
- Movie detail loading state.
- Error messages when API requests fail.
- Empty state when no movies match a search.

### 📱 Responsive Design
The application is designed to work across:

- Desktop
- Laptop
- Tablet
- Mobile devices

---

## 🛠️ Technologies Used

### Frontend

- HTML5
- CSS3
- JavaScript (ES6+)
- ES Modules
- DOM Manipulation
- Async/Await
- Fetch API
- LocalStorage

### API

- [TMDB API](https://developer.themoviedb.org/docs)

### External Services

- YouTube for movie trailers
- TMDB for movie information and images

---

## 📁 Project Structure

```text
movie-explorer/
│
├── index.html
│
├── css/
│   └── style.css
│
├── js/
│   ├── api.js
│   ├── app.js
│   ├── favorites.js
│   └── ui.js
│
├── assets/
│   └── ...
│
└── README.md