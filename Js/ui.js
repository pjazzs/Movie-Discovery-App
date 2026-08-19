import {
    getPosterUrl
} from "./api.js";

import {
    isFavorite
} from "./favorites.js";


// ================================
// DOM ELEMENTS
// ================================

const movieGrid =
    document.getElementById(
        "movieGrid"
    );


const favoritesCount =
    document.getElementById(
        "favoritesCount"
    );


const favoritesInfo =
    document.getElementById(
        "favoritesInfo"
    );


const favoritesEmpty =
    document.getElementById(
        "favoritesEmpty"
    );


const favoritesGrid =
    document.getElementById(
        "favoritesGrid"
    );


const toast =
    document.getElementById(
        "toast"
    );


const toastMessage =
    document.getElementById(
        "toastMessage"
    );


const loading =
    document.getElementById(
        "loading"
    );


const error =
    document.getElementById(
        "error"
    );


const errorMessage =
    document.getElementById(
        "errorMessage"
    );


const emptyState =
    document.getElementById(
        "emptyState"
    );


const resultsInfo =
    document.getElementById(
        "resultsInfo"
    );


const genreSelect =
    document.getElementById(
        "genreSelect"
    );


const movieModal =
    document.getElementById(
        "movieModal"
    );


const movieDetails =
    document.getElementById(
        "movieDetails"
    );


const favoritesSection =
    document.getElementById(
        "favoritesSection"
    );


// ================================
// LOADING
// ================================

export function showLoading() {

    loading.classList.remove(
        "hidden"
    );


    error.classList.add(
        "hidden"
    );


    emptyState.classList.add(
        "hidden"
    );


    movieGrid.classList.remove(
        "hidden"
    );


    movieGrid.innerHTML = "";


    // Create skeleton cards

    for (
        let i = 0;
        i < 10;
        i++
    ) {

        const skeleton =
            document.createElement(
                "div"
            );


        skeleton.className =
            "movie-skeleton";


        skeleton.innerHTML = `

            <div class="skeleton-poster"></div>

            <div class="skeleton-content">

                <div class="skeleton-title"></div>

                <div class="skeleton-meta"></div>

            </div>

        `;


        movieGrid.appendChild(
            skeleton
        );

    }

}


export function hideLoading() {

    loading.classList.add(
        "hidden"
    );


    movieGrid.classList.remove(
        "hidden"
    );

}


// ================================
// ERROR
// ================================

export function showError(
    message
) {

    loading.classList.add(
        "hidden"
    );


    movieGrid.classList.add(
        "hidden"
    );


    emptyState.classList.add(
        "hidden"
    );


    error.classList.remove(
        "hidden"
    );


    errorMessage.textContent =
        message;

}


// ================================
// EMPTY STATE
// ================================

export function showEmptyState() {

    loading.classList.add(
        "hidden"
    );


    error.classList.add(
        "hidden"
    );


    movieGrid.classList.add(
        "hidden"
    );


    emptyState.classList.remove(
        "hidden"
    );


    const message =
        emptyState.querySelector(
            "p"
        );


    if (message) {

        message.textContent =
            "We couldn't find any movies matching your search.";

    }

}


// ================================
// RENDER MOVIES
// ================================

export function renderMovies(
    movies
) {

    movieGrid.innerHTML = "";


    if (
        !movies ||
        movies.length === 0
    ) {

        showEmptyState();

        return;

    }


    error.classList.add(
        "hidden"
    );


    emptyState.classList.add(
        "hidden"
    );


    movieGrid.classList.remove(
        "hidden"
    );


    movies.forEach(
        movie => {

            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "movie-card";


            card.dataset.movieId =
                movie.id;


            // ================================
            // MOVIE INFORMATION
            // ================================

            const releaseYear =
                movie.release_date
                    ? movie.release_date.substring(
                        0,
                        4
                    )
                    : "N/A";


            const rating =
                movie.vote_average
                    ? movie.vote_average.toFixed(
                        1
                    )
                    : "N/A";


            // ================================
            // FAVORITE STATUS
            // ================================

            const favorite =
                isFavorite(
                    movie.id
                );


            const favoriteClass =
                favorite
                    ? "active"
                    : "";


            const favoriteLabel =
                favorite
                    ? "Remove from favorites"
                    : "Add to favorites";


            // ================================
            // CREATE CARD
            // ================================

            card.innerHTML = `

                <button
                    type="button"
                    class="favorite-icon ${favoriteClass}"
                    data-favorite-id="${movie.id}"
                    aria-label="${favoriteLabel}"
                    title="${favoriteLabel}"
                >
                    ♥
                </button>


                <img
                    class="movie-poster"
                    src="${getPosterUrl(
                        movie.poster_path
                    )}"
                    alt="${movie.title}"
                    loading="lazy"
                >


                <div class="movie-info">

                    <h3 class="movie-title">
                        ${movie.title}
                    </h3>


                    <div class="movie-meta">

                        <span>
                            ${releaseYear}
                        </span>


                        <span class="rating">
                            ★ ${rating}
                        </span>

                    </div>

                </div>

            `;


            movieGrid.appendChild(
                card
            );

        }
    );

}


