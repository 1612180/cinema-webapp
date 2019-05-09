//-------------------------------- define variables -------------------------------------------//
let foods = [];
let ticketFilters = new Map();

//-------------------------------- end define variables ---------------------------------------//

//------------------------------- setup html -------------------------------------------------//
getTicketCondition();
getFoodStatus();
Array.from(TicketStatus)
    .map(([id, text]) => `<a class="dropdown-item" href="#" data-id=${id}>${text}</a>`)
    .forEach(node => $('#status-dropdown').prepend(node));

setupDropdown();

getFoods();
renderTicketList(foods, ticketFilters);

//------------------------------- end setup html ---------------------------------------------//

//------------------------------ setup dropdowns -------------------------------------------//
$('#status-dropdown')
    .children('.dropdown-item:not(:last)')
    .click(function (e) {
        ticketFilters.set("ticket-status", item => {
            return item.status === $(this).data("id");
        });
        renderTicketList(foods, ticketFilters);
    });
$('#status-dropdown')
    .children('.dropdown-item:last')
    .click(e => {
        ticketFilters.delete("ticket-status");
        renderTicketList(foods, ticketFilters);
    });

$('.floating-action-btn').click(e => {
    e.preventDefault();
    openNewModal(new Ticket(), addCallback);
})

//------------------------------ end setup dropdowns ---------------------------------------//

//------------------------------ setup search bar --------------------------------------------//
let searchCallback = () => {
    let searchText = $('#search-text').val().toLowerCase().split(' ');
    ticketFilters.set("ticket-search", item => {
        let data = item.getItemData();
        return Object
            .keys(data)
            .map(k => data[k].toLowerCase())
            .filter(field => searchText.filter(txt => field.includes(txt)).length > 0)
            .length > 0;
    });
    renderTicketList(foods, ticketFilters);
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
function addCallback(modalBody) {
    let id = modalBody.find('#ticket-id').val();
    let name = modalBody.find('#ticket-name').val();
    let condition = modalBody.find('#ticket-condition').val();
    let price = modalBody.find('#ticket-price').val();
    let status = modalBody.find('#ticket-status').val();
    let newData = new Ticket(
        parseInt(id),
        name,
        parseInt(condition),
        parseInt(price),
        parseInt(status)
    );
    hideModal();
    addTicket(newData);
}

function editCallback(item) {
    return (modalBody) => {
        let name = modalBody.find('#ticket-name').val();
        let condition = modalBody.find('#ticket-condition').val();
        let price = modalBody.find('#ticket-price').val();
        let status = modalBody.find('#ticket-status').val();
        let newData = new Ticket(
            item.id,
            name,
            parseInt(condition),
            parseInt(price),
            parseInt(status)
        );
        hideModal();
        updateTicket(item.id, newData);
    };
}
function removeCallback(item) {
    return () => {
        hideModal();
        removeTicket(item.id);
    }
}
function renderTicketList(list, filters) {
    let container = $('#container .section-items').children('tbody');
    container.html(null);
    filteredList = applyFilterListToItems(list, filters);
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
function getFoods() {
    foods = [];
    while (foods.length < 10) {
        foods.push(new Ticket(
            Math.floor(Math.random() * 100) + 1,
            'Ve 2D thuong',
            Math.floor(Math.random() * 1) + 1,
            (Math.floor(Math.random() * 5) + 4) * 10000,
            Math.floor(Math.random() * 2) + 1
        ));
    }
}

function getTicketCondition() {
    TicketCondition = new Map([
        [1, "Khong co"]
    ]);
}

function getFoodStatus() {
    TicketStatus = new Map([
        [1, "Dang ap dung"],
        [2, "Ngung ap dung"]
    ]);
}

function removeTicket(id) {
    foods = foods.filter(item => item.id !== id);
    renderTicketList(foods, ticketFilters);
}
function updateTicket(id, newData) {
    foods = foods.map(item => {
        return item.id === id ? newData : item;
    })
    renderTicketList(foods, ticketFilters);
}
function addTicket(newData) {
    foods.unshift(newData);
    renderTicketList(foods, ticketFilters);
}
//------------------------------ end api calls ------------------------------------------//