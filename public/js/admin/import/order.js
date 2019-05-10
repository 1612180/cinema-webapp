//-------------------------------- define variables -------------------------------------------//
let today = new Date();
let changeBothDateFinished = true;

let orders = [];
let orderFilters = new Map();

let startPrice = -1;
let endPrice = -1;

//-------------------------------- end define variables ---------------------------------------//

//------------------------------- setup html -------------------------------------------------//
getOrderStatus();
Array.from(OrderStatus)
    .map(([id, typeName]) => `<a class="dropdown-item" href="#" data-id=${id}>${typeName}</a>`)
    .forEach(node => $('#status-dropdown').prepend(node));

getTheaters();
Array.from(OrderTheater)
    .map(([id, theaterName]) => `<a class="dropdown-item" href="#" data-id=${id}>${theaterName}</a>`)
    .forEach(node => $('#theater-dropdown').prepend(node));

getMoneyBars();
OrderMoneyBar
    .map(money => `<a class="dropdown-item" href="#" data-id=${money}>${formatMoney(money) + ' VND'}</a>`)
    .forEach(node => {
        $('#start-price-dropdown').prepend(node)
        $('#end-price-dropdown').prepend(node)
    });

setupDropdown();
setupButtonGroup(() => {
    orderFilters.delete(ORDER_CONSTANT.DATETIME);
    renderOrderList(orders, orderFilters);
});

getOrders();
renderOrderList(orders, orderFilters);

//------------------------------- end setup html ---------------------------------------------//

//------------------------------ setup date picker -------------------------------------------//
let startDatePicker = $('#start-date').datepicker({
    format: 'dd-mm-yy',
    width: 120,
    maxDate: function () {
        return $('#end-date').val() ? $('#end-date').val() : today;
    },
    change: handleDateChange
});
let endDatePicker = $('#end-date').datepicker({
    format: 'dd-mm-yy',
    width: 120,
    maxDate: today,
    minDate: function () {
        return $('#start-date').val();
    },
    change: handleDateChange
});

$('#today').click(function () {
    changeBothDate(today, today);
});
$('#this-week').click(function () {
    let start = new Date(today.getTime());
    while (start.getDay() !== 0) {
        start.setDate(start.getDate() - 1);
    }
    changeBothDate(start, today);
});
$('#last-week').click(function () {
    let start = new Date(today.getTime());
    let end = new Date(today.getTime());

    while (start.getDay() !== 0) {
        start.setDate(start.getDate() - 1);
    }
    start.setDate(start.getDate() - 1);
    while (start.getDay() !== 0) {
        start.setDate(start.getDate() - 1);
    }

    while (end.getDay() !== 6) {
        end.setDate(end.getDate() - 1);
    }

    changeBothDate(start, end);
});

//------------------------------ end setup date picker -------------------------------------------//

//------------------------------ setup dropdowns -------------------------------------------//
$('#theater-dropdown')
    .children('.dropdown-item:not(:last)')
    .click(function (e) {
        orderFilters.set(ORDER_CONSTANT.THEATER, item => {
            return item.theater === $(this).data("id");
        });
        renderOrderList(orders, orderFilters);
    });
$('#theater-dropdown')
    .children('.dropdown-item:last')
    .click(e => {
        orderFilters.delete(ORDER_CONSTANT.THEATER);
        renderOrderList(orders, orderFilters);
    });

$('#status-dropdown')
    .children('.dropdown-item:not(:last)')
    .click(function (e) {
        orderFilters.set(ORDER_CONSTANT.STATUS, item => {
            return item.status === $(this).data("id");
        });
        renderOrderList(orders, orderFilters);
    });
$('#status-dropdown')
    .children('.dropdown-item:last')
    .click(e => {
        orderFilters.delete(ORDER_CONSTANT.STATUS);
        renderOrderList(orders, orderFilters);
    });

$('#status-dropdown')
    .children('.dropdown-item:not(:last)')
    .click(function (e) {
        orderFilters.set(ORDER_CONSTANT.STATUS, item => {
            return item.status === $(this).data("id");
        });
        renderOrderList(orders, orderFilters);
    });
