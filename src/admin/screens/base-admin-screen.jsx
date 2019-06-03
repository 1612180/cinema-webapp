import React from 'react'

import SideNavbar from '../components/side-navbar/side-navbar'
import { BaseHeader } from '../components/header/base-header'

export class BaseAdminScreen extends React.Component {
    renderHeader() {
        return (
            <BaseHeader
                title={this.props.title}
                notificationModalId='#notificationModal'
                helpModalId='#helpModal'
            />
        )
    }

    renderPage() {
        return null
    }

    render() {
        return (
            <div className="container-fluid h-100">
                <div className="row h-100 align-items-stretch">
                    <SideNavbar />
                    <div className="col-lg-10 px-0">
                        {this.renderHeader()}
                        {this.renderPage()}
                    </div>
                </div>
            </div>
        )
    }
}