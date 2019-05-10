// Food 
let FoodStatus = new Map();

const FOOD_CONSTANT = {
    ID: "food-id",
    NAME: "food-name",
    INGREDIENT: "food-ingredient",
    PRICE: "food-price",
    STATUS: "food-status",
}

class Food {
    constructor(id, name, ingredient, price, status) {
        this.id = id;
        this.name = name;
        this.ingredient = ingredient;
        this.price = price;
        this.status = status;
    }

    getItemData = () => {
        return {
            id: this.id.toString(),
            name: this.name,
            ingredient: this.ingredient,
            price: this.price.toString(),
            status: FoodStatus.get(this.status)
        };
    }

    buildListItem = () => {
        let textColor = this.status === 1 ? "text-success" : "text-danger";

        let htmlStr = `
            <tr>
                <td class="text-center">${this.id}</td>
                <td>${this.name}</td>
                <td>${this.ingredient}</td>
                <td class="text-right">${formatMoney(this.price) + " VND"}</td>
                <td class="text-center ${textColor}">${FoodStatus.get(this.status)}</td>
                <td class="text-right">
                    <a href="#" class="config-btn"><i class="fas fa-cog    "></i></a>
                    /
                    <a href="#" class="remove-btn"><i class="fas fa-times    "></i></a>
                </td>
            </tr>
        `;
        return $($.parseHTML(htmlStr.trim()));
    };

    buildValidationRules = () => {
        return {
            rules: {
                foodId: {
                    required: true,
                    digits: true
                },
                foodName: "required",
                foodPrice: {
                    required: true,
                    digits: true
                }
            },
            messages: {
                foodId: {
                    required: buildErrorTooltip("Vui long dien ma thuc an"),
                    digits: buildErrorTooltip("Ma thuc an phai la so nguyen")
                },
                foodName: buildErrorTooltip("Vui long dien ten thuc an"),
                foodPrice: {
                    required: buildErrorTooltip("Vui long dien gia thuc an"),
                    digits: buildErrorTooltip("Gia thuc an phai la so nguyen")
                }
            }
        }
    }

    buildEditModal = () => {
        let node = $('<div/>');
        let statuses = Array.from(FoodStatus).map(([id, text]) => { return { value: id, text: text } });
        node.append(buildInput("Ma loai", FOOD_CONSTANT.ID, this.id, 1, DISABLED.YES));
        node.append(buildInput("Ten thuc an", FOOD_CONSTANT.NAME, this.name, "Ten thuc an", DISABLED.NO));
        node.append(buildInput("Thanh phan", FOOD_CONSTANT.INGREDIENT, this.ingredient, "Thanh phan", DISABLED.NO));
        node.append(buildPriceInput("Gia tien", FOOD_CONSTANT.PRICE, this.price, "50000", DISABLED.NO));
        node.append(buildSelect("Tinh trang", FOOD_CONSTANT.STATUS, this.status, statuses, DISABLED.NO));
        return node;
    }

    buildNewModal = () => {
        let node = $('<div/>');
        let statuses = Array.from(FoodStatus).map(([id, text]) => { return { value: id, text: text } });
        node.append(buildInput("Ma loai", FOOD_CONSTANT.ID, null, 1, DISABLED.NO));
        node.append(buildInput("Ten thuc an", FOOD_CONSTANT.NAME, null, "Ten thuc an", DISABLED.NO));
        node.append(buildInput("Thanh phan", FOOD_CONSTANT.INGREDIENT, null, "Thanh phan", DISABLED.NO));
        node.append(buildPriceInput("Gia tien", FOOD_CONSTANT.PRICE, null, "50000", DISABLED.NO));
        node.append(buildSelect("Tinh trang", FOOD_CONSTANT.STATUS, null, statuses, DISABLED.NO));
        return node;
    }

    buildInfoModal = () => {
        let node = $('<div/>');
        let statuses = Array.from(FoodStatus).map(([id, text]) => { return { value: id, text: text } });
        node.append(buildInput("Ma loai", FOOD_CONSTANT.ID, this.id, 1, DISABLED.YES));
        node.append(buildInput("Ten thuc an", FOOD_CONSTANT.NAME, this.name, "Ten thuc an", DISABLED.YES));
        node.append(buildInput("Thanh phan", FOOD_CONSTANT.INGREDIENT, this.ingredient, "Thanh phan", DISABLED.YES));
        node.append(buildInput("Gia tien", FOOD_CONSTANT.PRICE, formatMoney(this.price) + " VND", "50,000 VND", DISABLED.YES));
        node.append(buildSelect("Tinh trang", FOOD_CONSTANT.STATUS, this.status, statuses, DISABLED.YES));
        return node;
    }

    buildDeleteModal = () => {
        let node = $('<div/>');
        node.append(`
            <p class="h5 text-center">
                Ban thuc su muon xoa loai thuc an <br/>
                <span class="font-weight-bold">${this.name}</span> ?
            </p>
            <br/>
        `)
        let statuses = Array.from(FoodStatus).map(([id, text]) => { return { value: id, text: text } });
        node.append(buildInput("Ma loai", FOOD_CONSTANT.ID, this.id, 1, DISABLED.YES));
        node.append(buildInput("Ten thuc an", FOOD_CONSTANT.NAME, this.name, "Ten thuc an", DISABLED.YES));
        node.append(buildInput("Thanh phan", FOOD_CONSTANT.INGREDIENT, this.ingredient, "Thanh phan", DISABLED.YES));
        node.append(buildInput("Gia tien", FOOD_CONSTANT.PRICE, formatMoney(this.price) + " VND", "50,000 VND", DISABLED.YES));
        node.append(buildSelect("Tinh trang", FOOD_CONSTANT.STATUS, this.status, statuses, DISABLED.YES));
        return node;
    }
}
