import {
    getPopularMovies,
    searchMovies,
    getGenres,
    getMoviesByGenre,
    getMovieDetails,
    getMovieVideos,
    getSimilarMovies
} from "./api.js";


import {
    addFavorite,
    removeFavorite,
    isFavorite,
    getFavorites
} from "./favorites.js";


import {
    showLoading,
    hideLoading,
    showError,
    renderMovies,
    renderGenres,
    showEmptyState,
    updateResultsInfo,
    updatePagination,
    renderMovieDetails,
    showMovieDetailsLoading,
    showMovieDetailsError,
    renderFavorites,
    showToast,
    openMovieModal,
    closeMovieModal
} from "./ui.js";


// ================================
// DOM ELEMENTS
// ================================

const searchInput =
    document.getElementById(
        "searchInput"
    );


const searchBtn =
    document.getElementById(
        "searchBtn"
    );


const genreSelect =
    document.getElementById(
        "genreSelect"
    );


const retryBtn =
    document.getElementById(
        "retryBtn"
    );


const prevBtn =
    document.getElementById(
        "prevBtn"
    );


const nextBtn =
    document.getElementById(
        "nextBtn"
    );


const movieGrid =
    document.getElementById(
        "movieGrid"
    );


const modalClose =
    document.getElementById(
        "modalClose"
    );


const modalOverlay =
    document.getElementById(
        "modalOverlay"
    );

    const movieDetails =
    document.getElementById(
        "movieDetails"
    );


const modalBack =
    document.getElementById(
        "modalBack"
    );


const favoritesBtn =
    document.getElementById(
        "favoritesBtn"
    );


const favoritesSection =
    document.getElementById(
        "favoritesSection"
    );


const backMoviesBtn =
    document.getElementById(
        "backMoviesBtn"
    );


const browseMoviesBtn =
    document.getElementById(
        "browseMoviesBtn"
    );


const favoritesGrid =
    document.getElementById(
        "favoritesGrid"
    );


const favoritesCount =
    document.getElementById(
        "favoritesCount"
    );


// ================================
// APPLICATION STATE
// ================================

const state = {

    movies: [],

    currentPage: 1,

    totalPages: 1,

    totalResults: 0,

    searchQuery: "",

    selectedGenre: "",

    movieHistory: []

};


// ================================
// UPDATE FAVORITES COUNT
// ================================

function updateFavoritesCount() {

    if (!favoritesCount) {

        return;

    }


    favoritesCount.textContent =
        getFavorites().length;

}


// ================================
// LOAD MOVIES
// ================================

async function loadMovies(
    page = 1
) {

    try {

        showLoading();


        let data;


        // ================================
        // SEARCH
        // ================================

        if (
            state.searchQuery
        ) {

            data =
                await searchMovies(
                    state.searchQuery,
                    page
                );

        }


        // ================================
        // GENRE
        // ================================

        else if (
            state.selectedGenre
        ) {

            data =
                await getMoviesByGenre(
                    state.selectedGenre,
                    page
                );

        }


        // ================================
        // POPULAR MOVIES
        // ================================

        else {

            data =
                await getPopularMovies(
                    page
                );

        }


        // ================================
        // UPDATE STATE
        // ================================

        state.movies =
            data.results || [];


        state.currentPage =
            data.page || page;


        state.totalPages =
            data.total_pages || 1;


        state.totalResults =
            data.total_results || 0;


        // ================================
        // RENDER
        // ================================

        if (
            state.movies.length === 0
        ) {

            showEmptyState();

        } else {

            renderMovies(
                state.movies
            );

        }


        // ================================
        // UPDATE INFORMATION
        // ================================

        updateResultsInfo(
            state.totalResults
        );


        updatePagination(
            state.currentPage,
            state.totalPages
        );


        hideLoading();


    } catch (error) {

        // console.error(
        //     "Failed to load movies:",
        //     error
        // );


        hideLoading();


        showError(
            "Unable to load movies. Please check your internet connection and try again."
        );

    }

}


// ================================
// LOAD GENRES
// ================================

async function loadGenres() {

    try {

        const data =
            await getGenres();


        renderGenres(
            data.genres
        );


    } catch (error) {

        // console.error(
        //     "Failed to load genres:",
        //     error
        // );

    }

}


