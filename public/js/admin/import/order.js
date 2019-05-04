//-------------------------------- define letiables -------------------------------------------//
let today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
let changeBothDateFinished = true;
let allTheaters = [];
let currentMovies = [];
let currentOrders = [];
let currentTheaters = [];
//-------------------------------- end define letiables ---------------------------------------//

//------------------------------ setup date picker -------------------------------------------//
let startDatePicker = $('#start-date').datepicker({
    format: 'dd-mm-yy',
    width: 120,
    // modal: true,
    // footer: true,
    maxDate: function () {
        return $('#end-date').val();
    },
    change: handleDateChange
});
let endDatePicker = $('#end-date').datepicker({
    format: 'dd-mm-yy',
    width: 120,
    // modal: true,
    // footer: true,
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

//------------------------------ setup sections ------------------------------------------------//

//------------------------------ end setup sections --------------------------------------------//

//------------------------------- handle functions -----------------------------------------//
function handleDateChange() {
    if (changeBothDateFinished) {
        console.log($('#start-date').val());
        console.log($('#end-date').val());
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
