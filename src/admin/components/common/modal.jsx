import React from 'react'

export class Modal extends React.Component {
    render() {
        let label = this.props.id + 'Label'
        return (
            <div className="modal fade" id={this.props.id} tabindex="-1" role="dialog" aria-labelledby={label}
                aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="modal-title h3" id={label}>{this.props.header}</div>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {this.props.body}
                        </div>
                        <div className="modal-footer">
                            {this.props.footer}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}