import React from 'react'
import { NavLink } from 'react-router-dom'

export class Link extends React.Component {
    render() {
        return (
            <NavLink
                to={this.props.href}
                className={`text-decoration-none ${this.props.className}`}
                {...this.props}
            >
                {this.props.children}
            </NavLink>
        )
    }
}