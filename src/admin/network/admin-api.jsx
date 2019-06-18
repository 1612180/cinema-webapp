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

const ITEM_PER_PAGE = {
    dashboard: 5,
    other: 10
}
export default class AdminApi {
    static checkLogin() {
        return ok({
            isLogin: true,
            userInfo: {
                name: 'Nguyen Tran Hau',
                email: 'test@dev.com',
                password: 'somerandompassword',
                lastLogin: new Date('2019/05/06')
            }
        })
    }

    //--------------------- Dashboard ------------------------//
    static getDashboardMovies(page) {
        return ok({
            movies: getDashboardMovies(ITEM_PER_PAGE.dashboard),
            currentPage: page,
            lastPage: 2,
            total: 8
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
        return ok({
            theaters: getDashboardTheaters(ITEM_PER_PAGE.dashboard),
            currentPage: page,
            lastPage: 3,
            total: 15
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
        return ok(getGenreChoices())
    }
    static getMovies(page, options) {
        return ok({
            movies: getMovies(ITEM_PER_PAGE.other, options),
            currentPage: page,
            lastPage: 2,
            total: 18
        })
    }
    //--------------------- Theaters ------------------------//
    static getTheaterStatusChoices() {
        return ok(getTheaterStatusChoices())
    }
    static getTheaters(page, options) {
        return ok({
            theaters: getTheaters(ITEM_PER_PAGE.other, options),
            currentPage: page,
            lastPage: 2,
            total: 18
        })
    }
    static getShowTimes(theater, date, options) {
        return ok({ showTimes: getTheaterShowTimes(9, theater.row, theater.column, options) })
    }

    //--------------------- Tickets ------------------------//
    static getTicketStatusChoices() {
        return ok(getTicketStatusChoices())
    }
    static getTickets(page, options) {
        return ok({
            tickets: getTickets(ITEM_PER_PAGE.other, options),
            currentPage: page,
            lastPage: 2,
            total: 18
        })
    }

    //--------------------- Foods ------------------------//
    static getFoodStatusChoices() {
        return ok(getFoodStatusChoices())
    }
    static getFoods(page, options) {
        return ok({
            foods: getFoods(ITEM_PER_PAGE.other, options),
            currentPage: page,
            lastPage: 2,
            total: 18
        })
    }

    //--------------------- Orders ------------------------//
    static getOrderStatusChoices() {
        return ok(getOrderStatusChoices())
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