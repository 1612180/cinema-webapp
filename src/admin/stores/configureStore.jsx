import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import sideNavbarReducer from './side-navbar/side-navbar.reducer'
import appStateReducer from './app-state/app-state.reducer'

const rootReducer = combineReducers({
    sideNavbar: sideNavbarReducer,
    appState: appStateReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))