// ================================
// SEARCH
// ================================

function handleSearch() {

    const query =
        searchInput.value.trim();


    state.searchQuery =
        query;


    state.currentPage =
        1;


    // Clear genre filter

    state.selectedGenre =
        "";


    genreSelect.value =
        "";


    loadMovies(1);

}


// ================================
// GENRE FILTER
// ================================

function handleGenreChange() {

    const genreId =
        genreSelect.value;


    state.selectedGenre =
        genreId;


    state.currentPage =
        1;


    // Clear search

    state.searchQuery =
        "";


    searchInput.value =
        "";


    loadMovies(1);

}


// ================================
// PREVIOUS PAGE
// ================================

function handlePreviousPage() {

    if (
        state.currentPage > 1
    ) {

        loadMovies(
            state.currentPage - 1
        );

    }

}


// ================================
// NEXT PAGE
// ================================

function handleNextPage() {

    if (
        state.currentPage <
        state.totalPages
    ) {

        loadMovies(
            state.currentPage + 1
        );

    }

}


// ================================
// RETRY
// ================================

function handleRetry() {

    loadMovies(
        state.currentPage
    );

}


// ================================
// FAVORITE BUTTON
// ================================

function handleFavoriteClick(
    event
) {

    const favoriteButton =
        event.target.closest(
            ".favorite-icon"
        );


    if (!favoriteButton) {

        return false;

    }


    const movieId =
        Number(
            favoriteButton.dataset.favoriteId
        );


    const movie =
        state.movies.find(
            item =>
                item.id === movieId
        );


    if (!movie) {

        // console.error(
        //     "Movie not found."
        // );

        return true;

    }


    // ================================
    // REMOVE FAVORITE
    // ================================

    if (
        isFavorite(movieId)
    ) {

        removeFavorite(
            movieId
        );


        favoriteButton.classList.remove(
            "active"
        );


        favoriteButton.setAttribute(
            "aria-label",
            "Add to favorites"
        );


        favoriteButton.setAttribute(
            "title",
            "Add to favorites"
        );


        showToast(
            `"${movie.title}" removed from favorites`
        );


        // console.log(
        //     "Removed from favorites:",
        //     movie.title
        // );


        updateFavoritesCount();

    }


    // ================================
    // ADD FAVORITE
    // ================================

    else {

        addFavorite(
            movie
        );


        favoriteButton.classList.add(
            "active"
        );


        favoriteButton.setAttribute(
            "aria-label",
            "Remove from favorites"
        );


        favoriteButton.setAttribute(
            "title",
            "Remove from favorites"
        );


        showToast(
            `"${movie.title}" added to favorites`
        );


        // console.log(
        //     "Added to favorites:",
        //     movie.title
        // );


        updateFavoritesCount();

    }


    return true;

}


// ================================
// LOAD MOVIE DETAILS
// ================================

async function loadMovieDetails(
    movieId,
    addToHistory = true
) {

    try {

        // ================================
        // SAVE CURRENT MOVIE TO HISTORY
        // ================================

        if (
            addToHistory &&
            state.currentMovieId &&
            state.currentMovieId !== movieId
        ) {

            state.movieHistory.push(
                state.currentMovieId
            );

        }


        // ================================
        // SET CURRENT MOVIE
        // ================================

        state.currentMovieId =
            movieId;


        // ================================
        // UPDATE BACK BUTTON
        // ================================

        if (
            state.movieHistory.length > 0
        ) {

            modalBack.classList.remove(
                "hidden"
            );

        } else {

            modalBack.classList.add(
                "hidden"
            );

        }


        // ================================
        // GET MOVIE DETAILS
        // ================================

        // console.log(
        //     "Requesting movie details..."
        // );


        const movie =
            await getMovieDetails(
                movieId
            );


        // console.log(
        //     "Movie details received:",
        //     movie
        // );


        // ================================
        // GET VIDEOS
        // ================================

        // console.log(
        //     "Requesting movie videos..."
        // );


        const videos =
            await getMovieVideos(
                movieId
            );


        // console.log(
        //     "Movie videos received:",
        //     videos
        // );


        // ================================
        // GET SIMILAR MOVIES
        // ================================

        // console.log(
        //     "Requesting similar movies..."
        // );


        const similarMovies =
            await getSimilarMovies(
                movieId
            );


        // console.log(
        //     "Similar movies received:",
        //     similarMovies
        // );


        // ================================
        // RENDER EVERYTHING
        // ================================

        renderMovieDetails(
            movie,
            videos.results || [],
            similarMovies.results || []
        );


    } catch (error) {

        // console.error(
        //     "Failed to load movie details:",
        //     error
        // );


        showMovieDetailsError(
            error.message
        );

    }

}


