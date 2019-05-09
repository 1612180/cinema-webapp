//-------------------------------- define variables -------------------------------------------//
const DISABLED = {
    YES: true,
    NO: false
}

const DAYTIME = {
    START: true,
    END: false
}

const COMMON_FORM_VALIDATION_OPTIONS = {
    errorElement: "span"
}

//-------------------------------- end define variables ---------------------------------------//

//-------------------------------- setup button group & dropdown ---------------------------------//
function setupButtonGroup() {
    $('.select-one').each(function (groupIndex) {
        let group = $(this).children('button');
        group.click(function () {
            group.each(function (index) {
                $(this).removeClass('btn-primary');
                $(this).addClass('btn-outline-primary');
            });
            $(this).removeClass('btn-outline-primary');
            $(this).addClass('btn-primary');
        });
    });
}

function setupDropdown() {
    $('.dropdown-menu').each(function (groupIndex) {
        let group = $(this).children('.dropdown-item');
        let labelBtn = $(this).prev();
        group.click(function (e) {
            e.preventDefault();
            group.each(function (index) {
                $(this).removeClass('active');
            });
            $(this).addClass('active');
            labelBtn.text($(this).text());
        });
    });
}

//-------------------------------- end setup button group & dropdown ----------------------------//

//------------------------------- utility functions ----------------------------------------//
// FORMAT - CONVERSION
function uniformDateFormat(date) {
    let day = date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate().toString();
    let month = date.getMonth() < 9 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1).toString();
    let year = (date.getFullYear() % 100).toString();

    return day + '-' + month + '-' + year;
}

function parseDate(str, startOfDay) {
    let strData = str.split('-');
    let date = new Date("20" + strData[2], strData[1] - 1, strData[0]);
    if (startOfDay) {
        date.setHours(0, 0, 0, 0);
    } else {
        date.setHours(23, 59, 59, 9999);
    }
    return date;
}

function uniformTimeFormat(date) {
    let hour = date.getHours() < 10 ? ('0' + date.getHours()) : date.getHours().toString();
    let min = date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes().toString();
    let sec = date.getSeconds() < 10 ? ('0' + date.getSeconds()) : date.getSeconds().toString();
    return hour + ':' + min + ':' + sec;
}

