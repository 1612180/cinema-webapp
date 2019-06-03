import React from 'react'
import { Link } from '../common/link'

export class BaseHeader extends React.Component {
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
            <div className="d-flex justify-content-between px-5 align-items-center mx-0 py-3 flex-wrap"
                id="content-header-bar">
                <div>
                    <Link href="#" className="text-uppercase my-2">{this.props.title}</Link>
                </div>
                <div>
                    {this.props.middleChild}
                </div>
                {this.renderNotificationAndHelp()}
            </div>
        )
    }
}