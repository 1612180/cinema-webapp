import React from 'react'

export class Spinner extends React.Component {
    render() {
        return (
            <div
                className="spinner-border text-primary"
                role="status"
                style={{ width: this.props.size, height: this.props.size, ...this.props.style }}
            >
                <span className="sr-only">Loading...</span>
            </div>
        )
    }
}