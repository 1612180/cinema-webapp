import React from 'react'

export class Container extends React.Component {
    render() {
        return (
            <div className={`${this.props.className} section-container my-5`}>
                <header className="section-header">
                    <div className="vertical-line mr-3"></div>
                    <div className="h5 font-weight-bold">{this.props.title}</div>
                </header>
                {this.props.children}
            </div>
        )
    }
}