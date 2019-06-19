import { actions } from './tickets.type'
import AdminAPI from '../../network/admin-api'

export const loadContent = () => {
    return (dispatch, getState) => {
        dispatch(loadStatusChoices())
        dispatch(loadTickets(1))
    }
}

// movies
const loadingTickets = (loading) => {
    return {
        type: actions.LOADING_TICKETS,
        loading: loading
    }
}
const setTickets = (movies, err) => {
    return {
        type: actions.SET_TICKETS,
        data: movies,
        error: err
    }
}
export const loadTickets = (page, options) => {
    return (dispatch, getState) => {
        dispatch(loadingTickets(true))
        AdminAPI.getTickets(page, options)
            .then(data => {
                if (data.tickets) {
                    dispatch(setTickets(data, null))
                    dispatch(loadingTickets(false))
                } else {
                    dispatch(setTickets(null, 'no tickets found'))
                    dispatch(loadingTickets(false))
                }
            })
            .catch(err => {
                dispatch(setTickets(null, 'request timeout ' + err))
                dispatch(loadingTickets(false))
            })
    }
}

// genre choices 
const loadingStatusChoices = (loading) => {
    return {
        type: actions.LOADING_TICKET_STATUS_CHOICES,
        loading: loading
    }
}
const setStatusChoices = (data, err) => {
    return {
        type: actions.SET_TICKET_STATUS_CHOICES,
        data: data,
        error: err
    }
}
export const loadStatusChoices = () => {
    return (dispatch, getState) => {
        dispatch(loadingStatusChoices(true))
        AdminAPI.getTicketStatusChoices()
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