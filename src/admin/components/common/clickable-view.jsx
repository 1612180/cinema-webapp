import React from 'react'

export class ClickableView extends React.Component {
    render() {
        return (
            <div className={`m-0 ${this.props.className}`} onClick={this.props.onClick}>
                {this.props.children}
            </div>
        )
    }
}