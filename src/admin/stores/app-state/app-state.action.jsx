import { actions } from './app-state.type'
import AdminAPI from '../../network/admin-api'

export const loginError = (error) => {
    return {
        type: actions.LOGIN_ERROR,
        error: error
    }
}

export const isLogin = (isLogin) => {
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

export const reload = (reload) => {
    return {
        type: actions.RELOAD,
        reload: reload
    }
}

export const tryLogin = (cb, failCb) => {
    return (dispatch) => {
        return AdminAPI.checkLogin()
            .then(response => {
                if (!response.isLogin) {
                    dispatch(loginError('Chua dang nhap'))
                    dispatch(isLogin(false))
                    if (failCb) {
                        failCb()
                    }
                } else {
                    dispatch(userInfo(response.userInfo))
                    dispatch(isLogin(response.isLogin))
                    cb()
                }
            })
            .catch(err => {
                dispatch(loginError('Loi ket noi'))
                dispatch(isLogin(false))
                if (failCb) {
                    failCb()
                }
            })
    }
}

export const login = (email, password) => {
    return (dispatch) => {
        return AdminAPI.login(email, password)
            .then(response => {
                if (!response.isLogin) {
                    dispatch(loginError('Sai mat khau hoac email'))
                }
                dispatch(userInfo(response.userInfo))
                dispatch(isLogin(response.isLogin))
            })
            .catch(err => {
                dispatch(loginError('Loi ket noi'))
                dispatch(isLogin(false))
            })
    }
}