import React from 'react'

export class Link extends React.Component {
    render() {
        return (
            <a
                href={this.props.href}
                className={`text-decoration-none ${this.props.className}`}
                onClick={e => e.preventDefault()}
                {...this.props}
            >
                {this.props.children}
            </a>
        )
    }
}