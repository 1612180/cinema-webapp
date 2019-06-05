import { actions } from './side-navbar.type'
import { routes } from '../../routes'

const initState = {
    navList: {
        activeIndex: 0,
        navOptions: {
            [routes.DASHBOARD.id]: {
                href: routes.DASHBOARD.path,
                text: 'Trang chinh',
                iconName: 'home'
            },
            [routes.MOVIE.id]: {
                href: routes.MOVIE.path,
                text: 'Phim',
                iconName: 'film'
            },
            [routes.THEATER.id]: {
                href: routes.THEATER.path,
                text: 'Rap',
                iconName: 'warehouse'
            },
            [routes.TICKET.id]: {
                href: routes.TICKET.path,
                text: 'Ve',
                iconName: 'ticket-alt'
            },
            [routes.FOOD.id]: {
                href: routes.FOOD.path,
                text: 'Thuc an',
                iconName: 'drumstick-bite'
            },
            [routes.ORDER.id]: {
                href: routes.ORDER.path,
                text: 'Don hang',
                iconName: 'shopping-cart'
            },
        }
    }

}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case actions.CHANGE_ACTIVE_NAV_OPTION: {
            return {
                ...state,
                navList: {
                    ...state.navList,
                    activeIndex: action.index
                }
            }
        }
        default:
            return state
    }
}

export default reducer