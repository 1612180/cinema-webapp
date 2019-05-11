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
    constructor(id, username, datetime, theater, items, status) {
        this.id = id;
        this.username = username;
        this.datetime = datetime;
        this.theater = theater;
        this.items = items;
        this.status = status;
    }

    calculateTotal = () => {
        return this.items.reduce((prev, current) => prev + current.calculateTotal(), 0)
    }

    getItemData = () => {
        return {
            id: this.id.toString(),
            username: this.username,
            date: uniformDateFormat(this.datetime),
            time: uniformTimeFormat(this.datetime),
            theater: OrderTheater.get(this.theater),
            total: this.calculateTotal().toString(),
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
        let total = this.items.length === 0 ? -1 : this.calculateTotal();

        let htmlStr = `
            <tr>
                <td class="text-center">${this.id}</td>
                <td>${this.username}</td>
                <td class="text-center">${uniformDateFormat(this.datetime)}</td>
                <td class="text-center">${uniformTimeFormat(this.datetime)}</td>
                <td>${OrderTheater.get(this.theater)}</td>
                <td class="text-right">${total === -1 ? "" : formatMoney(total) + ' VND'}</td>
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
                orderId: {
                    required: true,
                    digits: true
                },
                orderUsername: "required",
                orderDatetime: "required",
                orderTotal: "required"
            },
            messages: {
                orderId: {
                    required: buildErrorTooltip("Vui long dien ma don hang"),
                    digits: buildErrorTooltip("Ma don hang phai la so nguyen")
                },
                orderUsername: buildErrorTooltip("Vui long dien ten khach hang"),
                orderDatetime: buildErrorTooltip("Vui long dien thoi gian"),
                orderTotal: buildErrorTooltip("Gio hang khong duoc rong")
            }
        };
    }

    buildEditModal = () => {
        let node = $('<div/>');
        let theaters = Array.from(OrderTheater).map(([id, text]) => { return { value: id, text: text } });
        let statuses = Array.from(OrderStatus).map(([id, text]) => { return { value: id, text: text } });

        node.append(buildInput("Ma don", ORDER_CONSTANT.ID, this.id, 1, DISABLED.YES));
        node.append(buildInput("Nguoi dung", ORDER_CONSTANT.USERNAME, this.username, "leHauBoi", DISABLED.NO));
        node.append(buildInput("Thoi gian", ORDER_CONSTANT.DATETIME, uniformDateTimeFormat(this.datetime), "", DISABLED.NO));
        node.append(buildSelect("Rap", ORDER_CONSTANT.THEATER, this.theater, theaters, DISABLED.NO));

        let cloneOrder = new Order(
            this.id,
            this.username,
            this.datetime,
            this.theater,
            this.items,
            this.status
        );
        node.append(buildOrderItemSection(cloneOrder, DISABLED.NO));
        node.append(buildInput("Tong tien", ORDER_CONSTANT.TOTAL, formatMoney(this.calculateTotal()) + " VND", "Gio hang khong duoc rong", DISABLED.YES));

        node.append(buildSelect("Tinh trang", ORDER_CONSTANT.STATUS, this.status, statuses, DISABLED.NO));

        initDateTimePickerInNode(node, ORDER_CONSTANT.DATETIME)

        return node;
    }

    buildNewModal = () => {
        let node = $('<div/>');
        let theaters = Array.from(OrderTheater).map(([id, text]) => { return { value: id, text: text } });
        let statuses = Array.from(OrderStatus).map(([id, text]) => { return { value: id, text: text } });

        node.append(buildInput("Ma don", ORDER_CONSTANT.ID, null, 1, DISABLED.NO));
        node.append(buildInput("Nguoi dung", ORDER_CONSTANT.USERNAME, null, "leHauBoi", DISABLED.NO));
        node.append(buildInput("Thoi gian", ORDER_CONSTANT.DATETIME, null, "", DISABLED.NO));
        node.append(buildSelect("Rap", ORDER_CONSTANT.THEATER, 1, theaters, DISABLED.NO));

        node.append(buildOrderItemSection(this, DISABLED.NO))
        node.append(buildInput("Tong tien", ORDER_CONSTANT.TOTAL, null, "Gio hang khong duoc rong", DISABLED.YES));

        node.append(buildSelect("Tinh trang", ORDER_CONSTANT.STATUS, 1, statuses, DISABLED.NO));

        initDateTimePickerInNode(node, ORDER_CONSTANT.DATETIME)

        return node;
    }


    buildInfoModal = () => {
        let node = $('<div/>');
        let theaters = Array.from(OrderTheater).map(([id, text]) => { return { value: id, text: text } });
        let statuses = Array.from(OrderStatus).map(([id, text]) => { return { value: id, text: text } });

        node.append(buildInput("Ma don", ORDER_CONSTANT.ID, this.id, 1, DISABLED.YES));
        node.append(buildInput("Nguoi dung", ORDER_CONSTANT.USERNAME, this.username, "leHauBoi", DISABLED.YES));
        node.append(buildInput("Thoi gian", ORDER_CONSTANT.DATETIME, uniformDateTimeFormat(this.datetime), "", DISABLED.YES));
        node.append(buildSelect("Rap", ORDER_CONSTANT.THEATER, this.theater, theaters, DISABLED.YES));

        node.append(buildOrderItemSection(this, DISABLED.YES));
        node.append(buildInput("Tong tien", ORDER_CONSTANT.TOTAL, formatMoney(this.calculateTotal()) + " VND", "Gio hang khong duoc rong", DISABLED.YES));

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
        node.append(buildInput("Thoi gian", ORDER_CONSTANT.DATETIME, uniformDateTimeFormat(this.datetime), "", DISABLED.YES));
        node.append(buildSelect("Rap", ORDER_CONSTANT.THEATER, this.theater, theaters, DISABLED.YES));

        node.append(buildOrderItemSection(this, DISABLED.YES));
        node.append(buildInput("Tong tien", ORDER_CONSTANT.TOTAL, formatMoney(this.calculateTotal()) + " VND", "Gio hang khong duoc rong", DISABLED.YES));

        node.append(buildSelect("Tinh trang", ORDER_CONSTANT.STATUS, this.status, statuses, DISABLED.YES));
        return node;
    }


}
//------- ORDER: Helper functions ------------------------//
function buildOrderItemSection(order, disabled) {
    let htmlStr = (`
            <div class="section-container my-5" id="order-items-container">
                <header class="section-header">
                    <div class="vertical-line mr-3"></div>
                    <div class="h5 font-weight-bold">Chi tiet don hang</div>
                </header>
                <div class="overflow-auto d-flex w-100">
                    <table class="section-items">
                        <thead class="h6">
                            <td class="text-center">So thu tu</td>
                            <td>Ten hang</td>
                            <td class="text-center">Loai hang</td>
                            <td class="text-right">Don gia</td>
                            <td class="text-center">So luong</td>
                            <td class="text-right">Tong cong</td>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        `)
    let node = $($.parseHTML(htmlStr.trim()))
    if (!order.items) {
        order.items = []
    }

    let body = node.find('tbody');
    order.items.forEach((item, index) => {
        let tr = item.buildListItem();
        tr.prepend(`<td class="text-center">${index + 1}</td>`)
        if (!disabled) {
            tr.append(`
                    <td class="text-right">
                        <a href="#" class="config-btn" id="order-item-config"><i class="fas fa-cog    "></i></a>
                        /
                        <a href="#" class="remove-btn" id="order-item-remove"><i class="fas fa-times    "></i></a>
                    </td>
                `)

            tr.children('td:not(:last)').click(e => {
                let submitCallback = () => {
                    openEditModalById(item, editOrderItemCallback(order, node, index), 'addItemModal');
                };
                openInfoModalById(item, submitCallback, 'addItemModal');
            });

            tr.find('.config-btn').click(e => {
                e.preventDefault();
                openEditModalById(item, editOrderItemCallback(order, node, index), 'addItemModal');
            });
            tr.find('.remove-btn').click(e => {
                e.preventDefault();
                openDeleteModalById(item, removeOrderItemCallback(order, node, index), 'addItemModal');
            });
        }
        body.append(tr);
    })

    if (!disabled) {
        node.append(`
            <footer class="section-footer">
                <button type="button" class="btn btn-primary">Them moi</button>
            </footer>
        `)
        let btn = node.find('button');
        btn.click(e => {
            openNewModalById(new OrderItem(), addOrderItemCallback(order, node), 'addItemModal')
        })
    }
    return node
}

function getOrderItemFormData(modalBody) {
    let itemid = modalBody.find(`#${ORDER_ITEM_CONSTANT.NAME}`).val();
    let type = modalBody.find(`#${ORDER_ITEM_CONSTANT.TYPE}`).val();
    let quantity = modalBody.find(`#${ORDER_ITEM_CONSTANT.QUANTITY}`).val();
    return new OrderItem(
        parseInt(itemid),
        parseInt(type),
        parseInt(quantity)
    );
}
function addOrderItemCallback(order, node) {
    return (modalBody) => {
        let newData = getOrderItemFormData(modalBody);
        hideModalById('addItemModal');
        addOrderItem(order, node, newData);
    }
}

function editOrderItemCallback(order, node, index) {
    return (modalBody) => {
        let newData = getOrderItemFormData(modalBody);
        hideModalById('addItemModal');
        updateOrderItem(order, node, index, newData);
    };
}
function removeOrderItemCallback(order, node, index) {
    return () => {
        hideModalById('addItemModal');
        removeOrderItem(order, node, index);
    }
}

function renderOrderItemList(order, sectionNode) {
    let container = sectionNode.find('.section-items').children('tbody');
    container.html(null);
    order.items.forEach((item, index) => {
        let node = item.buildListItem();
        node.prepend(`<td class="text-center">${index + 1}</td>`)
        node.append(`
            <td class="text-right">
                <a href="#" class="config-btn" id="order-item-config"><i class="fas fa-cog    "></i></a>
                /
                <a href="#" class="remove-btn" id="order-item-remove"><i class="fas fa-times    "></i></a>
            </td>
        `)

        node.children('td:not(:last)').click(e => {
            let submitCallback = () => {
                openEditModalById(item, editOrderItemCallback(order, sectionNode, index), 'addItemModal');
            };
            openInfoModalById(item, submitCallback, 'addItemModal');
        });

        node.find('.config-btn').click(e => {
            e.preventDefault();
            openEditModalById(item, editOrderItemCallback(order, sectionNode, index), 'addItemModal');
        });
        node.find('.remove-btn').click(e => {
            e.preventDefault();
            openDeleteModalById(item, removeOrderItemCallback(order, sectionNode, index), 'addItemModal');
        });
        container.append(node);
    })
    let total = !order.items || order.items.length === 0 ? -1 : order.calculateTotal();
    sectionNode.parent().find(`#${ORDER_CONSTANT.TOTAL}`).val(total === -1 ? "" : formatMoney(total) + ' VND')
}

function removeOrderItem(order, node, index) {
    order.items = order.items.filter((item, i) => i !== index);
    renderOrderItemList(order, node);
}
function updateOrderItem(order, node, index, newData) {
    order.items = order.items.map((item, i) => i === index ? newData : item)
    renderOrderItemList(order, node);
}
function addOrderItem(order, node, newData) {
    order.items.unshift(newData);
    renderOrderItemList(order, node);
}
//------- END ORDER: Helper functions ------------------------//

const ORDER_ITEM_CONSTANT = {
    NAME: "order-item-name",
    TYPE: "order-item-type",
    PRICE: "order-item-price",
    QUANTITY: "order-item-quantity",
    TOTAL: "order-item-total"
}

let OrderItemType = new Map([
    [1, {
        text: "Thuc an",
        items: new Map([
            [1, { text: "Bap rang bo", price: 50000 }],
            [2, { text: "Pepsi", price: 25000 }]
        ])
    }],
    [2, {
        text: "Ve phim",
        items: new Map([
            [1, { text: "Ve 2D thuong", price: 50000 }],
            [2, { text: "Ve 3D", price: 90000 }]
        ])
    }]
])

class OrderItem {
    constructor(itemid, type, quantity) {
        this.itemid = itemid;
        this.type = type;
        this.quantity = quantity;
    }

    calculateTotal = () => {
        let item = OrderItemType.get(this.type).items.get(this.itemid);
        return item.price * this.quantity;
    }

    buildListItem = () => {
        let item = OrderItemType.get(this.type).items.get(this.itemid);
        let htmlStr = `
            <tr>
                <td data-value="${this.itemid}" class="${ORDER_ITEM_CONSTANT.NAME}">${item.text}</td>
                <td data-value="${this.type}" class="${ORDER_ITEM_CONSTANT.TYPE}">${OrderItemType.get(this.type).text}</td>
                <td class="text-right">${formatMoney(item.price) + " VND"}</td>
                <td data-value="${this.quantity}" class="text-center ${ORDER_ITEM_CONSTANT.QUANTITY}">${this.quantity}</td>
                <td class="text-right">${formatMoney(item.price * this.quantity) + " VND"}</td>
            </tr>
        `;
        return $($.parseHTML(htmlStr.trim()));
    };

    buildValidationRules = () => {
        return {
            rules: {
                orderItemQuantity: {
                    required: true,
                    digits: true
                }
            },
            messages: {
                orderItemQuantity: {
                    required: buildErrorTooltip("Vui long dien so luong"),
                    digits: buildErrorTooltip("So luong phai la so nguyen")
                }
            }
        };
    }

    buildEditModal = () => {
        let node = $('<div/>');
        let item = OrderItemType.get(this.type).items.get(this.itemid);

        let items = Array.from(OrderItemType.get(this.type).items).map(([id, data]) => { return { value: id, text: data.text } });
        node.append(buildSelect("Ten hang", ORDER_ITEM_CONSTANT.NAME, this.itemid, items, DISABLED.NO));

        let types = Array.from(OrderItemType).map(([id, data]) => { return { value: id, text: data.text } });
        node.append(buildSelect("Loai hang", ORDER_ITEM_CONSTANT.TYPE, this.type, types, DISABLED.NO));

        node.append(buildInput("Don gia", ORDER_ITEM_CONSTANT.PRICE, formatMoney(item.price) + ' VND', "0 VND", DISABLED.YES));
        node.append(buildInput("So luong", ORDER_ITEM_CONSTANT.QUANTITY, this.quantity, 1, DISABLED.NO));
        node.append(buildInput("Tong cong", ORDER_ITEM_CONSTANT.TOTAL, formatMoney(item.price * this.quantity) + ' VND', '0 VND', DISABLED.YES));

        configureCascadingInputs(node);

        return node;
    }

    buildNewModal = () => {
        let node = $('<div/>');
        let item = OrderItemType.get(1).items.get(1);

        let items = Array.from(OrderItemType.get(1).items).map(([id, data]) => { return { value: id, text: data.text } });
        node.append(buildSelect("Ten hang", ORDER_ITEM_CONSTANT.NAME, 1, items, DISABLED.NO));

        let types = Array.from(OrderItemType).map(([id, data]) => { return { value: id, text: data.text } });
        node.append(buildSelect("Loai hang", ORDER_ITEM_CONSTANT.TYPE, 1, types, DISABLED.NO));

        node.append(buildInput("Don gia", ORDER_ITEM_CONSTANT.PRICE, formatMoney(item.price) + ' VND', "0 VND", DISABLED.YES));
        node.append(buildInput("So luong", ORDER_ITEM_CONSTANT.QUANTITY, null, 1, DISABLED.NO));
        node.append(buildInput("Tong cong", ORDER_ITEM_CONSTANT.TOTAL, 'So luong phai la so nguyen', '0 VND', DISABLED.YES));

        configureCascadingInputs(node);

        return node;
    }


    buildInfoModal = () => {
        let node = $('<div/>');
        let item = OrderItemType.get(this.type).items.get(this.itemid);

        let items = Array.from(OrderItemType.get(this.type).items).map(([id, data]) => { return { value: id, text: data.text } });
        node.append(buildSelect("Ten hang", ORDER_ITEM_CONSTANT.NAME, this.itemid, items, DISABLED.YES));

        let types = Array.from(OrderItemType).map(([id, data]) => { return { value: id, text: data.text } });
        node.append(buildSelect("Loai hang", ORDER_ITEM_CONSTANT.TYPE, this.type, types, DISABLED.YES));

        node.append(buildInput("Don gia", ORDER_ITEM_CONSTANT.PRICE, formatMoney(item.price) + ' VND', "0 VND", DISABLED.YES));
        node.append(buildInput("So luong", ORDER_ITEM_CONSTANT.QUANTITY, this.quantity, 1, DISABLED.YES));
        node.append(buildInput("Tong cong", ORDER_ITEM_CONSTANT.TOTAL, formatMoney(item.price * this.quantity) + ' VND', '0 VND', DISABLED.YES));

        return node;
    }

    buildDeleteModal = () => {
        let node = $('<div/>');
        let item = OrderItemType.get(this.type).items.get(this.itemid);
        node.append(`
            <p class="h5 text-center">
                Ban thuc su muon xoa mon hang <br/>
                <span class="font-weight-bold">${item.text}</span> ?
            </p>
            <br/>
        `)

        let items = Array.from(OrderItemType.get(this.type).items).map(([id, data]) => { return { value: id, text: data.text } });
        node.append(buildSelect("Ten hang", ORDER_ITEM_CONSTANT.NAME, this.itemid, items, DISABLED.YES));

        let types = Array.from(OrderItemType).map(([id, data]) => { return { value: id, text: data.text } });
        node.append(buildSelect("Loai hang", ORDER_ITEM_CONSTANT.TYPE, this.type, types, DISABLED.YES));

        node.append(buildInput("Don gia", ORDER_ITEM_CONSTANT.PRICE, formatMoney(item.price) + ' VND', "0 VND", DISABLED.YES));
        node.append(buildInput("So luong", ORDER_ITEM_CONSTANT.QUANTITY, this.quantity, 1, DISABLED.YES));
        node.append(buildInput("Tong cong", ORDER_ITEM_CONSTANT.TOTAL, formatMoney(item.price * this.quantity) + ' VND', '0 VND', DISABLED.YES));

        return node;
    }
}
//------------ ORDER ITEM: Helper functions --------------------//
function configureCascadingInputs(node) {
    let typeSelect = node.find(`#${ORDER_ITEM_CONSTANT.TYPE}`);
    let nameSelect = node.find(`#${ORDER_ITEM_CONSTANT.NAME}`);
    let price = node.find(`#${ORDER_ITEM_CONSTANT.PRICE}`)
    let quantity = node.find(`#${ORDER_ITEM_CONSTANT.QUANTITY}`)
    let total = node.find(`#${ORDER_ITEM_CONSTANT.TOTAL}`)

    typeSelect.change(function () {
        let type = parseInt($(this).val());
        nameSelect.html(null);
        let nameOptions = Array.from(OrderItemType.get(type).items).map(([id, data]) => { return { value: id, text: data.text } })
        nameOptions.forEach((opt) => {
            nameSelect.append(`
                <option
                    value=${opt.value}
                >
                    ${opt.text}
                </option
            `)
        })
        nameSelect.val(nameOptions[0].value).trigger('change')
    })
    nameSelect.change(function () {
        let itemid = parseInt($(this).val());
        let type = parseInt(typeSelect.val());
        let item = OrderItemType.get(type).items.get(itemid);
        price.val(formatMoney(item.price) + ' VND').trigger('change');
    })
    price.change(function () {
        let itemid = parseInt(nameSelect.val());
        let type = parseInt(typeSelect.val());
        let item = OrderItemType.get(type).items.get(itemid);
        let text = quantity.val();
        if (text && containsOnlyNumber(text)) {
            let n = parseInt(text);
            total.val(formatMoney(item.price * n) + ' VND');
        } else if (!text) {
            total.val("Vui long dien so luong");
        } else {
            total.val("So luong phai la so nguyen");
        }
    })
    quantity.keyup(function () {
        let text = $(this).val();
        if (text && containsOnlyNumber(text)) {
            let itemid = parseInt(nameSelect.val());
            let type = parseInt(typeSelect.val());
            let item = OrderItemType.get(type).items.get(itemid);
            let n = parseInt(text);
            total.val(formatMoney(item.price * n) + ' VND');
        } else if (!text) {
            total.val("Vui long dien so luong");
        } else {
            total.val("So luong phai la so nguyen");
        }
    })
}
//------------ END ORDER ITEM: Helper functions --------------------//