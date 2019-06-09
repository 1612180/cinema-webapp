import { actions } from './theaters.type'
import AdminAPI from '../../network/admin-api'

export const loadContent = () => {
    return (dispatch, getState) => {
        dispatch(loadStatusChoices())
        dispatch(loadTheaters(1))
    }
}

// movies
const loadingTheaters = (loading) => {
    return {
        type: actions.LOADING_THEATERS,
        loading: loading
    }
}
const setTheaters = (movies, err) => {
    return {
        type: actions.SET_THEATERS,
        data: movies,
        error: err
    }
}
export const loadTheaters = (page, options) => {
    return (dispatch, getState) => {
        dispatch(loadingTheaters(true))
        AdminAPI.getTheaters(page, options)
            .then(data => {
                if (data.theaters) {
                    dispatch(setTheaters(data, null))
                    dispatch(loadingTheaters(false))
                } else {
                    dispatch(setTheaters(null, 'no theaters found'))
                    dispatch(loadingTheaters(false))
                }
            })
            .catch(err => {
                dispatch(setTheaters(null, 'request timeout ' + err))
                dispatch(loadingTheaters(false))
            })
    }
}

// genre choices 
const loadingStatusChoices = (loading) => {
    return {
        type: actions.LOADING_THEATER_STATUS_CHOICES,
        loading: loading
    }
}
const setStatusChoices = (data, err) => {
    return {
        type: actions.SET_THEATER_STATUS_CHOICES,
        data: data,
        error: err
    }
}
export const loadStatusChoices = () => {
    return (dispatch, getState) => {
        dispatch(loadingStatusChoices(true))
        AdminAPI.getTheaterStatusChoices()
            .then(data => {
                if (data.choices) {
                    dispatch(setStatusChoices(data, null))
                    dispatch(loadingStatusChoices(false))
                } else {
                    dispatch(setStatusChoices(null, 'no choices found'))
                    dispatch(loadingStatusChoices(false))
                }
            })
            .catch(err => {
                dispatch(setStatusChoices(null, 'request timeout ' + err))
                dispatch(loadingStatusChoices(false))
            })
    }
}