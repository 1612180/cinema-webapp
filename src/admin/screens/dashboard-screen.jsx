import React from 'react'
import BaseAdminScreen from './base-admin-screen'
import { BaseHeader } from '../components/header/base-header';

export class DashboardScreen extends React.Component {
    constructor(props) {
        super(props)

        this.renderHeader = this.renderHeader.bind(this)
        this.renderContent = this.renderContent.bind(this)
    }

    renderHeader() {
        return (
            <BaseHeader
                title="Trang chinh"
            />
        )
    }

    renderContent() {
        return (
            <div>This is dashboard</div>
        )
    }

    render() {
        return (
            <BaseAdminScreen
                requireLogin={true}
                header={this.renderHeader()}
                content={this.renderContent()}
            />
        )
    }
}