import React from 'react'
import { connect } from 'react-redux'
import BaseAdminScreen from './base-admin-screen'
import { FullHeader } from '../components/header/full-header'
import { routes } from '../routes';
import { RemoteDataListContainer } from '../components/common/remote-data-list-container'
import { RemoteDropdown, Dropdown } from '../components/common/dropdown';
import { loadTheaterChoices } from '../stores/dashboard/dashboard.action'
import { loadContent, loadOrders } from '../stores/orders/orders.action'
import { loadFoods } from '../stores/foods/foods.action'
import { InlineClickableView, ClickableTableCells } from '../components/common/clickable-view';
import { NigamonIcon } from '../components/common/nigamon-icon';

import { RemoteDataModal, ModalState, Modal } from '../components/common/modal';
import { FloatingButton } from '../components/common/floating-button';
import { FormInput, FormSelect, FormDateTimePicker } from '../components/common/form';
import { formatDate, formatTime } from '../libs/datetime'
import { formatMoney } from '../libs/money'
import { buildErrorTooltip } from '../components/common/error-tooltip';
import { OrderDatePicker } from '../components/order/order-datepicker';
import { OrderPriceRangePicker } from '../components/order/order-price-range-picker';
import { ListContainer } from '../components/common/list-container';
import { Button } from '../components/common/button';
import OrderFoodList from '../components/order/order-food-list';

const MIN_INTERVAL = 500

const validationRules = {
    errorElement: 'span',
    rules: {
        orderId: {
            required: true,
            digits: true
        },
        orderUsername: "required",
        orderDatetime: "required",
        orderTotal: "required"
    },
    messages: {
        orderId: {
            required: buildErrorTooltip("Vui long dien ma don hang"),
            digits: buildErrorTooltip("Ma don hang phai la so nguyen")
        },
        orderUsername: buildErrorTooltip("Vui long dien ten khach hang"),
        orderDatetime: buildErrorTooltip("Vui long dien thoi gian"),
        orderTotal: buildErrorTooltip("Gio hang khong duoc rong")
    }
}
const orderItemValidationRules = {
    errorElement: 'span',
    rules: {
        orderItemQuantity: {
            required: true,
            digits: true
        }
    },
    messages: {
        orderItemQuantity: {
            required: buildErrorTooltip("Vui long dien so luong"),
            digits: buildErrorTooltip("So luong phai la so nguyen")
        }
    }
}

const nullItem = {
    id: null,
    username: null,
    datetime: null,
    theater: null,
    tickets: [],
    foods: [],
    status: null,
}
class OrderScreen extends React.Component {
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
        this.itemListForm = React.createRef()

        this.customSetState = this.customSetState.bind(this)

        this.renderHeader = this.renderHeader.bind(this)
        this.renderContent = this.renderContent.bind(this)
        this.renderFloatingButton = this.renderFloatingButton.bind(this)
        this.renderModals = this.renderModals.bind(this)
        this.renderEditForm = this.renderEditForm.bind(this)
        this.renderInfoForm = this.renderInfoForm.bind(this)
        this.renderModalBody = this.renderModalBody.bind(this)

        this.renderFilters = this.renderFilters.bind(this)
        this.renderMoviesSection = this.renderOrdersSection.bind(this)
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

