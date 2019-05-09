//-------------------------------- define variables -------------------------------------------//
let theaters = [];
let theaterFilters = new Map();

//-------------------------------- end define variables ---------------------------------------//

//------------------------------- setup html -------------------------------------------------//
getTheaterStatus();
Array.from(TheaterStatus)
    .map(([id, text]) => `<a class="dropdown-item" href="#" data-id=${id}>${text}</a>`)
    .forEach(node => $('#status-dropdown').prepend(node));

setupDropdown();

getTheaters();
renderTheaterList(theaters, theaterFilters);

//------------------------------- end setup html ---------------------------------------------//

//------------------------------ setup dropdowns -------------------------------------------//
$('#status-dropdown')
    .children('.dropdown-item:not(:last)')
    .click(function (e) {
        theaterFilters.set("theater-status", item => {
            return item.status === $(this).data("id");
        });
        renderTheaterList(theaters, theaterFilters);
    });
$('#status-dropdown')
    .children('.dropdown-item:last')
    .click(e => {
        theaterFilters.delete("theater-status");
        renderTheaterList(theaters, theaterFilters);
    });

$('.floating-action-btn').click(e => {
    e.preventDefault();
    openNewModal(new Theater(), addCallback);
})

//------------------------------ end setup dropdowns ---------------------------------------//

//------------------------------ setup search bar --------------------------------------------//
let searchCallback = () => {
    let searchText = $('#search-text').val().toLowerCase().split(' ');
    theaterFilters.set("theater-search", item => {
        let data = item.getItemData();
        return Object
            .keys(data)
            .map(k => data[k].toLowerCase())
            .filter(field => searchText.filter(txt => field.includes(txt)).length > 0)
            .length > 0;
    });
    renderTheaterList(theaters, theaterFilters);
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
    let id = modalBody.find('#theater-id').val();
    let name = modalBody.find('#theater-name').val();
    let address = modalBody.find('#theater-address').val();
    let column = modalBody.find('#theater-column').val();
    let row = modalBody.find('#theater-row').val();
    let ordered = modalBody.find('#theater-ordered').val();
    let status = modalBody.find('#theater-status').val();
    let newData = new Theater(
        parseInt(id),
        name,
        address,
        parseInt(row),
        parseInt(column),
        parseInt(ordered),
        parseInt(status)
    );
    hideModal();
    addTheater(newData);
}

function editCallback(item) {
    return (modalBody) => {
        let name = modalBody.find('#theater-name').val();
        let address = modalBody.find('#theater-address').val();
        let column = modalBody.find('#theater-column').val();
        let row = modalBody.find('#theater-row').val();
        let ordered = modalBody.find('#theater-ordered').val();
        let status = modalBody.find('#theater-status').val();
        let newData = new Theater(
            item.id,
            name,
            address,
            parseInt(row),
            parseInt(column),
            parseInt(ordered),
            parseInt(status)
        );
        hideModal();
        updateTheater(item.id, newData);
    };
}
function removeCallback(item) {
    return () => {
        hideModal();
        removeTheater(item.id);
    }
}
function renderTheaterList(list, filters) {
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
function getTheaters() {
    theaters = [];
    while (theaters.length < 10) {
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
}

function getTheaterStatus() {
    TheaterStatus = new Map([
        [1, "Dang hoat dong"],
        [2, "Ngung hoat dong"],
    ])
}

function removeTheater(id) {
    theaters = theaters.filter(item => item.id !== id);
    renderTheaterList(theaters, theaterFilters);
}
function updateTheater(id, newData) {
    theaters = theaters.map(item => {
        return item.id === id ? newData : item;
    })
    renderTheaterList(theaters, theaterFilters);
}
function addTheater(newData) {
    theaters.unshift(newData);
    renderTheaterList(theaters, theaterFilters);
}
//------------------------------ end api calls ------------------------------------------//