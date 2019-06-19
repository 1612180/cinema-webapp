import { actions } from './movies.type'

const initialState = {
    movies: {
        data: null,
        isLoading: true,
        error: null,
        currentPage: 1,
        lastPage: 1,
        total: 0
    },
    genreChoices: {
        data: null,
        isLoading: true,
        error: null
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.LOADING_MOVIES: {
            return {
                ...state,
                movies: {
                    ...state.movies,
                    isLoading: action.loading
                }
            }
        }
        case actions.LOADING_GENRE_CHOICES: {
            return {
                ...state,
                genreChoices: {
                    ...state.genreChoices,
                    isLoading: action.loading
                }
            }
        }

        case actions.SET_MOVIES: {
            return {
                ...state,
                movies: {
                    ...state.movies,
                    data: action.data ? action.data.movies : null,
                    error: action.error,
                    currentPage: action.data ? action.data.currentPage : 1,
                    lastPage: action.data ? action.data.lastPage : 1,
                    total: action.data ? action.data.total : 1,
                }
            }
        }
        case actions.SET_GENRE_CHOICES: {
            return {
                ...state,
                genreChoices: {
                    ...state.genreChoices,
                    data: action.data ? action.data.choices : null,
                    error: action.error
                }
            }
        }
        default:
            return state
    }
}

export default reducer