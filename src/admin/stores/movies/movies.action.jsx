import { actions } from './movies.type'
import AdminAPI from '../../network/admin-api'
import Swal from 'sweetalert2'
import { codes } from '../../network/message-codes';

export const loadContent = () => {
    return (dispatch, getState) => {
        dispatch(loadMovies(1))
        dispatch(loadGenreChoices())
    }
}

// movies
const loadingMovies = (loading) => {
    return {
        type: actions.LOADING_MOVIES,
        loading: loading
    }
}
const setMovies = (movies, err) => {
    return {
        type: actions.SET_MOVIES,
        data: movies,
        error: err
    }
}
export const loadMovies = (page, options) => {
    return (dispatch, getState) => {
        dispatch(loadingMovies(true))
        AdminAPI.getMovies(page, options)
            .then(data => {
                if (data.movies) {
                    dispatch(setMovies(data, null))
                    dispatch(loadingMovies(false))
                } else {
                    dispatch(setMovies(null, 'no movies found'))
                    dispatch(loadingMovies(false))
                }
            })
            .catch(err => {
                dispatch(setMovies(null, 'request timeout ' + err))
                dispatch(loadingMovies(false))
            })
    }
}
export const uploadMovie = (movie, addNew) => {
    return (dispatch, getState) => {
        AdminAPI.uploadMovie(movie, addNew)
            .then(data => {
                switch (data.code) {
                    case codes.OK:
                        return Swal.fire({
                            title: 'Thanh cong',
                            type: 'success',
                        }).then(() => {
                            dispatch(loadMovies(1))
                        })
                    case codes.FAILED:
                        return Swal.fire({
                            title: 'Loi',
                            type: 'error',
                        }).then(() => { })
                }
            })
    }
}
export const removeMovie = (movie) => {
    return (dispatch, getState) => {
        AdminAPI.removeMovie(movie)
            .then(data => {
                switch (data.code) {
                    case codes.OK:
                        return Swal.fire({
                            title: 'Thanh cong',
                            type: 'success',
                        }).then(() => {
                            dispatch(loadMovies(1))
                        })
                    case codes.FAILED:
                        return Swal.fire({
                            title: 'Loi',
                            type: 'error',
                        }).then(() => { })
                }
            })
    }
}

// genre choices 
const loadingGenreChoices = (loading) => {
    return {
        type: actions.LOADING_GENRE_CHOICES,
        loading: loading
    }
}
const setGenreChoices = (data, err) => {
    return {
        type: actions.SET_GENRE_CHOICES,
        data: data,
        error: err
    }
}
export const loadGenreChoices = () => {
    return (dispatch, getState) => {
        dispatch(loadingGenreChoices(true))
        AdminAPI.getGenreChoices()
            .then(data => {
                if (data.choices) {
                    dispatch(setGenreChoices(data, null))
                    dispatch(loadingGenreChoices(false))
                } else {
                    dispatch(setGenreChoices(null, 'no choices found'))
                    dispatch(loadingGenreChoices(false))
                }
            })
            .catch(err => {
                dispatch(setGenreChoices(null, 'request timeout ' + err))
                dispatch(loadingGenreChoices(false))
            })
    }
}