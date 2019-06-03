import { actions } from './side-navbar.type'

const initState = {
    navList: {
        activeIndex: 0,
        navOptions: [
            {
                href: 'dashboard',
                text: 'Trang chinh',
                iconName: 'home'
            },
            {
                href: 'movie',
                text: 'Phim',
                iconName: 'film'
            },
            {
                href: 'theater',
                text: 'Rap',
                iconName: 'warehouse'
            },
            {
                href: 'ticket',
                text: 'Ve',
                iconName: 'ticket-alt'
            },
            {
                href: 'food',
                text: 'Thuc an',
                iconName: 'drumstick-bite'
            },
            {
                href: 'order',
                text: 'Don hang',
                iconName: 'shopping-cart'
            },
        ]
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