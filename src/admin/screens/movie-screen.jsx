import React from 'react'
import { connect } from 'react-redux'
import BaseAdminScreen from './base-admin-screen'
import { FullHeader } from '../components/header/full-header'
import { routes } from '../routes';
import { RemoteDataListContainer } from '../components/common/remote-data-list-container'
import { RemoteDropdown, Dropdown } from '../components/common/dropdown';
import { loadContent, loadMovies } from '../stores/movies/movies.action'
import { InlineClickableView, ClickableTableCells } from '../components/common/clickable-view';
import { NigamonIcon } from '../components/common/nigamon-icon';

import { isComing, isInside, isPassed, formatDate } from '../libs/datetime'
import { RemoteDataModal, ModalState, Modal } from '../components/common/modal';
import { FloatingButton } from '../components/common/floating-button';
import { FormInput, FormSelect, FormDatePicker } from '../components/common/form';

function getMovieStatus(start, end) {
    let today = new Date()
    if (isComing(today, start, end)) {
        return {
            text: 'Sap chieu',
            color: 'text-warning'
        }
    }
    if (isInside(today, start, end)) {
        return {
            text: 'Dang chieu',
            color: 'text-success'
        }
    }
    if (isPassed(today, start, end)) {
        return {
            text: 'Ngung chieu',
            color: 'text-danger'
        }
    }
    return {
        text: 'Unknown',
        color: 'text-secondary'
    }
}
const MIN_INTERVAL = 500

class MovieScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 1,
            genre: 0,
            status: 'all',
            searchText: '',
            lastUpdate: new Date(),
            modalOpen: false,
            modalState: null,
            formErrors: null,
            newItem: {
                id: 1,
                name: '',
                type: null,
                director: '',
                actor: '',
                length: 0,
                start: null,
                end: null,
            }
        }
        this.updateTimeout = null

        this.customSetState = this.customSetState.bind(this)

        this.renderHeader = this.renderHeader.bind(this)
        this.renderContent = this.renderContent.bind(this)
        this.renderFloatingButton = this.renderFloatingButton.bind(this)
        this.renderModals = this.renderModals.bind(this)
        this.renderNewForm = this.renderNewForm.bind(this)
        this.renderBody = this.renderBody.bind(this)

        this.renderFilters = this.renderFilters.bind(this)
        this.renderMoviesSection = this.renderMoviesSection.bind(this)
        this.openModal = this.openModal.bind(this)

        this.handleGenreChoice = this.handleGenreChoice.bind(this)
        this.handleStatusChoice = this.handleStatusChoice.bind(this)
        this.handleSearchChange = this.handleSearchChange.bind(this)
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
        this.handlePageRequest = this.handlePageRequest.bind(this)

        this.handleNumberChange = this.handleNumberChange.bind(this)
        this.handleTextChange = this.handleTextChange.bind(this)
    }

    openModal(initialState) {
        this.setState({ modalState: initialState, modalOpen: true })
    }

    customSetState(nextState) {
        this.setState({ ...nextState, lastUpdate: new Date() })
    }

    handleNumberChange(cb) {
        console.log(cb)
        return (text) => {
            let ok = text.split('').filter(c => c < '0' || c > '9').length === 0
            if (!ok) {
                this.setState({ formError: `${text} is not a number` })
            }
            cb(text)
        }
    }
    handleTextChange(cb) {
        return (text) => {
            cb(text)
        }
    }
    handleGenreChoice(genre) {
        this.customSetState({ genre: genre })
        this.props.loadMovies(this.state.page, {
            genre: genre,
            status: this.state.status,
            searchText: this.state.searchText
        })
    }
    handleStatusChoice(status) {
        this.customSetState({ status: status })
        this.props.loadMovies(this.state.page, {
            genre: this.state.genre,
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
            this.props.loadMovies(this.state.page, {
                genre: this.state.genre,
                status: this.state.status,
                searchText: txt
            })
        }, MIN_INTERVAL)
    }
    handleSearchSubmit(txt) {
        this.customSetState({ searchText: txt })
        this.props.loadMovies(this.state.page, {
            genre: this.state.genre,
            status: this.state.status,
            searchText: txt
        })

    }
    handlePageRequest(page) {
        this.customSetState({ page: page })
        this.props.loadMovies(page, {
            genre: this.state.genre,
            status: this.state.status,
            searchText: this.state.searchText
        })
    }

    isGenreLoadFailed() {
        let { genreChoices } = this.props
        let isReady = genreChoices.data === null || (genreChoices.error !== null && genreChoices.error !== undefined)
        return isReady
    }

    renderHeader() {
        return (
            <FullHeader title='Phim'
                onSearchChange={this.handleSearchChange}
                onSearchSubmit={this.handleSearchSubmit}
            />
        )
    }

    renderContent() {
        return (
            <React.Fragment>
                {this.renderFilters()}
                {this.renderMoviesSection()}
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
                    defaultLabel='The loai'
                    onDefaultClick={() => this.handleGenreChoice(0)}
                    data={this.props.genreChoices}
                    onChoiceClick={this.handleGenreChoice}
                />
                <Dropdown
                    className='col-md-2'
                    padding='px-3'
                    defaultLabel='Tinh trang'
                    onDefaultClick={() => this.handleStatusChoice('all')}
                    choices={[
                        { label: 'Sap chieu', id: 'coming' },
                        { label: 'Dang chieu', id: 'showing' },
                        { label: 'Ngung chieu', id: 'passed' },
                    ]}
                    onChoiceClick={(c) => this.handleStatusChoice(c.id)}
                />
            </div>
        )
    }

    renderMoviesSection() {
        let { movies } = this.props
        let header = (
            <tr>
                <td className="text-center">Ma phim</td>
                <td>Ten phim</td>
                <td>Dao dien</td>
                <td>Dien vien chinh</td>
                <td>The loai</td>
                <td className="text-center">Thoi luong</td>
                <td className="text-center">Tinh trang</td>
            </tr>
        )
        return (
            <RemoteDataListContainer
                otherFailConditions={() => this.isGenreLoadFailed()}
                notRenderUntil={() => !this.props.genreChoices.isLoading}
                remoteData={movies}
                title='Phim dang chieu'
                header={header}
                renderItem={(item) => {
                    let type = this.props.genreChoices.data.filter(c => c.id === item.type)[0]
                    let status = getMovieStatus(item.start, item.end)
                    return (
                        <tr>
                            <ClickableTableCells onClick={() => this.openModal(ModalState.INFO)}>
                                <div className="text-center">{item.id}</div>
                                <div>{item.name}</div>
                                <div>{item.director}</div>
                                <div>{item.actor}</div>
                                <div>{type.label}</div>
                                <div className="text-center">{item.length + ' phut'}</div>
                                <div className={`text-center ${status.color}`}>{status.text}</div>
                            </ClickableTableCells>
                            <td className="text-right">
                                <InlineClickableView onClick={() => this.openModal(ModalState.EDIT)}>
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
                onClick={() => this.openModal(ModalState.NEW)}
                iconName='plus'
            />
        )
    }

    renderBody() {
        switch (this.state.modalState) {
            case ModalState.NEW:
                return this.renderNewForm()
            case ModalState.EDIT:
            // return this.renderEditForm()
            case ModalState.INFO:
            // return this.renderInfoForm()
            case ModalState.REMOVE:
            // return this.renderRemoveForm()
            default:
                return null
        }
    }

    renderNewForm() {
        // let { newItem: this.state.newItem } = this.state
        console.log(this.state.newItem.id)
        let genres = this.props.genreChoices.data
        return (
            <form>
                <FormInput label='Ma phim' disabled={false} value={this.state.newItem.id}
                    onChange={(text) => {
                        this.setState({ newItem: { ...this.state.newItem, id: text } })
                    }} />
                {/* <FormInput label='Ten phim' disabled={false} value={this.state.newItem.name}
                    onChange={this.handleTextChange((text) => {
                        this.setState({ newItem: { ...this.state.newItem, name: text } })
                    })} />
                <FormInput label='Dao dien' disabled={false} value={this.state.newItem.director}
                    onChange={this.handleTextChange((text) => {
                        this.setState({ newItem: { ...this.state.newItem, director: text } })
                    })} />
                <FormInput label='Dien vien' disabled={false} value={this.state.newItem.actor}
                    onChange={this.handleTextChange((text) => {
                        this.setState({ newItem: { ...this.state.newItem, actor: text } })
                    })} />
                <FormSelect label='The loai' disabled={false} value={genres[0].id} options={genres}
                    onChange={type => this.setState({ newItem: { ...this.state.newItem, type: type } })}
                />
                <FormInput label='Thoi luong' disabled={false} value={this.state.newItem.length}
                    onChange={this.handleNumberChange((text) => {
                        this.setState({ newItem: { ...this.state.newItem, length: text } })
                    })} />
                <FormDatePicker label='Ngay bat dau' disabled={false} value={this.state.newItem.start ? formatDate(this.state.newItem.start) : null}
                    min={new Date('2000/01/01')}
                    max={() => this.state.newItem.end ? this.state.newItem.end : new Date()}
                    onChange={(date) => this.setState({ newItem: { ...this.state.newItem, start: date } })} />
                <FormDatePicker label='Ngay ket thuc' disabled={false} value={this.state.newItem.end ? formatDate(this.state.newItem.end) : null}
                    max={new Date()}
                    min={() => {
                        console.log(this.state.newItem.start)
                        return this.state.newItem.start
                    }}
                    onChange={(date) => this.setState({ newItem: { ...this.state.newItem, end: date } })} /> */}
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
                body={this.renderBody()}
            />
        )
    }

    render() {
        return (
            <BaseAdminScreen
                pathId={routes.MOVIE.id}
                requireLogin={true}
                header={this.renderHeader}
                content={this.renderContent}
                callback={() => this.props.loadContent()}
            />
        )
    }
}

const mapStateToProps = state => {
    return {
        genreChoices: state.movies.genreChoices,
        movies: state.movies.movies
    }
}
const mapDispatchToProps = dispatch => {
    return {
        loadContent: () => dispatch(loadContent()),
        loadMovies: (page, options) => dispatch(loadMovies(page, options)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieScreen)