// Ticket 
let TicketStatus = new Map();
let TicketCondition = new Map();

class Ticket {
    constructor(id, name, condition, price, status) {
        this.id = id;
        this.name = name;
        this.condition = condition;
        this.price = price;
        this.status = status;
    }

    getItemData = () => {
        return {
            id: this.id.toString(),
            name: this.name,
            condition: TicketCondition.get(this.condition),
            price: formatMoney(this.price) + " VND",
            status: TicketStatus.get(this.status)
        };
    }

    buildListItem = () => {
        let textColor = this.status === 1 ? "text-success" : "text-danger";

        let htmlStr = `
            <tr>
                <td class="text-center">${this.id}</td>
                <td>${this.name}</td>
                <td>${TicketCondition.get(this.condition)}</td>
                <td class="text-right">${formatMoney(this.price) + " VND"}</td>
                <td class="text-center ${textColor}">${TicketStatus.get(this.status)}</td>
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
                ticketId: {
                    required: true,
                    digits: true
                },
                ticketName: "required",
                ticketPrice: {
                    required: true,
                    digits: true
                }
            },
            messages: {
                ticketId: {
                    required: buildErrorTooltip("Vui long dien ma loai ve"),
                    digits: buildErrorTooltip("Ma loai ve phai la so nguyen")
                },
                ticketName: buildErrorTooltip("Vui long dien ten loai ve"),
                ticketPrice: {
                    required: buildErrorTooltip("Vui long dien gia ve"),
                    digits: buildErrorTooltip("Gia ve phai la so nguyen")
                }
            }
        }
    }

    buildEditModal = () => {
        let node = $('<div/>');
        let conditions = Array.from(TicketCondition).map(([id, text]) => { return { value: id, text: text } });
        let statuses = Array.from(TicketStatus).map(([id, text]) => { return { value: id, text: text } });
        node.append(buildInput("Ma loai", "ticket-id", this.id, 1, DISABLED.YES));
        node.append(buildInput("Ten loai ve", "ticket-name", this.name, "Ten loai ve", DISABLED.NO));
        node.append(buildSelect("Dieu kien mua", "ticket-condition", this.condition, conditions, DISABLED.NO));
        node.append(buildPriceInput("Gia tien", "ticket-price", this.price, "50000", DISABLED.NO));
        node.append(buildSelect("Tinh trang", "ticket-status", this.status, statuses, DISABLED.NO));
        return node;
    }

    buildNewModal = () => {
        let node = $('<div/>');
        let conditions = Array.from(TicketCondition).map(([id, text]) => { return { value: id, text: text } });
        let statuses = Array.from(TicketStatus).map(([id, text]) => { return { value: id, text: text } });
        node.append(buildInput("Ma loai", "ticket-id", null, 1, DISABLED.NO));
        node.append(buildInput("Ten loai ve", "ticket-name", null, "Ten loai ve", DISABLED.NO));
        node.append(buildSelect("Dieu kien mua", "ticket-condition", null, conditions, DISABLED.NO));
        node.append(buildPriceInput("Gia tien", "ticket-price", null, "50000", DISABLED.NO));
        node.append(buildSelect("Tinh trang", "ticket-status", null, statuses, DISABLED.NO));
        return node;
    }

    buildInfoModal = () => {
        let node = $('<div/>');
        let conditions = Array.from(TicketCondition).map(([id, text]) => { return { value: id, text: text } });
        let statuses = Array.from(TicketStatus).map(([id, text]) => { return { value: id, text: text } });
        node.append(buildInput("Ma loai", "ticket-id", this.id, 1, DISABLED.YES));
        node.append(buildInput("Ten loai ve", "ticket-name", this.name, "Ten loai ve", DISABLED.YES));
        node.append(buildSelect("Dieu kien mua", "ticket-condition", this.condition, conditions, DISABLED.YES));
        node.append(buildInput("Gia tien", "ticket-price", formatMoney(this.price) + " VND", "50,000 VND", DISABLED.YES));
        node.append(buildSelect("Tinh trang", "ticket-status", this.status, statuses, DISABLED.YES));
        return node;
    }

    buildDeleteModal = () => {
        let node = $('<div/>');
        node.append(`
            <p class="h5 text-center">
                Ban thuc su muon xoa loai ve <br/>
                <span class="font-weight-bold">${this.name}</span> ?
            </p>
            <br/>
        `)
        let conditions = Array.from(TicketCondition).map(([id, text]) => { return { value: id, text: text } });
        let statuses = Array.from(TicketStatus).map(([id, text]) => { return { value: id, text: text } });
        node.append(buildInput("Ma loai", "ticket-id", this.id, 1, DISABLED.YES));
        node.append(buildInput("Ten loai ve", "ticket-name", this.name, "Ten loai ve", DISABLED.YES));
        node.append(buildSelect("Dieu kien mua", "ticket-condition", this.condition, conditions, DISABLED.YES));
        node.append(buildInput("Gia tien", "ticket-price", formatMoney(this.price) + " VND", "50,000 VND", DISABLED.YES));
        node.append(buildSelect("Tinh trang", "ticket-status", this.status, statuses, DISABLED.YES));
        return node;
    }
}
