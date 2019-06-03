import { actions } from './app-state.type'
import AdminAPI from '../../network/admin-api'

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

export const logOut = () => {
    return {
        type: actions.LOGOUT
    }
}

export const tryLogin = () => {
    return (dispatch, getState) => {
        return AdminAPI.checkLogin()
            .then(response => {
                dispatch(userInfo(response.userInfo))
                dispatch(login(response.isLogin))
            })
            .catch(err => {
                dispatch(login(false))
            })
    }
}