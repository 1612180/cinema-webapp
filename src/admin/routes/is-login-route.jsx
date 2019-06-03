import React from 'react'
import { connect } from 'react-redux'

import { DashboardScreen } from '../screens/dashboard-screen'
import { MovieScreen } from '../screens/movie-screen'

const routes = {
    dashboard: <DashboardScreen />,
    movie: <MovieScreen />
}

class IsLoginRoute extends React.Component {
    render() {
        return routes[this.props.currentRoute]
    }
}

const mapStateToProps = state => {
    let { navList } = state.sideNavbar
    return {
        currentRoute: navList.navOptions[navList.activeIndex].href
    }
}
const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IsLoginRoute)