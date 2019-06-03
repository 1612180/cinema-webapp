import React from 'react'
import { render } from 'react-dom'
import { Provider, connect } from 'react-redux'
import { store } from './stores/configureStore'

import { tryLogin } from './stores/app-state/app-state.action'

import { Spinner } from './components/common/spinner'
import IsLoginRoute from './routes/is-login-route'
import { NeedLoginRoute } from './routes/need-login-route'

class App extends React.Component {
    componentWillMount() {
        this.props.tryLogin()
    }

    render() {
        let { isLoading, isLogin } = this.props.appState
        if (isLoading) {
            return (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        minHeight: '100vh',
                        alignItems: 'center'
                    }}
                >
                    <Spinner size="5rem" />
                </div>
            )
        } else if (!isLogin) {
            return <NeedLoginRoute />
        } else {
            return <IsLoginRoute />
        }
    }
}

const mapStateToProps = state => {
    return {
        appState: state.appState
    }
}

const mapDispatchToProps = dispatch => {
    return {
        tryLogin: () => dispatch(tryLogin())
    }
}

let FinalApp = connect(mapStateToProps, mapDispatchToProps)(App)

let container = document.getElementById('app-container')
render((
    <Provider store={store}>
        <FinalApp />
    </Provider>
), container)