$('#status-dropdown')
    .children('.dropdown-item:last')
    .click(e => {
        orderFilters.delete(ORDER_CONSTANT.STATUS);
        renderOrderList(orders, orderFilters);
    });

// money
function filterMoney(value) {
    if (startPrice === -1 && endPrice === -1) {
        return true;
    } else if (startPrice === -1) {
        return value <= endPrice;
    } else if (endPrice === -1) {
        return value >= startPrice;
    }
    return startPrice <= value && value <= endPrice;
}
function enableAll(priceId) {
    $(`#${priceId}`)
        .children('.dropdown-item:not(:last)')
        .filter((i, child) => $(child).hasClass('disabled'))
        .removeClass('disabled')
}
function disableStartPrices(currentEndPrice) {
    $('#start-price-dropdown')
        .children('.dropdown-item:not(:last)')
        .filter((i, child) => $(child).data("id") > currentEndPrice)
        .addClass('disabled');
}
function disableEndPrices(currentStartPrice) {
    $('#end-price-dropdown')
        .children('.dropdown-item:not(:last)')
        .filter((i, child) => {
            return $(child).data("id") < currentStartPrice
        })
        .addClass('disabled');
}
$('#start-price-dropdown')
    .children('.dropdown-item:not(:last)')
    .click(function (e) {
        startPrice = $(this).data("id");
        enableAll('end-price-dropdown');
        disableEndPrices(startPrice);
        orderFilters.set(ORDER_CONSTANT.TOTAL, item => {
            return filterMoney(item.total);
        });
        renderOrderList(orders, orderFilters);
    });
$('#start-price-dropdown')
    .children('.dropdown-item:last')
    .click(e => {
        startPrice = -1;
        enableAll('end-price-dropdown');
        orderFilters.set(ORDER_CONSTANT.TOTAL, item => {
            return filterMoney(item.total);
        });
        renderOrderList(orders, orderFilters);
    });
$('#end-price-dropdown')
    .children('.dropdown-item:not(:last)')
    .click(function (e) {
        endPrice = $(this).data("id");
        enableAll('start-price-dropdown');
        disableStartPrices(endPrice);
        orderFilters.set(ORDER_CONSTANT.TOTAL, item => {
            return filterMoney(item.total);
        });
        renderOrderList(orders, orderFilters);
    });
$('#end-price-dropdown')
    .children('.dropdown-item:last')
    .click(e => {
        endPrice = -1;
        enableAll('start-price-dropdown');
        orderFilters.set(ORDER_CONSTANT.TOTAL, item => {
            return filterMoney(item.total);
        });
        renderOrderList(orders, orderFilters);
    });

$('.floating-action-btn').click(e => {
    e.preventDefault();
    openNewModal(new Order(), addCallback);
})

//------------------------------ end setup dropdowns ---------------------------------------//



//------------------------------- handle functions -----------------------------------------//
function handleDateChange() {
    if (changeBothDateFinished) {
        console.log($('#start-date').val());
        console.log($('#end-date').val());
        let startDate = parseDate($('#start-date').val(), DAYTIME.START);
        let endDate = parseDate($('#end-date').val(), DAYTIME.END);
        orderFilters.set(ORDER_CONSTANT.DATETIME, item => {
            return startDate <= item.datetime && item.datetime <= endDate;
        });
        renderOrderList(orders, orderFilters);
    }
}
//------------------------------- end handle functions -------------------------------------//

//------------------------------- utility functions ----------------------------------------//
function changeBothDate(start, end) {
    changeBothDateFinished = false;
    startDatePicker.value(start);
    changeBothDateFinished = true;
    endDatePicker.value(end);
}

//------------------------------- end utility functions ------------------------------------//


//------------------------------ setup search bar --------------------------------------------//
let searchCallback = () => {
    let searchText = $('#search-text').val().toLowerCase().split(' ');
    orderFilters.set("order-search", item => {
        let data = item.getItemData();
        return Object
            .keys(data)
            .map(k => data[k].toLowerCase())
            .filter(field => searchText.filter(txt => field.includes(txt)).length > 0)
            .length > 0;
    });
    renderOrderList(orders, orderFilters);
}
let delayCaller = makeDelay(500);

