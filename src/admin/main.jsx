import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './stores/configureStore'
import { routes } from './routes'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import DashboardScreen from './screens/dashboard-screen'
import MovieScreen from './screens/movie-screen'
import TheaterScreen from './screens/theater-screen'
import TicketScreen from './screens/ticket-screen'
import FoodScreen from './screens/food-screen'
import OrderScreen from './screens/order-screen'
import LoginScreen from './screens/login-screen';
import ResetPasswordScreen from './screens/reset-password-screen';

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path={routes.RESET_PASSWORD.path} component={ResetPasswordScreen} />
                    <Route path={routes.LOGIN.path} component={LoginScreen} />
                    <Route path={routes.ORDER.path} component={OrderScreen} />
                    <Route path={routes.FOOD.path} component={FoodScreen} />
                    <Route path={routes.TICKET.path} component={TicketScreen} />
                    <Route path={routes.MOVIE.path} component={MovieScreen} />
                    <Route path={routes.THEATER.path} component={TheaterScreen} />
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