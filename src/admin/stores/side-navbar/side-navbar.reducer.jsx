import { actions } from './side-navbar.type'

const initState = {
    navList: {
        activeIndex: 0,
        navOptions: [
            {
                href: '/v2/admin',
                text: 'Trang chinh',
                iconName: 'home'
            },
            {
                href: '/v2/admin/movie',
                text: 'Phim',
                iconName: 'film'
            },
            {
                href: '/v2/admin/theater',
                text: 'Rap',
                iconName: 'warehouse'
            },
            {
                href: '/v2/admin/ticket',
                text: 'Ve',
                iconName: 'ticket-alt'
            },
            {
                href: '/v2/admin/food',
                text: 'Thuc an',
                iconName: 'drumstick-bite'
            },
            {
                href: '/v2/admin/order',
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