// ================================
// RENDER GENRES
// ================================

export function renderGenres(
    genres
) {

    genreSelect.innerHTML = `

        <option value="">
            All Genres
        </option>

    `;


    genres.forEach(
        genre => {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                genre.id;


            option.textContent =
                genre.name;


            genreSelect.appendChild(
                option
            );

        }
    );

}


// ================================
// RESULTS INFO
// ================================

export function updateResultsInfo(
    totalResults
) {

    resultsInfo.textContent =
        `${totalResults.toLocaleString()} movies found`;

}


// ================================
// PAGINATION
// ================================

export function updatePagination(
    currentPage,
    totalPages
) {

    const prevBtn =
        document.getElementById(
            "prevBtn"
        );


    const nextBtn =
        document.getElementById(
            "nextBtn"
        );


    const pageInfo =
        document.getElementById(
            "pageInfo"
        );


    pageInfo.textContent =
        `Page ${currentPage} of ${totalPages}`;


    prevBtn.disabled =
        currentPage <= 1;


    nextBtn.disabled =
        currentPage >= totalPages;

}



// ================================
// MOVIE DETAILS
// ================================

export function renderMovieDetails(
    movie,
    videos = [],
    similarMovies = []
) {

    // ================================
    // GET VIDEOS FROM MOVIE RESPONSE
    // ================================

    if (
        !videos.length &&
        movie.videos &&
        movie.videos.results
    ) {

        videos =
            movie.videos.results;

    }


    // ================================
    // GET SIMILAR MOVIES FROM RESPONSE
    // ================================

    if (
        !similarMovies.length &&
        movie.similar &&
        movie.similar.results
    ) {

        similarMovies =
            movie.similar.results;

    }


    // ================================
    // POSTER
    // ================================

    const posterUrl =
        getPosterUrl(
            movie.poster_path
        );


    // ================================
    // RELEASE DATE
    // ================================

    const releaseDate =
        movie.release_date ||
        "N/A";


    // ================================
    // RUNTIME
    // ================================

    const runtime =
        movie.runtime
            ? `${movie.runtime} min`
            : "N/A";


    // ================================
    // RATING
    // ================================

    const rating =
        movie.vote_average
            ? movie.vote_average.toFixed(
                1
            )
            : "N/A";


    // ================================
    // GENRES
    // ================================

    const genres =
        movie.genres &&
        movie.genres.length
            ? movie.genres
                .map(
                    genre =>
                        genre.name
                )
                .join(", ")
            : "N/A";


    // ================================
    // FIND TRAILER
    // ================================

    const trailer =
        videos.find(
            video =>
                video.site === "YouTube" &&
                video.type === "Trailer" &&
                video.official === true
        ) ||
        videos.find(
            video =>
                video.site === "YouTube" &&
                video.type === "Trailer"
        ) ||
        null;


    // ================================
    // BACKDROP
    // ================================

    const backdropUrl =
        movie.backdrop_path
            ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
            : "";


    // ================================
    // RENDER DETAILS
    // ================================

    movieDetails.innerHTML = `

        ${
            backdropUrl
                ? `
                    <div
                        class="details-backdrop"
                        style="background-image: url('${backdropUrl}')"
                    ></div>
                `
                : ""
        }


        <div class="details-layout">


            <!-- ================================
                 POSTER
            ================================= -->

            <div class="details-poster">

                <img
                    src="${posterUrl}"
                    alt="${movie.title}"
                >

            </div>


            <!-- ================================
                 CONTENT
            ================================= -->

            <div class="details-content">


                <h2>
                    ${movie.title}
                </h2>


                <!-- META -->

                <div class="details-meta">

                    <span>
                        📅 ${releaseDate}
                    </span>


                    <span>
                        ⭐ ${rating}
                    </span>


                    <span>
                        ⏱ ${runtime}
                    </span>

                </div>


                <!-- GENRES -->

                <p class="details-genres">

                    <strong>
                        Genres:
                    </strong>

                    ${genres}

                </p>


                <!-- OVERVIEW -->

                <div class="details-overview">

                    <h3>
                        Overview
                    </h3>


                    <p>
                        ${
                            movie.overview ||
                            "No overview available."
                        }
                    </p>

                </div>


                <!-- ================================
                     MOVIE INFORMATION
                ================================= -->

                <div class="details-info">

                    <p>

                        <strong>
                            Language:
                        </strong>

                        ${
                            movie.original_language
                                ? movie.original_language.toUpperCase()
                                : "N/A"
                        }

                    </p>


                    <p>

                        <strong>
                            Budget:
                        </strong>

                        ${formatCurrency(
                            movie.budget
                        )}

                    </p>


                    <p>

                        <strong>
                            Revenue:
                        </strong>

                        ${formatCurrency(
                            movie.revenue
                        )}

                    </p>

                </div>


                <!-- ================================
                     TRAILER
                ================================= -->

                ${
                    trailer
                        ? `

                            <div class="movie-trailer">

                                <h3>
                                    Official Trailer
                                </h3>


                                <div class="trailer-container">

                                    <iframe
    src="https://www.youtube.com/embed/${trailer.key}?playsinline=1&rel=0"
    title="${movie.title} Official Trailer"
    frameborder="0"
    loading="lazy"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
></iframe>

                                </div>

                            </div>

                        `
                        : ""
                }


                <!-- ================================
                     ACTIONS
                ================================= -->

                <div class="movie-actions">

                    ${
                        trailer
                            ? `

                                <a
                                    href="https://www.youtube.com/watch?v=${trailer.key}"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="movie-trailer"
                                >
                                    ▶ Watch Trailer
                                </a>

                            `
                            : ""
                    }


                    ${
                        movie.homepage
                            ? `

                                <a
                                    href="${movie.homepage}"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="movie-homepage"
                                >
                                    🌐 Movie Website
                                </a>

                            `
                            : ""
                    }

                </div>


                <!-- ================================
                     SIMILAR MOVIES
                ================================= -->

                ${
                    similarMovies.length > 0
                        ? `

                            <div class="similar-movies">

                                <h3>
                                    You May Also Like
                                </h3>


                                <div class="similar-movies-grid">

                                    ${
                                        similarMovies
                                            .slice(
                                                0,
                                                6
                                            )
                                            .map(
                                                similarMovie => {

                                                    const poster =
                                                        getPosterUrl(
                                                            similarMovie.poster_path
                                                        );


                                                    const similarRating =
                                                        similarMovie.vote_average
                                                            ? similarMovie.vote_average.toFixed(
                                                                1
                                                            )
                                                            : "N/A";


                                                    return `

                                                        <div
                                                            class="similar-movie-card"
                                                            data-movie-id="${similarMovie.id}"
                                                        >

                                                            <img
                                                                src="${poster}"
                                                                alt="${similarMovie.title}"
                                                                loading="lazy"
                                                            >


                                                            <div class="similar-movie-info">

                                                                <h4>
                                                                    ${similarMovie.title}
                                                                </h4>


                                                                <span>
                                                                    ⭐ ${similarRating}
                                                                </span>

                                                            </div>

                                                        </div>

                                                    `;

                                                }
                                            )
                                            .join("")
                                    }

                                </div>

                            </div>

                        `
                        : ""
                }


            </div>

        </div>

    `;

}


// ================================
// FORMAT CURRENCY
// ================================

function formatCurrency(
    amount
) {

    if (!amount) {

        return "N/A";

    }


    return new Intl.NumberFormat(
        "en-US",
        {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0
        }
    ).format(amount);

}


// ================================
// MOVIE DETAILS LOADING
// ================================

export function showMovieDetailsLoading() {

    movieDetails.innerHTML = `

        <div class="details-loading">

            <div class="details-spinner"></div>

            <p>
                Loading movie details...
            </p>

        </div>

    `;

}


// ================================
// MOVIE DETAILS ERROR
// ================================

export function showMovieDetailsError(
    message =
        "Unable to load movie details. Please try again."
) {

    movieDetails.innerHTML = `

        <div class="details-error">

            <h3>
                Something went wrong
            </h3>


            <p>
                ${message}
            </p>

        </div>

    `;

}


// ================================
// OPEN MOVIE MODAL
// ================================

export function openMovieModal() {

    movieModal.classList.remove(
        "hidden"
    );


    document.body.style.overflow =
        "hidden";

}


// ================================
// CLOSE MOVIE MODAL
// ================================

export function closeMovieModal() {

    movieModal.classList.add(
        "hidden"
    );


    document.body.style.overflow =
        "";

}


// ================================
// TOAST NOTIFICATION
// ================================

