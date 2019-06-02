import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
    render() {
        return (
            <div>
                <h1>Hello Huan</h1>
            </div>
        )
    }
}

let container = document.getElementById('app-container')
ReactDOM.render(<App />, container)