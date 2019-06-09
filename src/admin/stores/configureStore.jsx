import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import sideNavbarReducer from './side-navbar/side-navbar.reducer'
import appStateReducer from './app-state/app-state.reducer'
import dashboardReducer from './dashboard/dashboard.reducer'
import moviesReducer from './movies/movies.reducer'
import theatersReducer from './theaters/theaters.reducer'
import ticketsReducer from './tickets/tickets.reducer'

const rootReducer = combineReducers({
    sideNavbar: sideNavbarReducer,
    appState: appStateReducer,
    dashboard: dashboardReducer,
    movies: moviesReducer,
    theaters: theatersReducer,
    tickets: ticketsReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))