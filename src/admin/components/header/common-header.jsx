import React from 'react'
import { Link } from '../common/link'
import { NigamonIcon } from '../common/nigamon-icon'
import { BaseHeader } from './base-header'

export class CommonHeader extends React.Component {
    renderSearchBox() {
        return (
            <form
                className="form-inline md-form form-sm my-2"
                onSubmit={(e) => {
                    e.preventDefault()
                    this.props.onSearchSubmit(e.target.value)
                }}
            >
                <NigamonIcon name="search" />
                <input
                    className="form-control form-control-sm ml-3 w-75 font-weight-normal text-dark rounded-0"
                    type="text"
                    placeholder="Tim kiem"
                    value={this.props.searchValue}
                    onChange={(e) => {
                        e.preventDefault()
                        this.props.onSearchChange(e.target.value)
                    }}
                />
            </form>
        )
    }

    renderNotificationAndHelp() {
        return (
            <div className="row justify-content-between my-2">
                <div className="col-6">
                    <Link href="#" data-toggle="modal" data-target={this.props.notificationModalId}>
                        <NigamonIcon name="bell" />
                    </Link>
                </div>
                <div className="col-6">
                    <Link href="#" data-toggle="modal" data-target={this.props.helpModalId}>
                        <NigamonIcon name="question-circle" />
                    </Link>
                </div>
            </div>
        )
    }

    render() {
        return (
            <BaseHeader
                title={this.props.title}
                middleChild={this.renderSearchBox()}
                rightChild={this.renderNotificationAndHelp()}
            />
        )
    }
}