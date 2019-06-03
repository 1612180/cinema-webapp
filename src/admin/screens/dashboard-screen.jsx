import React from 'react'
import { BaseAdminScreen } from './base-admin-screen'
import { BaseHeader } from '../components/header/base-header'

export class DashboardScreen extends BaseAdminScreen {
    renderPage() {
        return (
            <div>This is dashboard</div>
        )
    }
}