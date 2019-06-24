import { getDashboardMovies, getMovies } from './mock-data/mock-movies'
import { getDashboardOrders, getOrders } from './mock-data/mock-orders'
import { getDashboardTheaters, getTheaters, getTheaterShowTimes } from './mock-data/mock-theaters'
import { getDashboardCharts } from './mock-data/mock-charts'
import { getTickets } from './mock-data/mock-tickets'
import { getFoods } from './mock-data/mock-foods'
import {
    getTheaterChoices,
    getGenreChoices,
    getTheaterStatusChoices,
    getTicketStatusChoices,
    getFoodStatusChoices,
    getOrderStatusChoices
} from './mock-data/mock-choices'
import moment from 'moment'
import { ApiClient, SecureApiClient } from './api-client'
import { logOut } from '../stores/app-state/app-state.action'
import { store } from '../stores/configureStore'
import { codes } from './message-codes';
import { parseTime, formatTime } from '../libs/datetime';

const ITEM_PER_PAGE = {
    dashboard: 5,
    other: 10
}
const BASE_URL = 'http://localhost:8080/admin/api'
const JWT_TOKEN = 'NIGAMON_JWT_TOKEN'
const apiClient = new ApiClient(BASE_URL)
const secureApiClient = new SecureApiClient(BASE_URL, JWT_TOKEN, () => {
    store.dispatch(logOut())
}).client


export default class AdminApi {
    static logout() {
        localStorage.removeItem(JWT_TOKEN)
    }
    static login(email, password) {
        return apiClient.postJson('/login', { email, password })
            .then(data => {
                if (!data.isLogin) {
                    return data
                }
                localStorage.setItem(JWT_TOKEN, data.token)
                return {
                    ...data,
                    userInfo: {
                        ...data.userInfo,
                        lastLogin: data.userInfo.lastLogin && moment.utc(data.userInfo.lastLogin).toDate()
                    }
                }
            })
    }
    static checkLogin() {
        return secureApiClient.getJson('/login')
            .then(data => {
                return {
                    ...data,
                    userInfo: {
                        ...data.userInfo,
                        lastLogin: data.userInfo.lastLogin && moment.utc(data.userInfo.lastLogin).toDate()
                    }
                }
            })
    }

    //--------------------- Dashboard ------------------------//
    static getDashboardMovies(page) {
        return secureApiClient.getJson('/dashboard/movies', { params: { page: page } })
            .then(data => {
                return {
                    ...data,
                    movies: data.movies.map(m => ({
                        ...m,
                        showTime: m.showTime.slice(0, 5)
                    }))
                }
            })
    }
    static getDashboardOrders(page) {
        return ok({
            orders: getDashboardOrders(ITEM_PER_PAGE.dashboard),
            currentPage: page,
            lastPage: 5,
            total: 23
        })
    }
    static getDashboardTheaters(page) {
        return secureApiClient.getJson('/dashboard/theaters', { params: { page: page } })
            .then(data => {
                return data
            })
    }

    static getTheaterChoices() {
        return ok(getTheaterChoices())
    }
    static getDashboardCharts(start, end, theater) {
        return ok(getDashboardCharts(start, end, theater))
    }

    //--------------------- Movies ------------------------//
    static getGenreChoices() {
        return secureApiClient.getJson('/movies/genres')
    }
    static getMovies(page, options) {
        return secureApiClient.getJson('/movies', {
            params: {
                page: page,
                ...options
            }
        }).then(data => {
            return {
                ...data,
                movies: data.movies.map(m => {
                    return {
                        ...m,
                        start: m.start && moment.utc(m.start).toDate(),
                        end: m.end && moment.utc(m.end).toDate()
                    }
                })
            }
        })
    }
    static uploadMovie(movie, addNew) {
        return secureApiClient.postJson(`/movies/${movie.id}`, movie, { params: { addNew: addNew } })
            .then(data => data)
    }
    static removeMovie(movie) {
        return secureApiClient.deleteJson(`/movies/${movie.id}`)
    }
    //--------------------- Theaters ------------------------//
    static getTheaterStatusChoices() {
        return secureApiClient.getJson('/theaters/status')
    }
    static getTheaters(page, options) {
        secureApiClient.getJson(`/theaters/1/showtimes`, { params: { date: new Date() } })
        return secureApiClient.getJson('/theaters', {
            params: {
                page: page,
                ...options
            }
        }).then(data => {
            return data
        })
    }
    static getShowTimes(theater, date, options) {
        return secureApiClient.getJson(`/theaters/${theater.id}/showtimes`, { params: { date: date } })
            .then(data => {
                return {
                    showTimes: data.showTimes.map(s => ({
                        ...s,
                        time: parseTime(s.time)
                    }))
                }
            })
    }

    static uploadTheater(theater, addNew) {
        return secureApiClient.postJson(`/theaters/${theater.id}`, theater, { params: { addNew: addNew } })
    }
    static removeTheater(theater) {
        return secureApiClient.deleteJson(`/theaters/${theater.id}`)
    }
    static uploadShowTime(theater, date, showTime, addNew, options) {
        const data = {
            ...showTime,
            time: formatTime(showTime.time)
        }
        return secureApiClient.postJson(`/theaters/${theater.id}/showtimes`, data, {
            params: {
                date: date,
                addNew: addNew
            }
        })
    }
    static removeShowTime(theater, date, showTime, options) {
        return secureApiClient.deleteJson(`/theaters/${theater.id}/showtimes/${showTime.id}`, {
            params: {
                date: date,
            }
        })
    }

    //--------------------- Tickets ------------------------//
    static getTicketStatusChoices() {
        return secureApiClient.getJson('/tickets/status')
    }
    static getTickets(page, options) {
        return secureApiClient.getJson('/tickets', {
            params: {
                page: page,
                ...options
            }
        }).then(data => {
            return data
        })
    }
    static uploadTicket(ticket, addNew) {
        return secureApiClient.postJson(`/tickets/${ticket.id}`, ticket, { params: { addNew: addNew } })
            .then(data => data)
    }
    static removeTicket(ticket) {
        return secureApiClient.deleteJson(`/tickets/${ticket.id}`)
    }

    //--------------------- Foods ------------------------//
    static getFoodStatusChoices() {
        return secureApiClient.getJson('/foods/status')
    }
    static getFoods(page, options) {
        return secureApiClient.getJson('/foods', {
            params: {
                page: page,
                ...options
            }
        }).then(data => {
            return data
        })
    }
    static uploadFood(food, addNew) {
        return secureApiClient.postJson(`/foods/${food.id}`, food, { params: { addNew: addNew } })
            .then(data => data)
    }
    static removeFood(food) {
        return secureApiClient.deleteJson(`/foods/${food.id}`)
    }

    //--------------------- Orders ------------------------//
    static getOrderStatusChoices() {
        return secureApiClient.getJson('/orders/status')
    }
    static getOrders(page, options) {
        return ok({
            orders: getOrders(ITEM_PER_PAGE.other, options),
            currentPage: page,
            lastPage: 2,
            total: 18
        })
    }
}

const TIMEOUT = 200
const RANDOM_MAX = 0
const ok = (data) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(data), TIMEOUT + Math.random() * RANDOM_MAX)
    })
}
const fail = (err) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => reject(err), TIMEOUT + Math.random() * RANDOM_MAX)
    })
}