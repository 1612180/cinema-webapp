import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './stores/configureStore'
import { routes } from './routes'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import DashboardScreen from './screens/dashboard-screen'
import MovieScreen from './screens/movie-screen'

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path={routes.MOVIE.path} component={MovieScreen} />
                    <Route path={routes.THEATER.path} component={() => { }} />
                    <Route path={routes.DASHBOARD.path} component={DashboardScreen} />
                </Switch>
            </BrowserRouter>
        )
    }
}


let container = document.getElementById('app-container')
render((
    <Provider store={store}>
        <App />
    </Provider>
), container)