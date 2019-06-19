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
const setTheaters = (theaters, err) => {
    return {
        type: actions.SET_THEATERS,
        data: theaters,
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

// show times
const loadingShowTimes = (loading) => {
    return {
        type: actions.LOADING_SHOW_TIMES,
        loading: loading
    }
}
const setShowTimes = (showTimes, err) => {
    return {
        type: actions.SET_SHOW_TIMES,
        data: showTimes,
        error: err
    }
}
export const loadShowTimes = (theater, date, options) => {
    return (dispatch, getState) => {
        dispatch(loadingShowTimes(true))
        AdminAPI.getShowTimes(theater, date, options)
            .then(data => {
                if (data.showTimes) {
                    dispatch(setShowTimes(data, null))
                    dispatch(loadingShowTimes(false))
                } else {
                    dispatch(setShowTimes(null, 'no show times found'))
                    dispatch(loadingShowTimes(false))
                }
            })
            .catch(err => {
                dispatch(setShowTimes(null, 'request timeout ' + err))
                dispatch(loadingShowTimes(false))
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