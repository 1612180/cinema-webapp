import React from 'react'
import { BaseAdminScreen } from './base-admin-screen'
import { CommonHeader } from '../components/header/common-header'

export class MovieScreen extends BaseAdminScreen {
    constructor(props) {
        super(props)
        this.state = {
            searchText: ''
        }
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
    renderPage() {
        return (
            <div>This is movie screen</div>
        )
    }
}