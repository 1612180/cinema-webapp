import { actions } from './app-state.type'
import AdminAPI from '../../network/admin-api'

export const loading = (isLoading) => {
    return {
        type: actions.LOADING,
        isLoading: isLoading
    }
}

export const login = (isLogin) => {
    return {
        type: actions.IS_LOGIN,
        isLogin: isLogin
    }
}

export const userInfo = (info) => {
    return {
        type: actions.SET_USER_INFO,
        info: info
    }
}

export const tryLogin = () => {
    return (dispatch, getState) => {
        dispatch(loading(true))

        return AdminAPI.checkLogin()
            .then(response => {
                dispatch(login(response.isLogin))
                dispatch(userInfo(response.userInfo))
                dispatch(loading(false))
            })
            .catch(err => {
                dispatch(login(false))
                dispatch(loading(false))
            })
    }
}