import { DashboardOrder, Order, OrderFood } from '../models/order'

export const getDashboardOrders = (n) => {
    let sampleOrder = new DashboardOrder(
        "leHauBoi",
        "02-04-19",
        "16:00",
        "384,000 VND"
    )
    return new Array(n).fill(sampleOrder)
}

export const getOrders = (n, options) => {
    let orders = [];
    while (orders.length < n) {
        let datetime = new Date(`2019/0${Math.floor(Math.random() * 9) + 1}/0${Math.floor(Math.random() * 9) + 1}`);
        let foods = [];
        let foodNum = Math.floor(Math.random() * 20) + 1;
        for (let i = 0; i < foodNum; i++) {
            foods.push(new OrderFood(
                Math.floor(Math.random() * 5) + 1,
                Math.floor(Math.random() * 3) + 1,
            ))
        }
        orders.push(new Order(
            Math.floor(Math.random() * 100) + 1,
            'leHauBoi',
            datetime,
            Math.floor(Math.random() * 3) + 1,
            [],
            foods,
            Math.floor(Math.random() * 3) + 1,
        ));
    }
    return orders
}