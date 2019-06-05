import React from 'react'
import BaseAdminScreen from './base-admin-screen'
import { FullHeader } from '../components/header/full-header'
import { routes } from '../routes';

export class MovieScreen extends React.Component {
    constructor(props) {
        super(props)

        this.renderHeader = this.renderHeader.bind(this)
        this.renderContent = this.renderContent.bind(this)
    }

    renderHeader() {
        return (
            <FullHeader title='Phim'
                onSearchChange={(newText) => { console.log(newText) }}
                onSearchSubmit={(text) => console.log(text)}
            />
        )
    }

    renderContent() {
        return (
            <div>This is movie screen</div>
        )
    }

    render() {
        return (
            <BaseAdminScreen
                pathId={routes.MOVIE.id}
                requireLogin={true}
                header={this.renderHeader()}
                content={this.renderContent()}
            />
        )
    }
}