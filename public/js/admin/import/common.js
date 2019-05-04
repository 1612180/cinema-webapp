//-------------------------------- define variables -------------------------------------------//
const REQUIRED = {
    YES: true,
    NO: false
}

const DISABLED = {
    YES: true,
    NO: false
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

function buildInput(label, id, value, placeholder, required, disabled) {
    return `
        <div class="form-group row align-items-center">
            <label class="col-md-4 control-label font-weight-bold" for="${id}">${label}</label>
            <div class="col-md-8">
                <input 
                    id="${id}" 
                    type="text" placeholder="${placeholder}"
                    class="form-control input-md rounded-0"
                    ${required ? "required" : ""}
                    ${disabled ? "disabled" : ""}
                    ${value ? `value="${value}"` : ""}
                >
            </div>
        </div>
    `
}

function buildSelect(label, id, value, options, disabled) {
    return `
    <div class="form-group row align-items-center">
        <label class="col-md-4 control-label font-weight-bold" for="movie-type">${label}</label>
        <div class="col-md-8">
            <select 
                id="${id}" 
                class="form-control rounded-0 pl-2"
                ${disabled ? "disabled" : ""}
                ${value ? `value="${value}"` : ""}
            >
                ${options.map(opt => `<option value=${opt.value}>${opt.text}</option>`).join('\n')}
            </select>
        </div>
    </div>
    `
}

function hideModal() {
    $('#addModal').modal('hide');
}

function openEditModal(item, callback, submitCallback) {
    let modal = $('#addModal');
    let body = modal.find('.modal-dialog .modal-content .modal-body');

    modal.find('#addModalLabel').html('Chinh sua');
    body.html(item.buildEditModal());

    modal.modal('show');

    let submitButton = modal.find("#modal-submit");
    submitButton.text("Luu");
    submitButton.off('click').click(e => {
        if (submitCallback) {
            submitCallback(body);
        }
    });

    if (callback) {
        callback();
    }
}

function openNewModal(item, callback, submitCallback) {
    let modal = $('#addModal');
    let body = modal.find('.modal-dialog .modal-content .modal-body');

    modal.find('#addModalLabel').html('Them moi');
    body.html(item.buildNewModal());

    modal.modal('show');

    let submitButton = modal.find("#modal-submit");
    submitButton.text("Luu");
    submitButton.off('click').click(e => {
        if (submitCallback) {
            submitCallback();
        }
    });


    if (callback) {
        callback();
    }
}

function openInfoModal(item, callback, submitCallback) {
    let modal = $('#addModal');
    let body = modal.find('.modal-dialog .modal-content .modal-body');

    modal.find('#addModalLabel').html('Thong tin');
    body.html(item.buildInfoModal());

    modal.modal('show');

    let submitButton = modal.find("#modal-submit");
    submitButton.text("Chinh sua");
    submitButton.off('click').click(e => {
        if (submitCallback) {
            submitCallback();
        }
    });

    if (callback) {
        callback();
    }
}

function openDeleteModal(item, callback, submitCallback) {
    let modal = $('#addModal');
    let body = modal.find('.modal-dialog .modal-content .modal-body');

    modal.find('#addModalLabel').html(`
        <div class="text-danger">
            <i class="fa fa-exclamation-triangle text-danger" aria-hidden="true"></i>
            &nbsp;
            Xoa
        </div>
    `);
    body.html(
        `
        <p>
            Ban co thuc su muon xoa ?
        </p>
        `
    );

    modal.modal('show');

    let submitButton = modal.find("#modal-submit");
    submitButton.text("Xoa");
    submitButton.off('click').click(e => {
        if (submitCallback) {
            submitCallback();
        }
    });


    if (callback) {
        callback();
    }
}

function initDatePickers(startID, endID, maxDate = new Date()) {
    $(`#${startID}:not(:disabled)`).datepicker({
        format: 'dd-mm-yy',
        width: 150,
        minDate: new Date("2000/01/01"),
        maxDate: function () {
            return $(`#${endID}`).val() ? $(`#${endID}`).val() : new Date();
        },
    });
    if (maxDate) {
        $(`#${endID}:not(:disabled)`).datepicker({
            format: 'dd-mm-yy',
            width: 150,
            minDate: function () {
                return $(`#${startID}`).val();
            },
        });
    } else {
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
//------------------------------- end utility functions ------------------------------------//