function formatMoney(number) {
    return number.toString()
        .split('')
        .reverse()
        .map((v, i) => (i !== 0 & i % 3 === 0) ? [',', v] : v)
        .flat()
        .reverse()
        .join('')
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function slugToCamelCase(str) {
    return str.split('-')
        .map((v, i) => (i === 0) ? v : capitalize(v))
        .join('');
}

// BUILD HTML
function buildRightIconWithTooltip(label, tooltip) {
    return `
        <div class="btn bg-transparent right-icon border-0 custom-tooltip">
            ${label}
            
        </div>
        <div class="tooltiptext alert alert-danger my-1 w-75">
                ${tooltip}
        </div>
    `;
}

function buildErrorTooltip(text) {
    return buildRightIconWithTooltip(
        `<i class="fa fa-exclamation-triangle text-danger" aria-hidden="true"></i>`,
        text
    )
}

function buildInput(label, id, value, placeholder, disabled) {
    let htmlStr = `
        <div class="form-group row align-items-center">
            <label class="col-md-4 control-label font-weight-bold" for="${id}">${label}</label>
            <div class="col-md-8 position-relative input-group">
                <input 
                    id="${id}" 
                    name="${slugToCamelCase(id)}" 
                    type="text" placeholder="${placeholder}"
                    class="form-control input-md rounded-0"
                    ${disabled ? "disabled" : ""}
                    ${value ? `value="${value}"` : ""}
                >
            </div>
        </div>
    `;
    return $($.parseHTML(htmlStr.trim()));
}

function buildSelect(label, id, value, options, disabled) {
    let htmlStr = `
    <div class="form-group row align-items-center">
        <label class="col-md-4 control-label font-weight-bold" for="movie-type">${label}</label>
        <div class="col-md-8">
            <select 
                id="${id}" 
                class="form-control rounded-0 pl-2"
                ${disabled ? "disabled" : ""}
            >
                ${options.map(opt => `
                    <option 
                        value=${opt.value} 
                        ${opt.value === value ? "selected" : ""}
                    >
                        ${opt.text}
                    </option>
                `).join('\n')}
            </select>
        </div>
    </div>
    `;
    return $($.parseHTML(htmlStr.trim()));
}
function buildPriceInput(label, id, value, placeholder, disabled) {
    let price = buildInput(label, id, value, placeholder, disabled);
    let priceText = $(
        `
                <div class="input-group-append">
                    <span class="input-group-text">
                        ${value ? formatMoney(value) + " VND" : `&nbsp;&nbsp;&nbsp;&nbsp;`}
                    </span>
                </div>
            `
    );
    price.find('div').append(priceText);
    price.find('input').keyup(function (e) {
        let text = $(this).val();
        if (text && containsOnlyNumber(text)) {
            priceText.find('span').text(formatMoney(text) + " VND")
        } else {
            priceText.find('span').html("&nbsp;&nbsp;&nbsp;&nbsp;");
        }
    })
    return price;
}

// HTML CONTROLLER
function hideModal() {
    $('#addModal').modal('hide');
}

function openEditModal(item, submitCallback) {
    let modal = $('#addModal');
    let body = modal.find('.modal-dialog .modal-content .modal-body');

    modal.find('#addModalLabel').html('Chinh sua');
    body.html(item.buildEditModal());

    modal.modal('show');

    modal.find("#modal-submit").text("Luu");
    let form = modal.find('#modal-form');
    form.validate({
        ...COMMON_FORM_VALIDATION_OPTIONS,
        ...item.buildValidationRules(),
    });

    form.off('submit').submit(e => {
        e.preventDefault();
        if (form.valid() && submitCallback) {
            submitCallback(body);
        }
    });
}

function openNewModal(item, submitCallback) {
    let modal = $('#addModal');
    let body = modal.find('.modal-dialog .modal-content .modal-body');

    modal.find('#addModalLabel').html('Them moi');
    body.html(item.buildNewModal());

    modal.modal('show');

    modal.find("#modal-submit").text("Luu");
    let form = modal.find('#modal-form');
    form.validate({
        ...COMMON_FORM_VALIDATION_OPTIONS,
        ...item.buildValidationRules(),
    });

    form.off('submit').submit(e => {
        e.preventDefault();
        if (form.valid() && submitCallback) {
            submitCallback(body);
        }
    });
}

function openInfoModal(item, submitCallback) {
    let modal = $('#addModal');
    let body = modal.find('.modal-dialog .modal-content .modal-body');

    modal.find('#addModalLabel').html('Thong tin');
    body.html(item.buildInfoModal());

    modal.modal('show');

    modal.find("#modal-submit").text("Chinh sua");
    modal.find('#modal-form').off('submit').submit(e => {
        e.preventDefault();
        if (submitCallback) {
            submitCallback(body);
        }
    })
}

function openDeleteModal(item, submitCallback) {
    let modal = $('#addModal');
    let body = modal.find('.modal-dialog .modal-content .modal-body');

    modal.find('#addModalLabel').html(`
        <div class="text-danger">
            <i class="fa fa-exclamation-triangle text-danger" aria-hidden="true"></i>
            &nbsp;
            Xoa
        </div>
    `);
    body.html(item.buildDeleteModal());

    modal.modal('show');

    modal.find("#modal-submit").text("Xoa");
    modal.find('#modal-form').off('submit').submit(e => {
        e.preventDefault();
        if (submitCallback) {
            submitCallback(body);
        }
    })
}

// INIT JS
function initDatePickers(startID, endID, maxDate = new Date()) {
    if (maxDate) {
        $(`#${startID}:not(:disabled)`).datepicker({
            format: 'dd-mm-yy',
            width: 150,
            minDate: new Date("2000/01/01"),
            maxDate: function () {
                return $(`#${endID}`).val() ? $(`#${endID}`).val() : maxDate;
            },
        });
        $(`#${endID}:not(:disabled)`).datepicker({
            format: 'dd-mm-yy',
            width: 150,
            minDate: function () {
                return $(`#${startID}`).val();
            },
        });
    } else {
        $(`#${startID}:not(:disabled)`).datepicker({
            format: 'dd-mm-yy',
            width: 150,
            minDate: new Date("2000/01/01"),
            maxDate: function () {
                return $(`#${endID}`).val();
            },
        });
        $(`#${endID}:not(:disabled)`).datepicker({
            format: 'dd-mm-yy',
            width: 150,
            maxDate: maxDate,
            minDate: function () {
                return $(`#${startID}`).val();
            },
        });
    }
}
function initDatePickersInNode(rootNode, startID, endID, maxDate = new Date()) {
    if (maxDate) {
        rootNode.find(`#${startID}:not(:disabled)`).datepicker({
            format: 'dd-mm-yy',
            width: 150,
            minDate: new Date("2000/01/01"),
            maxDate: function () {
                return $(`#${endID}`).val() ? $(`#${endID}`).val() : maxDate;
            },
        });
        rootNode.find(`#${endID}:not(:disabled)`).datepicker({
            format: 'dd-mm-yy',
            width: 150,
            minDate: function () {
                return $(`#${startID}`).val();
            },
        });
    } else {
        rootNode.find(`#${startID}:not(:disabled)`).datepicker({
            format: 'dd-mm-yy',
            width: 150,
            minDate: new Date("2000/01/01"),
            maxDate: function () {
                return $(`#${endID}`).val();
            },
        });
        rootNode.find(`#${endID}:not(:disabled)`).datepicker({
            format: 'dd-mm-yy',
            width: 150,
            maxDate: maxDate,
            minDate: function () {
                return $(`#${startID}`).val();
            },
        });
    }
}

// MISC
function applyFilterListToItems(items, filterMap) {
    return Array.from(filterMap)
        .map(([id, filter]) => filter)
        .reduce((prevList, currentFilter) => prevList.filter(currentFilter), items);
}

function makeDelay(ms) {
    let timer = 0;
    return (callback) => {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    }
}

function isDigit(n) {
    return [true, true, true, true, true, true, true, true, true, true][n];
}

function containsOnlyNumber(str) {
    return str.split('').every(c => isDigit(c));
}
        //------------------------------- end utility functions ------------------------------------//
