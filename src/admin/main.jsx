import React from 'react'
import { render } from 'react-dom'
import { Provider, connect } from 'react-redux'
import { store } from './stores/configureStore'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { DashboardScreen } from './screens/dashboard-screen'
import { MovieScreen } from './screens/movie-screen'

class App extends React.Component {
    render() {
        return (
            <Router>
                <Route exact path="/v2/admin" component={DashboardScreen} />
                <Route path="/v2/admin/movie" component={MovieScreen} />
            </Router>
        )
    }
}


let container = document.getElementById('app-container')
render((
    <Provider store={store}>
        <App />
    </Provider>
), container)