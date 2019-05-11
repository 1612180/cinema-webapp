//-------------------------------- define variables -------------------------------------------//
let today = new Date();
let changeBothDateFinished = true;

let currentTheaters = [];
let currentMovies = [];
let currentOrders = [];
let currentOrderCount = 0;
let allTheaters = [];
let lastLoginDate = new Date();

//-------------------------------- end define variables ---------------------------------------//

//------------------------------- setup html -------------------------------------------------//
getBasicSystemInfo()
setupHTML();

setupButtonGroup(() => {
    startDatePicker.value(null);
    endDatePicker.value(null);
});
setupDropdown();

//------------------------------- end setup html ---------------------------------------------//

//------------------------------- setup timer ------------------------------------------------//
window.setInterval(() => $('#current-time').text(uniformTimeFormat(new Date())), 60 * 1000)
//------------------------------- end setup timer --------------------------------------------//

//------------------------------ setup date picker -------------------------------------------//
let startDatePicker = $('#start-date').datepicker({
    format: 'dd-mm-yy',
    width: 120,
    maxDate: function () {
        return $('#end-date').val();
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

$('#refresh-btn').click(e => {
    getBasicSystemInfo();
    setupHTML();
    setupDropdown();
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
function getWeekDay(date) {
    let day = date.getDay();
    if (day < 7) {
        return `Thu ${day + 1}`;
    }
    return 'Chu nhat';
}
//------------------------------- end utility functions ------------------------------------//

//------------------------------ api calls -----------------------------------------------//
function getBasicSystemInfo() {
    currentTheaters = new Array(4).fill(sampleTheater);
    currentMovies = new Array(4).fill(sampleMovie);
    currentOrders = new Array(4).fill(sampleOrder);
    currentOrderCount = 100;
    allTheaters = [
        {
            id: 1,
            name: "Nigamon Nguyen Van Cu"
        },
        {
            id: 2,
            name: "Nigamon Quang Trung"
        },
        {
            id: 3,
            name: "Nigamon Nguyen Van Qua"
        }
    ];
    lastLoginDate = new Date("2019/04/02");
}

function setupHTML() {
    today = new Date();
    $('#last-login-date').text(uniformDateFormat(lastLoginDate));
    $('#current-day').text(getWeekDay(today));
    $('#current-date').text(uniformDateFormat(today));
    $('#current-time').text(uniformTimeFormat(today));
    $('#orders .section-items')
        .children('tbody')
        .html(currentOrders.map(item => item.buildListItem()).join('\n'));
    $('#movies .section-items')
        .children('tbody')
        .html(currentMovies.map(item => item.buildListItem()).join('\n'));
    $('#theaters .section-items')
        .children('tbody')
        .html(currentTheaters.map(item => item.buildListItem()).join('\n'));
    $('#movieCount').text(currentMovies.length);
    $('#orderCount').text(currentOrderCount);
    $('#theaterCount').text(currentTheaters.length);

    $('#all-theaters').html(`
        <div class="dropdown-divider"></div>
        <a class="dropdown-item active" href="#">Tat ca rap</a>`
    );
    allTheaters
        .map(theater => `<a class="dropdown-item" href="#" data-id=${theater.id}>${theater.name}</a>`)
        .forEach(node => $('#all-theaters').prepend(node));
}

//------------------------------ end api calls -----------------------------------------------//
