//-------------------------------- define variables -------------------------------------------//
let movies = [];

//-------------------------------- end define variables ---------------------------------------//

//------------------------------- setup html -------------------------------------------------//
getMovieTypes();

Array.from(MovieTypes)
    .map(([id, typeName]) => `<a class="dropdown-item" href="#" data-id=${id}>${typeName}</a>`)
    .forEach(node => $('#type-dropdown').prepend(node));

setupDropdown();

getMovies();
renderMovieList(movies);

$('.floating-action-btn').click(e => {
    e.preventDefault();
    openNewModal(new Movie(), () => initDatePickers('movie-start-date', 'movie-end-date'));
})

//------------------------------- end setup html ---------------------------------------------//

//------------------------------ setup dropdowns -------------------------------------------//
$('#type-dropdown')
    .children('.dropdown-item:not(:last)')
    .click(function (e) {
        renderMovieList(movies.filter(movie => {
            return movie.type === $(this).data("id");
        }))
    });
$('#type-dropdown')
    .children('.dropdown-item:last')
    .click(e => renderMovieList(movies));

$('#status-dropdown')
    .children('.dropdown-item:not(:last)')
    .click(function (e) {
        renderMovieList(movies.filter(movie => {
            let today = new Date();
            switch ($(this).text()) {
                case "Ngung chieu":
                    return movie.end < today;
                case "Dang chieu":
                    return movie.start <= today && today <= movie.end;
                case "Sap chieu":
                    return today < movie.start;
                default:
                    return true;
            }
        }))
    });
$('#status-dropdown')
    .children('.dropdown-item:last')
    .click(e => renderMovieList(movies));

//------------------------------ end setup dropdowns ---------------------------------------//

//------------------------------ setup search bar --------------------------------------------//
$('#search-bar').submit(e => {
    e.preventDefault();
    let searchText = $('#search-text').val().toLowerCase().split(' ');
    renderMovieList(movies.filter(movie => {
        let data = movie.getItemData();
        return Object
            .keys(data)
            .map(k => data[k].toLowerCase())
            .filter(field => searchText.filter(txt => field.includes(txt)).length > 0)
            .length > 0;
    }))
})
//------------------------------ end setup search bar ---------------------------------------//

//------------------------------ setup helper function ---------------------------------------//
function initDatePickersCallback() {
    initDatePickers('movie-start-date', 'movie-end-date', null);
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
            parseDate(start, true),
            parseDate(end, false)
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
function renderMovieList(list) {
    let container = $('#movies .section-items').children('tbody');
    container.html(null);
    list.forEach(movie => {
        let node = $($.parseHTML(movie.buildListItem().trim()));
        node.children('td:not(:last)').click(e => {
            let submitCallback = () => {
                openEditModal(movie, initDatePickersCallback, editCallback(movie));
            };
            openInfoModal(movie, null, submitCallback);
        });

        node.find('.config-btn').click(e => {
            e.preventDefault();
            openEditModal(movie, initDatePickersCallback, editCallback(movie));
        });
        node.find('.remove-btn').click(e => {
            e.preventDefault();
            openDeleteModal(movie, null, removeCallback(movie));
        });
        container.append(node);
    })
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
    renderMovieList(movies);
}
function updateMovie(id, newData) {
    movies = movies.map(item => {
        return item.id === id ? newData : item;
    })
    renderMovieList(movies);
}
//------------------------------ end api calls ------------------------------------------//