// ================================
// FAVORITE VIEW CLICK
// ================================

async function handleFavoriteViewClick(
    event
) {

    // ================================
    // FAVORITE BUTTON
    // ================================

    const favoriteButton =
        event.target.closest(
            ".favorite-icon"
        );


    if (favoriteButton) {

        const movieId =
            Number(
                favoriteButton.dataset.favoriteId
            );


        // ================================
        // GET MOVIE
        // ================================

        const favorites =
            getFavorites();


        const movie =
            favorites.find(
                item =>
                    item.id === movieId
            );


        // ================================
        // REMOVE FAVORITE
        // ================================

        removeFavorite(
            movieId
        );


        // ================================
        // SHOW TOAST
        // ================================

        if (movie) {

            showToast(
                `"${movie.title}" removed from favorites`
            );

        }


        // ================================
        // UPDATE MAIN MOVIE GRID
        // ================================

        const movieButton =
            movieGrid.querySelector(
                `.favorite-icon[data-favorite-id="${movieId}"]`
            );


        if (movieButton) {

            movieButton.classList.remove(
                "active"
            );


            movieButton.setAttribute(
                "aria-label",
                "Add to favorites"
            );


            movieButton.setAttribute(
                "title",
                "Add to favorites"
            );

        }


        // ================================
        // UPDATE FAVORITES COUNT
        // ================================

        updateFavoritesCount();


        // ================================
        // UPDATE FAVORITES VIEW
        // ================================

        renderFavorites(
            getFavorites()
        );


        return;

    }


    // ================================
    // MOVIE CARD
    // ================================

    const movieCard =
        event.target.closest(
            ".movie-card"
        );


    if (!movieCard) {

        return;

    }


    const movieId =
        movieCard.dataset.movieId;


    if (!movieId) {

        return;

    }


    // ================================
    // OPEN MOVIE MODAL
    // ================================

    openMovieModal();


    showMovieDetailsLoading();


    await loadMovieDetails(
        movieId
    );

}



// ================================
// MOVIE CARD CLICK
// ================================

async function handleMovieClick(
    event
) {

    // console.log(
    //     "Movie card clicked"
    // );


    // ================================
    // HANDLE FAVORITE BUTTON FIRST
    // ================================

    if (
        handleFavoriteClick(event)
    ) {

        return;

    }


    // ================================
    // IGNORE FAVORITE BUTTON
    // ================================

    if (
        event.target.closest(
            ".favorite-icon"
        )
    ) {

        // console.log(
        //     "Favorite button clicked"
        // );

        return;

    }


    // ================================
    // FIND MOVIE CARD
    // ================================

    const movieCard =
        event.target.closest(
            ".movie-card"
        );


    if (!movieCard) {

        // console.log(
        //     "No movie card found"
        // );

        return;

    }


    // ================================
    // GET MOVIE ID
    // ================================

    const movieId =
        movieCard.dataset.movieId;


    // console.log(
    //     "Selected movie ID:",
    //     movieId
    // );


    if (!movieId) {

        // console.error(
        //     "Movie card does not have a movie ID."
        // );

        return;

    }


    // ================================
    // OPEN MOVIE MODAL
    // ================================

    state.movieHistory = [];

state.currentMovieId =
    movieId;

modalBack.classList.add(
    "hidden"
);

    openMovieModal();


    showMovieDetailsLoading();


    await loadMovieDetails(
        movieId
    );

}


// ================================
// SIMILAR MOVIES CLICK
// ================================

