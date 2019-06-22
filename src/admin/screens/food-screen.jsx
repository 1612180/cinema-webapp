import React from 'react'
import { connect } from 'react-redux'
import { loadContent, loadFoods, uploadFood, removeFood } from '../stores/foods/foods.action'
import BaseAdminScreen from './base-admin-screen'
import { FullHeader } from '../components/header/full-header'
import { routes } from '../routes';
import { RemoteDataListContainer } from '../components/common/remote-data-list-container'
import { RemoteDropdown, } from '../components/common/dropdown';
import { InlineClickableView, ClickableTableCells } from '../components/common/clickable-view';
import { NigamonIcon } from '../components/common/nigamon-icon';

import { RemoteDataModal, ModalState } from '../components/common/modal';
import { FloatingButton } from '../components/common/floating-button';
import { FormInput, FormSelect } from '../components/common/form';
import { buildErrorTooltip } from '../components/common/error-tooltip';
import { formatMoney } from '../libs/money'

const MIN_INTERVAL = 500

const validationRules = {
    errorElement: 'span',
    rules: {
        foodId: {
            required: true,
            digits: true
        },
        foodName: "required",
        foodPrice: {
            required: true,
            digits: true
        }
    },
    messages: {
        foodId: {
            required: buildErrorTooltip("Vui long dien ma thuc an"),
            digits: buildErrorTooltip("Ma thuc an phai la so nguyen")
        },
        foodName: buildErrorTooltip("Vui long dien ten thuc an"),
        foodPrice: {
            required: buildErrorTooltip("Vui long dien gia thuc an"),
            digits: buildErrorTooltip("Gia thuc an phai la so nguyen")
        }
    }
}
const nullItem = {
    id: null,
    name: null,
    price: null,
    status: null,
}
class FoodScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 1,
            status: 0,
            searchText: '',
            lastUpdate: new Date(),
            modalOpen: false,
            modalState: null,
            formErrors: null,
            newItem: {
                ...nullItem
            }
        }
        this.updateTimeout = null
        this.newForm = React.createRef()

        this.customSetState = this.customSetState.bind(this)

        this.renderHeader = this.renderHeader.bind(this)
        this.renderContent = this.renderContent.bind(this)
        this.renderFloatingButton = this.renderFloatingButton.bind(this)
        this.renderModals = this.renderModals.bind(this)
        this.renderEditForm = this.renderEditForm.bind(this)
        this.renderInfoForm = this.renderInfoForm.bind(this)
        this.renderModalBody = this.renderModalBody.bind(this)

        this.renderFilters = this.renderFilters.bind(this)
        this.renderFoodSection = this.renderFoodSection.bind(this)
        this.openModal = this.openModal.bind(this)

        this.handleStatusChoice = this.handleStatusChoice.bind(this)
        this.handleSearchChange = this.handleSearchChange.bind(this)
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
        this.handlePageRequest = this.handlePageRequest.bind(this)
    }

    validate(cb) {
        return (txt) => {
            $(this.newForm).validate(validationRules);
            $(this.newForm).valid()
            cb(txt)
        }
    }

    openModal(initialState) {
        this.setState({ modalState: initialState, modalOpen: true })
    }

    customSetState(nextState) {
        this.setState({ ...nextState, lastUpdate: new Date() })
    }

    handleStatusChoice(status) {
        this.customSetState({ status: status })
        this.props.loadFoods(this.state.page, {
            status: status,
            searchText: this.state.searchText
        })
    }
    handleSearchChange(txt) {
        this.setState({ searchText: txt })
        if (this.updateTimeout) {
            clearTimeout(this.updateTimeout)
            this.updateTimeout = null
        }
        this.updateTimeout = setTimeout(() => {
            this.props.loadFoods(this.state.page, {
                status: this.state.status,
                searchText: txt
            })
        }, MIN_INTERVAL)
    }
    handleSearchSubmit(txt) {
        this.customSetState({ searchText: txt })
        this.props.loadFoods(this.state.page, {
            status: this.state.status,
            searchText: txt
        })

    }
    handlePageRequest(page) {
        this.customSetState({ page: page })
        this.props.loadFoods(page, {
            status: this.state.status,
            searchText: this.state.searchText
        })
    }

    isStatusLoadFailed() {
        let { statusChoices } = this.props
        let isReady = statusChoices.data === null || (statusChoices.error !== null && statusChoices.error !== undefined)
        return isReady
    }

    renderHeader() {
        return (
            <FullHeader title='Thuc an'
                onSearchChange={this.handleSearchChange}
                onSearchSubmit={this.handleSearchSubmit}
            />
        )
    }

    renderContent() {
        return (
            <React.Fragment>
                {this.renderFilters()}
                {this.renderFoodSection()}
                {this.renderFloatingButton()}
                {this.renderModals()}
            </React.Fragment>
        )
    }

    renderFilters() {
        return (
            <div className="row my-5 mx-0">
                <RemoteDropdown
                    className='col-md-2'
                    padding='px-3'
                    defaultLabel='Tinh trang'
                    onDefaultClick={() => this.handleStatusChoice(0)}
                    data={this.props.statusChoices}
                    onChoiceClick={(c) => this.handleStatusChoice(c.id)}
                />
            </div>
        )
    }

    renderFoodSection() {
        let { foods } = this.props
        let header = (
            <tr>
                <td className="text-center">Ma loai</td>
                <td>Ten thuc an</td>
                <td className="text-right">Gia tien</td>
                <td className="text-center">Tinh trang</td>
            </tr>
        )
        return (
            <RemoteDataListContainer
                otherFailConditions={() => this.isStatusLoadFailed()}
                notRenderUntil={() => !this.props.statusChoices.isLoading}
                remoteData={foods}
                title='Thuc an'
                header={header}
                renderItem={(item) => {
                    let status = this.props.statusChoices.data.filter(c => c.id === item.status)[0]
                    let textColor = status.id === 1 ? 'text-success' : 'text-danger'
                    return (
                        <tr>
                            <ClickableTableCells onClick={() => {
                                this.setState({ newItem: item })
                                this.openModal(ModalState.INFO)
                            }}>
                                <div className="text-center">{item.id}</div>
                                <div>{item.name}</div>
                                <div className="text-right">{formatMoney(item.price) + " VND"}</div>
                                <div className={`text-center ${textColor}`}>{status.label}</div>
                            </ClickableTableCells>
                            <td className="text-right">
                                <InlineClickableView onClick={() => {
                                    this.setState({ newItem: item })
                                    this.openModal(ModalState.EDIT)
                                }}>
                                    <NigamonIcon name='cog' />
                                </InlineClickableView>
                                /
                                <InlineClickableView onClick={() => {
                                    this.setState({ newItem: item })
                                    this.openModal(ModalState.REMOVE)
                                }}>
                                    <NigamonIcon name='times' />
                                </InlineClickableView>
                            </td>
                        </tr>
                    )
                }}
                onRequestPage={this.handlePageRequest}
            />
        )
    }

    renderFloatingButton() {
        if (this.isStatusLoadFailed() || this.props.statusChoices.data.length === 0) {
            return null
        }
        return (
            <FloatingButton
                onClick={() => {
                    this.setState({ newItem: { ...nullItem } })
                    this.openModal(ModalState.NEW)
                }}
                iconName='plus'
            />
        )
    }

    renderModalBody() {
        switch (this.state.modalState) {
            case ModalState.NEW:
                return this.renderEditForm(true)
            case ModalState.EDIT:
                return this.renderEditForm()
            case ModalState.INFO:
                return this.renderInfoForm(false)
            case ModalState.REMOVE:
                return this.renderInfoForm(true)
            default:
                return null
        }
    }

    renderEditForm(addNew) {
        let status = this.props.statusChoices.data
        let { newItem } = this.state
        if (!newItem.status) {
            this.state.newItem.status = status[0].id
        }
        return (
            <form ref={ref => this.newForm = ref}>
                <FormInput label='Ma thuc an' disabled={!addNew} value={newItem.id}
                    name='foodId'
                    onChange={this.validate((text) => {
                        this.setState({ newItem: { ...newItem, id: text } })
                    })} />
                <FormInput label='Ten thuc an' disabled={false} value={newItem.name}
                    name='foodName'
                    onChange={this.validate((text) => {
                        this.setState({ newItem: { ...newItem, name: text } })
                    })} />
                <FormInput label='Gia tien' disabled={false} value={newItem.price}
                    name='foodPrice'
                    onChange={this.validate((text) => {
                        this.setState({ newItem: { ...newItem, price: text } })
                    })} />
                <FormSelect label='Tinh trang' disabled={false} value={!newItem.status ? status[0].id : newItem.status} options={status}
                    onChange={status => this.setState({ newItem: { ...newItem, status: status } })}
                />
            </form>
        )
    }

    renderInfoForm(remove) {
        let status = this.props.statusChoices.data
        let { newItem } = this.state
        return (
            <form ref={ref => this.newForm = ref}>
                <FormInput label='Ma thuc an' disabled={true} value={newItem.id} />
                <FormInput label='Ten thuc an' disabled={true} value={newItem.name} />
                <FormInput label='Gia tien' disabled={true} value={formatMoney(newItem.price) + ' VND'} />
                <FormSelect label='Tinh trang' disabled={true} value={newItem.status} options={status} />
            </form>
        )
    }

    renderModals() {
        return (
            <RemoteDataModal
                initialState={this.state.modalState}
                show={this.state.modalOpen}
                onHide={() => {
                    this.state.modalOpen = false
                    this.setState({
                        modalState: null
                    })
                }}
                body={this.renderModalBody}
                onStateChange={s => this.setState({ modalState: s })}
                editCallback={() => {
                    if ($(this.newForm).valid()) {
                        this.props.uploadFood(this.state.newItem)
                        this.setState({ modalOpen: false })
                    }
                }}
                newCallback={() => {
                    if ($(this.newForm).valid()) {
                        this.props.uploadFood(this.state.newItem, true)
                        this.setState({ modalOpen: false })
                    }
                }}
                removeCallback={() => {
                    if ($(this.newForm).valid()) {
                        this.props.removeFood(this.state.newItem)
                        this.setState({ modalOpen: false })
                    }
                }}
            />
        )
    }

    render() {
        return (
            <BaseAdminScreen
                pathId={routes.FOOD.id}
                requireLogin={true}
                header={this.renderHeader}
                content={this.renderContent}
                callback={() => {
                    this.props.loadContent()
                }}
            />
        )
    }
}

const mapStateToProps = state => {
    return {
        statusChoices: state.foods.statusChoices,
        foods: state.foods.foods
    }
}
const mapDispatchToProps = dispatch => {
    return {
        loadContent: () => dispatch(loadContent()),
        loadFoods: (page, options) => dispatch(loadFoods(page, options)),
        uploadFood: (food, addNew) => dispatch(uploadFood(food, addNew)),
        removeFood: (food) => dispatch(removeFood(food))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FoodScreen)