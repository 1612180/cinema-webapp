import { actions } from './app-state.type'

const initialState = {
    isLoading: true,
    isLogin: false,
    userInfo: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.LOADING: {
            return { ...state, isLoading: action.isLoading }
        }
        case actions.IS_LOGIN: {
            return { ...state, isLogin: action.isLogin }
        }
        case actions.SET_USER_INFO: {
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    ...action.info
                }
            }
        }
        default:
            return state
    }
}

export default reducer