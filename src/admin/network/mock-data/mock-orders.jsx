import { DashboardOrder } from '../models/order'

export const getDashboardOrders = (n) => {
    let sampleOrder = new DashboardOrder(
        "leHauBoi",
        "02-04-19",
        "16:00",
        "384,000 VND"
    )
    return new Array(n).fill(sampleOrder)
}