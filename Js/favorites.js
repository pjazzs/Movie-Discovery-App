const FAVORITES_KEY = "moviehub_favorites";



// ================================
// GET FAVORITES
// ================================

export function getFavorites() {

    const favorites =
        localStorage.getItem(
            FAVORITES_KEY
        );

    return favorites
        ? JSON.parse(favorites)
        : [];

}



// ================================
// SAVE FAVORITES
// ================================

export function saveFavorites(
    favorites
) {

    localStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(favorites)
    );

}



// ================================
// CHECK IF FAVORITE
// ================================

export function isFavorite(
    movieId
) {

    const favorites =
        getFavorites();

    return favorites.some(
        movie =>
            movie.id === Number(movieId)
    );

}



// ================================
// ADD FAVORITE
// ================================

export function addFavorite(
    movie
) {

    const favorites =
        getFavorites();


    const alreadyExists =
        favorites.some(
            item =>
                item.id === movie.id
        );


    if (alreadyExists) {
        return;
    }


    favorites.push(movie);

    saveFavorites(
        favorites
    );

}



// ================================
// REMOVE FAVORITE
// ================================

export function removeFavorite(
    movieId
) {

    const favorites =
        getFavorites();


    const updatedFavorites =
        favorites.filter(
            movie =>
                movie.id !== Number(movieId)
        );


    saveFavorites(
        updatedFavorites
    );

}