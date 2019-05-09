//-------------------------------- define variables -------------------------------------------//
let movies = [];
let movieFilters = new Map();

//-------------------------------- end define variables ---------------------------------------//

//------------------------------- setup html -------------------------------------------------//
getMovieTypes();

Array.from(MovieTypes)
    .map(([id, typeName]) => `<a class="dropdown-item" href="#" data-id=${id}>${typeName}</a>`)
    .forEach(node => $('#type-dropdown').prepend(node));

setupDropdown();

getMovies();
renderMovieList(movies, movieFilters);

//------------------------------- end setup html ---------------------------------------------//

//------------------------------ setup dropdowns -------------------------------------------//
$('#type-dropdown')
    .children('.dropdown-item:not(:last)')
    .click(function (e) {
        movieFilters.set("movie-type", item => {
            return item.type === $(this).data("id");
        });
        renderMovieList(movies, movieFilters);
    });
$('#type-dropdown')
    .children('.dropdown-item:last')
    .click(e => {
        movieFilters.delete("movie-type");
        renderMovieList(movies, movieFilters);
    });

$('#status-dropdown')
    .children('.dropdown-item:not(:last)')
    .click(function (e) {
        movieFilters.set("movie-status", item => {
            let today = new Date();
            switch ($(this).text()) {
                case "Ngung chieu":
                    return item.end < today;
                case "Dang chieu":
                    return item.start <= today && today <= item.end;
                case "Sap chieu":
                    return today < item.start;
                default:
                    return true;
            }
        });
        renderMovieList(movies, movieFilters);
    });
$('#status-dropdown')
    .children('.dropdown-item:last')
    .click(e => {
        movieFilters.delete("movie-status");
        renderMovieList(movies, movieFilters);
    });

$('.floating-action-btn').click(e => {
    e.preventDefault();
    openNewModal(new Movie(), addCallback);
})

//------------------------------ end setup dropdowns ---------------------------------------//

//------------------------------ setup search bar --------------------------------------------//
let searchCallback = () => {
    let searchText = $('#search-text').val().toLowerCase().split(' ');
    movieFilters.set("movie-search", item => {
        let data = item.getItemData();
        return Object
            .keys(data)
            .map(k => data[k].toLowerCase())
            .filter(field => searchText.filter(txt => field.includes(txt)).length > 0)
            .length > 0;
    });
    renderMovieList(movies, movieFilters);
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
    let id = modalBody.find('#movie-id').val();
    let name = modalBody.find('#movie-name').val();
    let director = modalBody.find('#movie-director').val();
    let actor = modalBody.find('#movie-actor').val();
    let type = modalBody.find('#movie-type').val();
    let length = modalBody.find('#movie-length').val();
    let start = modalBody.find('#movie-start-date').val();
    let end = modalBody.find('#movie-end-date').val();
    let newData = new Movie(
        parseInt(id),
        name,
        director,
        actor,
        parseInt(type),
        length,
        parseDate(start, DAYTIME.START),
        parseDate(end, DAYTIME.END)
    );
    hideModal();
    addMovie(newData);
}
function editCallback(item) {
    return (modalBody) => {
        let name = modalBody.find('#movie-name').val();
        let director = modalBody.find('#movie-director').val();
        let actor = modalBody.find('#movie-actor').val();
        let type = modalBody.find('#movie-type').val();
        let length = modalBody.find('#movie-length').val();
        let start = modalBody.find('#movie-start-date').val();
        let end = modalBody.find('#movie-end-date').val();
        let newData = new Movie(
            item.id,
            name,
            director,
            actor,
            parseInt(type),
            length,
            parseDate(start, DAYTIME.START),
            parseDate(end, DAYTIME.END)
        );
        hideModal();
        updateMovie(item.id, newData);
    };
}
function removeCallback(item) {
    return () => {
        hideModal();
        removeMovie(item.id);
    }
}
function renderMovieList(list, filters) {
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

function applyFilterListToItems(items, filterMap) {
    return Array.from(filterMap)
        .map(([id, filter]) => filter)
        .reduce((prevList, currentFilter) => prevList.filter(currentFilter), items);
}
//------------------------------ end setup helper function -----------------------------------//

//------------------------------ api calls ----------------------------------------------//
function getMovieTypes() {
    MovieTypes = new Map([
        [1, "Tau hai"],
        [2, "Hanh dong"],
        [3, "Kinh di"],
        [4, "Tam ly"],
        [5, "Tinh cam"],
    ])
}

function getMovies() {
    movies = [];
    while (movies.length < 10) {
        let start = new Date(`2019/0${Math.floor(Math.random() * 9) + 1}/0${Math.floor(Math.random() * 9) + 1}`);
        start.setHours(0, 0, 0, 0);
        let end = new Date(`2019/0${Math.floor(Math.random() * 9) + 1}/0${Math.floor(Math.random() * 9) + 1}`);
        end.setHours(23, 59, 59, 9999);
        if (start > end)
            continue;
        movies.push(new Movie(
            Math.floor(Math.random() * 100) + 1,
            'Chem gio (2D Thuyet minh)',
            'Riot',
            'Riven',
            Math.floor(Math.random() * 5) + 1,
            180,
            start,
            end
        ));
    }
}

function removeMovie(id) {
    movies = movies.filter(item => item.id !== id);
    renderMovieList(movies, movieFilters);
}
function updateMovie(id, newData) {
    movies = movies.map(item => {
        return item.id === id ? newData : item;
    })
    renderMovieList(movies, movieFilters);
}
function addMovie(newData) {
    movies.unshift(newData);
    renderMovieList(movies, movieFilters);
}
//------------------------------ end api calls ------------------------------------------//