    validateFormWithRules(formRef, rules, cb) {
        return (txt) => {
            $(formRef).validate(rules);
            $(formRef).valid()
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
        this.props.loadOrders(this.state.page, {
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
            this.props.loadOrders(this.state.page, {
                status: this.state.status,
                searchText: txt
            })
        }, MIN_INTERVAL)
    }
    handleSearchSubmit(txt) {
        this.customSetState({ searchText: txt })
        this.props.loadOrders(this.state.page, {
            status: this.state.status,
            searchText: txt
        })

    }
    handlePageRequest(page) {
        this.customSetState({ page: page })
        this.props.loadOrders(page, {
            status: this.state.status,
            searchText: this.state.searchText
        })
    }

    isDependenciesLoadFailed() {
        let { statusChoices, theaterChoices, foods } = this.props
        let failedStatus = statusChoices.data === null || (statusChoices.error !== null && statusChoices.error !== undefined)
        let failedTheater = theaterChoices.data === null || (theaterChoices.error !== null && theaterChoices.error !== undefined)
        let failedFood = foods.data === null || (foods.error !== null && foods.error !== undefined)
        return failedStatus || failedTheater || failedFood
    }
    isDependenciesLoading() {
        return this.props.statusChoices.isLoading
            || this.props.theaterChoices.isLoading
            || this.props.foods.isLoading
    }

    renderHeader() {
        return (
            <FullHeader title='Don hang'
                onSearchChange={this.handleSearchChange}
                onSearchSubmit={this.handleSearchSubmit}
            />
        )
    }

    renderContent() {
        return (
            <React.Fragment>
                {this.renderFilters()}
                {this.renderOrdersSection()}
                {this.renderFloatingButton()}
                {this.renderModals()}
            </React.Fragment>
        )
    }

    renderFilters() {
        return (
            <div className="row my-5 mx-0 align-items-center">
                <OrderDatePicker
                    className='col-lg-4'
                    start={null}
                    end={null}
                    onChange={(s, e) => console.log(s, e)}
                />
                <div className="col-lg-7 ml-auto px-0 align-items-center">
                    <div className="row mx-0">
                        <RemoteDropdown
                            className='col-lg-5 my-3'
                            padding='px-3'
                            defaultLabel='Tinh trang'
                            onDefaultClick={() => this.handleStatusChoice(0)}
                            data={this.props.statusChoices}
                            onChoiceClick={(c) => this.handleStatusChoice(c.id)}
                        />
                        <RemoteDropdown
                            className='col-lg-7 my-3'
                            padding='px-3'
                            defaultLabel='Tat ca rap'
                            onDefaultClick={() => null}
                            data={this.props.theaterChoices}
                            onChoiceClick={(c) => null}
                        />
                    </div>
                    <div className="row h6 m-0">
                        <OrderPriceRangePicker
                            className='mt-2'
                            min={0}
                            max={1000000}
                            step={100000}
                            onChange={(s, e) => console.log(s, e)}
                        />
                    </div>
                </div>
            </div>
        )
    }

    renderOrdersSection() {
        let { orders } = this.props
        let header = (
            <tr>
                <td className="text-center">Ma don</td>
                <td>Nguoi dung</td>
                <td className="text-center">Ngay</td>
                <td className="text-center">Gio</td>
                <td>Rap</td>
                <td className="text-right">Tong tien</td>
                <td className="text-center">Tinh trang</td>
            </tr>
        )
        return (
            <RemoteDataListContainer
                otherFailConditions={() => this.isDependenciesLoadFailed()}
                notRenderUntil={() => !this.isDependenciesLoading()}
                remoteData={orders}
                title='Don hang'
                header={header}
                renderItem={(item) => {
                    let status = this.props.statusChoices.data.filter(c => c.id === item.status)[0]
                    let theater = this.props.theaterChoices.data.filter(c => c.id === item.theater)[0]
                    let textColor = 'text-success'
                    if (status.id === 2) {
                        textColor = 'text-warning'
                    } else if (status.id === 3) {
                        textColor = 'text-danger'
                    }
                    let totalFoods = item.foods.map(c => this.props.foods.data.find(v => v.id === c.id).price * c.quantity)
                        .reduce((prev, cur) => prev + cur)
                    return (
                        <tr>
                            <ClickableTableCells onClick={() => {
                                this.setState({ newItem: item })
                                this.openModal(ModalState.INFO)
                            }}>
                                <div className="text-center">{item.id}</div>
                                <div>{item.username}</div>
                                <div className="text-center">{formatDate(item.datetime)}</div>
                                <div className="text-center">{formatTime(item.datetime)}</div>
                                <div>{theater.label}</div>
                                <div className="text-right">{formatMoney(totalFoods) + ' VND'}</div>
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
                                <InlineClickableView onClick={() => this.openModal(ModalState.REMOVE)}>
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
        let theaters = this.props.theaterChoices.data
        let { newItem } = this.state
        let totalFoods = newItem.foods.map(c => this.props.foods.data.find(v => v.id === c.id).price * c.quantity)
            .reduce((prev, cur) => prev + cur)
        return (
            <form ref={ref => this.newForm = ref}>
                <FormInput label='Ma don hang' disabled={!addNew} value={newItem.id}
                    name='orderId'
                    onChange={this.validate((text) => {
                        this.setState({ newItem: { ...newItem, id: text } })
                    })} />
                <FormInput label='Nguoi dung' disabled={false} value={newItem.username}
                    name='orderUsername'
                    onChange={this.validate((text) => {
                        this.setState({ newItem: { ...newItem, username: text } })
                    })} />
                <FormDateTimePicker label='Thoi gian' disabled={false} value={this.state.newItem.datetime}
                    width={300}
                    min={() => new Date('2000/01/01')}
                    max={() => new Date()}
                    onChange={(date) => this.setState({ newItem: { ...newItem, datetime: date } })} />
                <FormSelect label='Rap' disabled={false} value={addNew ? theaters[0].id : newItem.theater} options={theaters}
                    onChange={status => this.setState({ newItem: { ...newItem, status: status } })}
                />
                <ListContainer
                    className='mt-5 mb-3'
                    minHeight={200}
                    static={true}
                    title="Ve phim"
                    header={null}
                    items={addNew ? [] : newItem.tickets}
                    currentPage={1}
                    lastPage={1}
                    onPaginationClick={(page) => null}
                    renderItem={() => null}
                />
                <div className='d-flex justify-content-center'>
                    <Button active={true}
                        label="Them ve phim"
                        onClick={() => null}
                    />
                </div>
                <OrderFoodList items={addNew ? [] : newItem.foods} disabled={false} />
                <FormInput label='Tong cong' disabled={true} value={formatMoney(totalFoods) + ' VND'} />
                <FormSelect label='Tinh trang' disabled={false} value={addNew ? status[0].id : newItem.status} options={status}
                    onChange={status => this.setState({ newItem: { ...newItem, status: status } })}
                />
            </form>
        )
    }

    renderInfoForm(remove) {
        let status = this.props.statusChoices.data
        let theaters = this.props.theaterChoices.data
        let { newItem } = this.state
        let totalFoods = newItem.foods.map(c => this.props.foods.data.find(v => v.id === c.id).price * c.quantity)
            .reduce((prev, cur) => prev + cur)
        return (
            <form ref={ref => this.newForm = ref}>
                <FormInput label='Ma don hang' disabled={true} value={newItem.id} />
                <FormInput label='Nguoi dung' disabled={true} value={newItem.username} />
                <FormDateTimePicker label='Thoi gian' disabled={true} value={this.state.newItem.datetime} />
                <FormSelect label='Rap' disabled={true} value={newItem.theater} options={theaters} />
                <ListContainer
                    minHeight={200}
                    static={true}
                    title="Ve phim"
                    header={null}
                    items={newItem.tickets}
                    currentPage={1}
                    lastPage={1}
                    onPaginationClick={(page) => null}
                    renderItem={() => null}
                />
                <OrderFoodList items={newItem.foods} disabled={true} />
                <FormInput label='Tong cong' disabled={true} value={formatMoney(totalFoods) + ' VND'} />
                <FormSelect label='Tinh trang' disabled={true} value={newItem.status} options={status} />
            </form>
        )
    }

    renderModals() {
        return (
            <RemoteDataModal
                large={true}
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
            />
        )
    }

    render() {
        return (
            <BaseAdminScreen
                pathId={routes.ORDER.id}
                requireLogin={true}
                header={this.renderHeader}
                content={this.renderContent}
                callback={() => {
                    this.props.loadContent()
                    this.props.loadTheaterChoices()
                    this.props.loadAvailableFoods()
                }}
            />
        )
    }
}

const mapStateToProps = state => {
    return {
        orders: state.orders.orders,
        theaterChoices: state.dashboard.theaterChoices,
        statusChoices: state.orders.statusChoices,
        foods: state.foods.foods,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        loadContent: () => dispatch(loadContent()),
        loadOrders: (page, options) => dispatch(loadOrders(page, options)),
        loadTheaterChoices: () => dispatch(loadTheaterChoices()),
        loadAvailableFoods: () => dispatch(loadFoods(0))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderScreen)