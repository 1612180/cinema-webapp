class DashboardMovie {
    constructor(name, type, director, theater, showTime) {
        this.name = name;
        this.type = type;
        this.director = director;
        this.theater = theater;
        this.showTime = showTime
    }

    buildListItem = () => {
        return `
        <tr>
            <td>${this.name}</td>
            <td>${this.type}</td>
            <td>${this.director}</td>
            <td>${this.theater}</td>
            <td class="text-center">${this.showTime}</td>
        </tr>
        `;
    }
}
let sampleMovie = new DashboardMovie(
    "Chem gio (2D Thuyet minh)",
    "Tau hai",
    "Riot",
    "Nigamon Nguyen Van Cu",
    "16:45"
)

class DashboardOrder {
    constructor(username, date, time, total) {
        this.username = username;
        this.date = date;
        this.time = time;
        this.total = total;
    }

    buildListItem = () => {
        return `
        <tr>
            <td>${this.username}</td>
            <td class="text-center">${this.date}</td>
            <td class="text-center">${this.time}</td>
            <td class="text-right">${this.total}</td>
        </tr>
        `;
    }
}
let sampleOrder = new DashboardOrder(
    "leHauBoi",
    "02-04-19",
    "16:00",
    "384,000 VND"
)

class DashboardTheater {
    constructor(name, address, ordered, capacity) {
        this.name = name;
        this.address = address;
        this.ordered = ordered;
        this.capacity = capacity;
    }

    buildListItem = () => {
        return `
        <tr>
            <td>${this.name}</td>
            <td>${this.address}</td>
            <td class="text-center">${this.ordered}</td>
            <td class="text-center">${this.capacity}</td>
        </tr>
        `;
    }
}
let sampleTheater = new DashboardTheater(
    "Nigamon Nguyen Van Cu",
    "227 Nguyen Van Cu, Q5, HCM",
    45,
    60
)