$('#search-bar').submit(e => {
    e.preventDefault();
    searchCallback();
})
$('#search-bar #search-text').keydown(e => {
    delayCaller(searchCallback);
})
//------------------------------ end setup search bar ---------------------------------------//

//------------------------------ setup helper function ---------------------------------------//
function getFormData(modalBody) {
    let id = modalBody.find(`#${ORDER_CONSTANT.ID}`).val();
    let username = modalBody.find(`#${ORDER_CONSTANT.USERNAME}`).val();
    let datetime = modalBody.find(`#${ORDER_CONSTANT.DATETIME}`).val();
    let theater = modalBody.find(`#${ORDER_CONSTANT.THEATER}`).val();
    let total = modalBody.find(`#${ORDER_CONSTANT.TOTAL}`).val();
    let status = modalBody.find(`#${ORDER_CONSTANT.STATUS}`).val();
    return new Order(
        id,
        username,
        parseDateTime(datetime),
        parseInt(theater),
        parseInt(total),
        parseInt(status)
    );
}
function addCallback(modalBody) {
    let newData = getFormData(modalBody);
    hideModal();
    addOrder(newData);
}

function editCallback(item) {
    return (modalBody) => {
        let newData = getFormData(modalBody);
        hideModal();
        updateOrder(item.id, newData);
    };
}
function removeCallback(item) {
    return () => {
        hideModal();
        removeOrder(item.id);
    }
}

function renderOrderList(list, filters) {
    let container = $('#container .section-items').children('tbody');
    container.html(null);
    let filteredList = applyFilterListToItems(list, filters);
    filteredList.forEach(item => {
        let node = item.buildListItem();
        node.children('td:not(:last)').click(e => {
            let submitCallback = () => {
                openEditModal(item, editCallback(item));
            };
            openInfoModal(item, submitCallback);
        });

        node.find('.config-btn').click(e => {
            e.preventDefault();
            openEditModal(item, editCallback(item));
        });
        node.find('.remove-btn').click(e => {
            e.preventDefault();
            openDeleteModal(item, removeCallback(item));
        });
        container.append(node);
    })
}

//------------------------------ end setup helper function -----------------------------------//

//------------------------------ api calls ----------------------------------------------//
function getOrderStatus() {
    OrderStatus = new Map([
        [3, "Huy"],
        [2, "Cho thanh toan"],
        [1, "Chap nhan"]
    ])
}
function getTheaters() {
    OrderTheater = new Map([
        [1, "Nigamon Nguyen Van Cu"],
        [2, "Nigamon Nguyen Van Qua"],
        [3, "Nigamon Quang Trung"]
    ])
}

function getMoneyBars() {
    OrderMoneyBar = new Array(
        1000000,
        500000,
        200000,
        100000,
        50000,
    )
}

function getOrders() {
    orders = [];
    while (orders.length < 10) {
        let datetime = new Date(`2019/0${Math.floor(Math.random() * 9) + 1}/0${Math.floor(Math.random() * 9) + 1}`);
        orders.push(new Order(
            Math.floor(Math.random() * 100) + 1,
            'leHauBoi',
            datetime,
            Math.floor(Math.random() * 3) + 1,
            (Math.floor(Math.random() * 10) + 0) * 10000 + (Math.floor(Math.random() * 2) + 0) * 100000,
            Math.floor(Math.random() * 3) + 1,
        ));
    }
}

function removeOrder(id) {
    orders = orders.filter(item => item.id !== id);
    renderOrderList(orders, orderFilters);
}
function updateOrder(id, newData) {
    orders = orders.map(item => {
        return item.id === id ? newData : item;
    })
    renderOrderList(orders, orderFilters);
}
function addOrder(newData) {
    orders.unshift(newData);
    renderOrderList(orders, orderFilters);
}
//------------------------------ end api calls ------------------------------------------//