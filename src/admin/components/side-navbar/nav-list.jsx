import React from 'react'
import { ClickableView } from '../common/clickable-view'
import { NavOption } from './nav-option'

export class NavList extends React.Component {
    render() {
        let listOptions = this.props.navOptions.map((opt, index) => {
            return (
                <ClickableView
                    key={index}
                    onClick={() => this.props.onItemClick(opt, index)}>
                    <NavOption
                        active={this.props.activeIndex === index}
                        href={opt.href}
                        iconName={opt.iconName}
                        text={opt.text}
                    />
                </ClickableView>
            )
        })
        return (
            <nav className="mx-4 my-4">
                <ul className="menu">
                    {listOptions}
                </ul>
            </nav>

        )
    }
}