let toastTimer;


export function showToast(
    message
) {

    clearTimeout(
        toastTimer
    );


    toastMessage.textContent =
        message;


    toast.classList.remove(
        "hidden"
    );


    toastTimer =
        setTimeout(
            () => {

                toast.classList.add(
                    "hidden"
                );

            },
            2500
        );

}


// ================================
// RENDER FAVORITES
// ================================

export function renderFavorites(
    favorites
) {

    // Make sure we have an array

    favorites =
        Array.isArray(favorites)
            ? favorites
            : [];


    // ================================
    // UPDATE FAVORITES COUNT
    // ================================

    if (favoritesCount) {

        favoritesCount.textContent =
            favorites.length;

    }


    // ================================
    // UPDATE FAVORITES INFORMATION
    // ================================

    if (favoritesInfo) {

        const count =
            favorites.length;


        favoritesInfo.textContent =
            count === 0
                ? "You haven't saved any movies yet."
                : `${count} ${
                    count === 1
                        ? "movie"
                        : "movies"
                } saved`;

    }


    // ================================
    // EMPTY FAVORITES
    // ================================

    if (
        favorites.length === 0
    ) {

        favoritesGrid.innerHTML = "";


        favoritesGrid.classList.add(
            "hidden"
        );


        if (favoritesEmpty) {

            favoritesEmpty.classList.remove(
                "hidden"
            );

        }


        return;

    }


    // ================================
    // SHOW FAVORITES
    // ================================

    if (favoritesEmpty) {

        favoritesEmpty.classList.add(
            "hidden"
        );

    }


    favoritesGrid.classList.remove(
        "hidden"
    );


    favoritesGrid.innerHTML = "";


    // ================================
    // CREATE FAVORITE CARDS
    // ================================

    favorites.forEach(
        movie => {

            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "movie-card";


            card.dataset.movieId =
                movie.id;


            const releaseYear =
                movie.release_date
                    ? movie.release_date.substring(
                        0,
                        4
                    )
                    : "N/A";


            const rating =
                movie.vote_average
                    ? movie.vote_average.toFixed(
                        1
                    )
                    : "N/A";


            card.innerHTML = `

                <button
                    type="button"
                    class="favorite-icon active"
                    data-favorite-id="${movie.id}"
                    aria-label="Remove from favorites"
                    title="Remove from favorites"
                >
                    ♥
                </button>


                <img
                    class="movie-poster"
                    src="${getPosterUrl(
                        movie.poster_path
                    )}"
                    alt="${movie.title}"
                    loading="lazy"
                >


                <div class="movie-info">

                    <h3 class="movie-title">
                        ${movie.title}
                    </h3>


                    <div class="movie-meta">

                        <span>
                            ${releaseYear}
                        </span>


                        <span class="rating">
                            ★ ${rating}
                        </span>

                    </div>

                </div>

            `;


            favoritesGrid.appendChild(
                card
            );

        }
    );

}