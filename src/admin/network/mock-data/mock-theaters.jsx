import { DashboardTheater } from '../models/theater'

export const getDashboardTheaters = (n) => {
    let sampleTheater = new DashboardTheater(
        "Nigamon Nguyen Van Cu",
        "227 Nguyen Van Cu, Q5, HCM",
        45,
        60
    )
    return new Array(n).fill(sampleTheater)
}