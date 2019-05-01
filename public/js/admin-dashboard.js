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

//-------------------------------- setup charts -------------------------------------------------//
let incomeCanvas = document.getElementById('income-chart').getContext('2d');
let incomeChart = new Chart(incomeCanvas, {
    type: 'line',
    data: {
        labels: ['30-03', '31-03', '01-04', '02-04'],
        datasets: [{
            data: [500, 600, 540, 630],
            label: 'Doanh thu',
            backgroundColor: '#2D7FF9',
            borderColor: '#2D7FF9',
            borderWidth: 3,
            fill: false
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

let newUserCanvas = document.getElementById('new-user-chart').getContext('2d');
let newUserChart = new Chart(newUserCanvas, {
    type: 'bar',
    data: {
        labels: ['30-03', '31-03', '01-04', '02-04'],
        datasets: [{
            data: [20, 15, 10, 40],
            label: 'So nguoi dung moi',
            backgroundColor: '#2D7FF9',
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

let incomePartitionCanvas = document.getElementById('income-partition-chart').getContext('2d');
let incomePartitionChart = new Chart(incomePartitionCanvas, {
    type: 'pie',
    data: {
        labels: ['Ve phim', 'Thuc an'],
        datasets: [{
            data: [38.18, 61.82],
            label: 'Ty le phan chia doanh thu',
            backgroundColor: ['#2D7FF9', '#d3ebfb'],
        }]
    },
    options: {
        showLines: true,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
//-------------------------------- end setup charts -----------------------------------------//

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
