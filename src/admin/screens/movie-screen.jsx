import React from 'react'
import BaseAdminScreen from './base-admin-screen'
import { CommonHeader } from '../components/header/common-header'

export class MovieScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchText: ''
        }

        this.renderHeader = this.renderHeader.bind(this)
        this.renderContent = this.renderContent.bind(this)
    }

    renderHeader() {
        return (
            <CommonHeader title='Phim'
                searchValue={this.state.searchText}
                onSearchChange={(newText) => {
                    this.setState({ searchText: newText })
                    console.log('search changed')
                }}
                onSearchSubmit={() => console.log('search submit')}
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
                requireLogin={true}
                header={this.renderHeader()}
                content={this.renderContent()}
            />
        )
    }
}