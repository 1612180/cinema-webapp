import React from 'react'
import { NigamonIcon } from './nigamon-icon';

export class Modal extends React.Component {
    constructor(props) {
        super(props)
        this.ref = React.createRef()
    }

    componentWillReceiveProps(nextProps) {
        let { show } = nextProps;
        if (show) {
            $(this.ref).modal('show')
        } else {
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

export const ModalState = {
    EDIT: 'EDIT',
    NEW: 'NEW',
    INFO: 'INFO',
    REMOVE: 'REMOVE'
}
export class RemoteDataModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modalState: this.props.initialState
        }

        this.renderHeader = this.renderHeader.bind(this)
        this.renderFooterButtons = this.renderFooterButtons.bind(this)
        this.renderFooter = this.renderFooter.bind(this)
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.initialState !== this.state.modalState
            || nextState.modalState !== this.state.modalState
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.initialState !== this.state.modalState) {
            this.setState({ modalState: nextProps.initialState })
        }
    }

    renderFooter() {
        switch (this.state.modalState) {
            case ModalState.NEW:
            case ModalState.EDIT: {
                return this.renderFooterButtons('Luu', () => this.props.saveCallback())
            }
            case ModalState.INFO: {
                return this.renderFooterButtons('Chinh sua', () => this.setState({ modalState: ModalState.EDIT }))
            }
            case ModalState.REMOVE: {
                return this.renderFooterButtons('Xoa', () => console.log('remove'))
            }
            default: {
                return null
            }
        }
    }

    renderFooterButtons(confirmBtnText, callback) {
        return (
            <React.Fragment>
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Huy</button>
                <button type="button" onClick={callback} className="btn btn-primary">{confirmBtnText}</button>
            </React.Fragment>
        )
    }

    renderHeader() {
        switch (this.state.modalState) {
            case ModalState.NEW: {
                return 'Them moi'
            }
            case ModalState.EDIT: {
                return 'Chinh sua'
            }
            case ModalState.INFO: {
                return 'Thong tin'
            }
            case ModalState.REMOVE: {
                return (
                    <div className="text-danger">
                        <NigamonIcon name='exclamation-triangle' className='text-danger' />
                        &nbsp;
                        Xoa
                    </div>
                )
            }
            default: {
                return null
            }
        }
    }

    render() {
        return (
            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
                header={this.renderHeader()}
                footer={this.renderFooter()}
                body={this.props.body}
            />
        )
    }
}