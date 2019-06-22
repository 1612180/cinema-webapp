import { actions } from './foods.type'
import AdminAPI from '../../network/admin-api'
import { codes } from '../../network/message-codes'
import Swal from 'sweetalert2'

export const loadContent = () => {
    return (dispatch, getState) => {
        dispatch(loadStatusChoices())
        dispatch(loadFoods(1))
    }
}

// movies
const loadingFoods = (loading) => {
    return {
        type: actions.LOADING_FOODS,
        loading: loading
    }
}
const setFoods = (movies, err) => {
    return {
        type: actions.SET_FOODS,
        data: movies,
        error: err
    }
}
export const loadFoods = (page, options) => {
    return (dispatch, getState) => {
        dispatch(loadingFoods(true))
        AdminAPI.getFoods(page, options)
            .then(data => {
                if (data.foods) {
                    dispatch(setFoods(data, null))
                    dispatch(loadingFoods(false))
                } else {
                    dispatch(setFoods(null, 'no foods found'))
                    dispatch(loadingFoods(false))
                }
            })
            .catch(err => {
                dispatch(setFoods(null, 'request timeout ' + err))
                dispatch(loadingFoods(false))
            })
    }
}
export const uploadFood = (food, addNew) => {
    return (dispatch, getState) => {
        AdminAPI.uploadFood(food, addNew)
            .then(data => {
                switch (data.code) {
                    case codes.OK:
                        return Swal.fire({
                            title: 'Thanh cong',
                            type: 'success',
                        }).then(() => {
                            dispatch(loadFoods(1))
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
export const removeFood = (food) => {
    return (dispatch, getState) => {
        AdminAPI.removeFood(food)
            .then(data => {
                switch (data.code) {
                    case codes.OK:
                        return Swal.fire({
                            title: 'Thanh cong',
                            type: 'success',
                        }).then(() => {
                            dispatch(loadFoods(1))
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
const loadingStatusChoices = (loading) => {
    return {
        type: actions.LOADING_FOOD_STATUS_CHOICES,
        loading: loading
    }
}
const setStatusChoices = (data, err) => {
    return {
        type: actions.SET_FOOD_STATUS_CHOICES,
        data: data,
        error: err
    }
}
export const loadStatusChoices = () => {
    return (dispatch, getState) => {
        dispatch(loadingStatusChoices(true))
        AdminAPI.getFoodStatusChoices()
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