import React from 'react'

export class Modal extends React.Component {
    constructor(props) {
        super(props)
        this.ref = React.createRef()
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show
    }

    componentWillReceiveProps(nextProps) {
        let { show } = nextProps;
        if (show && !this.props.show) {
            $(this.ref).modal('show')
        } else if (!show && this.props.show) {
            $(this.ref).modal('hide')
        }
    }

    componentDidMount() {
        $(this.ref).on('hidden.bs.modal', this.props.onHide)
    }

    render() {
        return (
            <div className="modal fade" tabIndex="-1" role="dialog"
                ref={(ref) => this.ref = ref}
                aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="modal-title h3 font-weight-bold">{this.props.header}</div>
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