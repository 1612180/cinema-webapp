import React from 'react'
import { Link } from '../common/link'
import { NigamonIcon } from '../common/nigamon-icon'

export class BaseHeader extends React.Component {
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
                <div>
                    {this.props.rightChild}
                </div>
            </div>
        )
    }
}