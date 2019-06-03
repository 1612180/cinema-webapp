import React from 'react'

export class ClickableView extends React.Component {
    render() {
        return (
            <div onClick={this.props.onClick}>
                {this.props.children}
            </div>
        )
    }
}