async function handleSimilarMovieClick(
    event
) {

    const similarCard =
        event.target.closest(
            ".similar-movie-card"
        );


    if (!similarCard) {

        return;

    }


    const movieId =
        similarCard.dataset.movieId;


    if (!movieId) {

        // console.error(
        //     "Similar movie card does not have a movie ID."
        // );

        return;

    }


    // console.log(
    //     "Similar movie clicked:",
    //     movieId
    // );


    showMovieDetailsLoading();


    await loadMovieDetails(
        movieId
    );

}


// ================================
// SHOW FAVORITES
// ================================

function showFavorites() {

    const favorites =
        getFavorites();


    // ================================
    // HIDE NORMAL MOVIE BROWSING
    // ================================

    document.querySelector(
        ".hero"
    ).classList.add(
        "hidden"
    );


    document.querySelector(
        ".movies-section"
    ).classList.add(
        "hidden"
    );


    document.querySelector(
        ".pagination"
    ).classList.add(
        "hidden"
    );


    // ================================
    // SHOW FAVORITES
    // ================================

    favoritesSection.classList.remove(
        "hidden"
    );


    renderFavorites(
        favorites
    );


    // ================================
    // SCROLL TO FAVORITES
    // ================================

    favoritesSection.scrollIntoView({
        behavior: "smooth"
    });

}


// ================================
// SHOW MOVIES
// ================================

function showMovies() {

    favoritesSection.classList.add(
        "hidden"
    );


    document.querySelector(
        ".hero"
    ).classList.remove(
        "hidden"
    );


    document.querySelector(
        ".movies-section"
    ).classList.remove(
        "hidden"
    );


    document.querySelector(
        ".pagination"
    ).classList.remove(
        "hidden"
    );


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}



function handleMovieBack() {

    if (
        state.movieHistory.length === 0
    ) {

        return;

    }


    const previousMovieId =
        state.movieHistory.pop();


    // console.log(
    //     "Going back to movie:",
    //     previousMovieId
    // );


    loadMovieDetails(
        previousMovieId,
        false
    );

}


// ================================
// EVENT LISTENERS
// ================================


// ================================
// SEARCH
// ================================

searchBtn.addEventListener(
    "click",
    handleSearch
);


// ================================
// SEARCH WITH ENTER
// ================================

searchInput.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter"
        ) {

            handleSearch();

        }

    }
);


// ================================
// GENRE FILTER
// ================================

genreSelect.addEventListener(
    "change",
    handleGenreChange
);


// ================================
// PREVIOUS PAGE
// ================================

prevBtn.addEventListener(
    "click",
    handlePreviousPage
);


// ================================
// NEXT PAGE
// ================================

nextBtn.addEventListener(
    "click",
    handleNextPage
);


// ================================
// RETRY
// ================================

retryBtn.addEventListener(
    "click",
    handleRetry
);


// ================================
// MAIN MOVIE CARDS
// ================================

movieGrid.addEventListener(
    "click",
    handleMovieClick
);


// ================================
// SIMILAR MOVIE CARDS
// ================================

movieDetails.addEventListener(
    "click",
    handleSimilarMovieClick
);


// ================================
// CLOSE MODAL
// ================================

modalClose.addEventListener(
    "click",
    closeMovieModal
);

modalBack.addEventListener(
    "click",
    handleMovieBack
);


// ================================
// CLICK OVERLAY TO CLOSE
// ================================

modalOverlay.addEventListener(
    "click",
    event => {

        // Only close when clicking
        // directly on the overlay

        if (
            event.target ===
            modalOverlay
        ) {

            closeMovieModal();

        }

    }
);


// ================================
// CLOSE MODAL WITH ESCAPE
// ================================

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeMovieModal();

        }

    }
);


// ================================
// FAVORITES BUTTON
// ================================

favoritesBtn.addEventListener(
    "click",
    showFavorites
);


// ================================
// BACK TO MOVIES
// ================================

backMoviesBtn.addEventListener(
    "click",
    showMovies
);


// ================================
// BROWSE MOVIES
// ================================

browseMoviesBtn.addEventListener(
    "click",
    showMovies
);


// ================================
// FAVORITES GRID
// ================================

favoritesGrid.addEventListener(
    "click",
    handleFavoriteViewClick
);


// ================================
// INITIALIZE APP
// ================================

async function init() {

    await loadGenres();

    await loadMovies(1);

    updateFavoritesCount();

}


init();