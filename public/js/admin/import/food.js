//-------------------------------- define variables -------------------------------------------//
let foods = [];
let foodFilters = new Map();

//-------------------------------- end define variables ---------------------------------------//

//------------------------------- setup html -------------------------------------------------//
getFoodStatus();
Array.from(FoodStatus)
    .map(([id, text]) => `<a class="dropdown-item" href="#" data-id=${id}>${text}</a>`)
    .forEach(node => $('#status-dropdown').prepend(node));

setupDropdown();

getFoods();
renderFoodList(foods, foodFilters);

//------------------------------- end setup html ---------------------------------------------//

//------------------------------ setup dropdowns -------------------------------------------//
$('#status-dropdown')
    .children('.dropdown-item:not(:last)')
    .click(function (e) {
        foodFilters.set("food-status", item => {
            return item.status === $(this).data("id");
        });
        renderFoodList(foods, foodFilters);
    });
$('#status-dropdown')
    .children('.dropdown-item:last')
    .click(e => {
        foodFilters.delete("food-status");
        renderFoodList(foods, foodFilters);
    });

$('.floating-action-btn').click(e => {
    e.preventDefault();
    openNewModal(new Food(), addCallback);
})

//------------------------------ end setup dropdowns ---------------------------------------//

//------------------------------ setup search bar --------------------------------------------//
let searchCallback = () => {
    let searchText = $('#search-text').val().toLowerCase().split(' ');
    foodFilters.set("food-search", item => {
        let data = item.getItemData();
        return Object
            .keys(data)
            .map(k => data[k].toLowerCase())
            .filter(field => searchText.filter(txt => field.includes(txt)).length > 0)
            .length > 0;
    });
    renderFoodList(foods, foodFilters);
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
    let id = modalBody.find(`#${FOOD_CONSTANT.ID}`).val();
    let name = modalBody.find(`#${FOOD_CONSTANT.NAME}`).val();
    let ingredient = modalBody.find(`#${FOOD_CONSTANT.INGREDIENT}`).val();
    let price = modalBody.find(`#${FOOD_CONSTANT.PRICE}`).val();
    let status = modalBody.find(`#${FOOD_CONSTANT.STATUS}`).val();
    return new Food(
        id,
        name,
        ingredient,
        parseInt(price),
        parseInt(status)
    );
}
function addCallback(modalBody) {
    let newData = getFormData(modalBody);
    hideModal();
    addFood(newData);
}

function editCallback(item) {
    return (modalBody) => {
        let newData = getFormData(modalBody);
        hideModal();
        updateFood(item.id, newData);
    };
}
function removeCallback(item) {
    return () => {
        hideModal();
        removeFood(item.id);
    }
}
function renderFoodList(list, filters) {
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
        foods.push(new Food(
            Math.floor(Math.random() * 100) + 1,
            'Bap rang bo',
            'Bap',
            (Math.floor(Math.random() * 5) + 4) * 10000,
            Math.floor(Math.random() * 2) + 1
        ));
    }
}

function getFoodStatus() {
    FoodStatus = new Map([
        [1, "Dang ban"],
        [2, "Ngung ban"]
    ]);
}

function removeFood(id) {
    foods = foods.filter(item => item.id !== id);
    renderFoodList(foods, foodFilters);
}
function updateFood(id, newData) {
    foods = foods.map(item => {
        return item.id === id ? newData : item;
    })
    renderFoodList(foods, foodFilters);
}
function addFood(newData) {
    foods.unshift(newData);
    renderFoodList(foods, foodFilters);
}
//------------------------------ end api calls ------------------------------------------//