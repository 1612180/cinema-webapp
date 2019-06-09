export class DashboardTheater {
    constructor(name, address, ordered, capacity) {
        this.name = name;
        this.address = address;
        this.ordered = ordered;
        this.capacity = capacity;
    }
}

export class Theater {
    constructor(id, name, address, row, column, ordered, status) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.row = row;
        this.column = column;
        this.ordered = ordered;
        this.status = status;
    }
}