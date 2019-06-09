import { DashboardTheater, Theater } from '../models/theater'

export const getDashboardTheaters = (n) => {
    let sampleTheater = new DashboardTheater(
        "Nigamon Nguyen Van Cu",
        "227 Nguyen Van Cu, Q5, HCM",
        45,
        60
    )
    return new Array(n).fill(sampleTheater)
}

export const getTheaters = (n, options) => {
    let theaters = [];
    while (theaters.length < n) {
        theaters.push(new Theater(
            Math.floor(Math.random() * 100) + 1,
            'Nigamon Nguyen Van Cu',
            `${Math.floor(Math.random() * 200) + 1} Duong nao day, Q5, HCM`,
            6,
            10,
            45,
            Math.floor(Math.random() * 2) + 1
        ));
    }
    return theaters
}