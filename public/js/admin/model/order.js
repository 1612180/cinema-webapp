// Order 
let OrderStatus = new Map();
let OrderTheater = new Map();
let OrderMoneyBar = new Array();

const ORDER_CONSTANT = {
    ID: "order-id",
    USERNAME: "order-username",
    DATETIME: "order-datetime",
    THEATER: "order-theater",
    TOTAL: "order-total",
    STATUS: "order-status",
}

class Order {
    constructor(id, username, datetime, theater, total, status) {
        this.id = id;
        this.username = username;
        this.datetime = datetime;
        this.theater = theater;
        this.total = total;
        this.status = status;
    }

    getItemData = () => {
        return {
            id: this.id.toString(),
            username: this.username,
            date: uniformDateFormat(this.datetime),
            time: uniformTimeFormat(this.datetime),
            theater: OrderTheater.get(this.theater),
            total: this.total.toString(),
            status: OrderStatus.get(this.status)
        };
    }

    buildListItem = () => {
        let textColor = "";
        if (this.status === 1) {
            textColor = "text-success";
        } else if (this.status === 2) {
            textColor = "text-warning";
        } else {
            textColor = "text-danger";
        }

        let htmlStr = `
            <tr>
                <td class="text-center">${this.id}</td>
                <td>${this.username}</td>
                <td class="text-center">${uniformDateFormat(this.datetime)}</td>
                <td class="text-center">${uniformTimeFormat(this.datetime)}</td>
                <td>${OrderTheater.get(this.theater)}</td>
                <td class="text-right">${formatMoney(this.total) + " VND"}</td>
                <td class="text-center ${textColor}">${OrderStatus.get(this.status)}</td>
                <td class="text-right">
                    <a href="#" class="config-btn"><i class="fas fa-cog    "></i></a>
                    /
                    <a href="#" class="remove-btn"><i class="fas fa-times    "></i></a>
                </td>
            </tr>
        `;
        return $($.parseHTML(htmlStr.trim()));
    };

    buildValidationRules = () => {
        return {
            rules: {

            },
            messages: {

            }
        };
    }

    buildEditModal = () => {
        let node = $('<div/>');
        let theaters = Array.from(OrderTheater).map(([id, text]) => { return { value: id, text: text } });
        let statuses = Array.from(OrderStatus).map(([id, text]) => { return { value: id, text: text } });

        node.append(buildInput("Ma don", ORDER_CONSTANT.ID, this.id, 1, DISABLED.YES));
        node.append(buildInput("Nguoi dung", ORDER_CONSTANT.USERNAME, this.username, "Ten phim", DISABLED.NO));
        node.append(buildInput("Thoi gian", ORDER_CONSTANT.DATETIME, uniformDateTimeFormat(this.datetime), "Dao dien", DISABLED.NO));
        node.append(buildSelect("Rap", ORDER_CONSTANT.THEATER, this.theater, theaters, DISABLED.NO));
        node.append(buildPriceInput("Tong tien", ORDER_CONSTANT.TOTAL, this.total, "50000", DISABLED.NO));
        node.append(buildSelect("Tinh trang", ORDER_CONSTANT.STATUS, this.status, statuses, DISABLED.NO));

        initDateTimePickerInNode(node, ORDER_CONSTANT.DATETIME)

        return node;
    }

    buildNewModal = () => {
        let node = $('<div/>');
        let theaters = Array.from(OrderTheater).map(([id, text]) => { return { value: id, text: text } });
        let statuses = Array.from(OrderStatus).map(([id, text]) => { return { value: id, text: text } });

        node.append(buildInput("Ma don", ORDER_CONSTANT.ID, null, 1, DISABLED.NO));
        node.append(buildInput("Nguoi dung", ORDER_CONSTANT.USERNAME, null, "Ten phim", DISABLED.NO));
        node.append(buildInput("Thoi gian", ORDER_CONSTANT.DATETIME, null, "Dao dien", DISABLED.NO));
        node.append(buildSelect("Rap", ORDER_CONSTANT.THEATER, 1, theaters, DISABLED.NO));
        node.append(buildPriceInput("Tong tien", ORDER_CONSTANT.TOTAL, null, "50000", DISABLED.NO));
        node.append(buildSelect("Tinh trang", ORDER_CONSTANT.STATUS, 1, statuses, DISABLED.NO));

        initDateTimePickerInNode(node, ORDER_CONSTANT.DATETIME)

        return node;
    }


    buildInfoModal = () => {
        let node = $('<div/>');
        let theaters = Array.from(OrderTheater).map(([id, text]) => { return { value: id, text: text } });
        let statuses = Array.from(OrderStatus).map(([id, text]) => { return { value: id, text: text } });

        node.append(buildInput("Ma don", ORDER_CONSTANT.ID, this.id, 1, DISABLED.YES));
        node.append(buildInput("Nguoi dung", ORDER_CONSTANT.USERNAME, this.username, "Ten phim", DISABLED.YES));
        node.append(buildInput("Thoi gian", ORDER_CONSTANT.DATETIME, uniformDateTimeFormat(this.datetime), "Dao dien", DISABLED.YES));
        node.append(buildSelect("Rap", ORDER_CONSTANT.THEATER, this.theater, theaters, DISABLED.YES));
        node.append(buildInput("Tong tien", ORDER_CONSTANT.TOTAL, formatMoney(this.total) + " VND", "50000", DISABLED.YES));
        node.append(buildSelect("Tinh trang", ORDER_CONSTANT.STATUS, this.status, statuses, DISABLED.YES));

        return node;
    }

    buildDeleteModal = () => {
        let node = $('<div/>');
        let theaters = Array.from(OrderTheater).map(([id, text]) => { return { value: id, text: text } });
        let statuses = Array.from(OrderStatus).map(([id, text]) => { return { value: id, text: text } });
        node.append(`
            <p class="h5 text-center">
                Ban thuc su muon xoa don hang <br/>
                <span class="font-weight-bold">${this.id}</span> ?
            </p>
            <br/>
        `)
        node.append(buildInput("Ma don", ORDER_CONSTANT.ID, this.id, 1, DISABLED.YES));
        node.append(buildInput("Nguoi dung", ORDER_CONSTANT.USERNAME, this.username, "Ten phim", DISABLED.YES));
        node.append(buildInput("Thoi gian", ORDER_CONSTANT.DATETIME, uniformDateTimeFormat(this.datetime), "Dao dien", DISABLED.YES));
        node.append(buildSelect("Rap", ORDER_CONSTANT.THEATER, this.theater, theaters, DISABLED.YES));
        node.append(buildInput("Tong tien", ORDER_CONSTANT.TOTAL, formatMoney(this.total) + " VND", "50000", DISABLED.YES));
        node.append(buildSelect("Tinh trang", ORDER_CONSTANT.STATUS, this.status, statuses, DISABLED.YES));
        return node;
    }
}
