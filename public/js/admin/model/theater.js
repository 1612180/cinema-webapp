// Theater 
let TheaterStatus = new Map();

class Theater {
    constructor(id, name, address, row, column, ordered, status) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.row = row;
        this.column = column;
        this.ordered = ordered;
        this.status = status;
    }

    getItemData = () => {
        return {
            id: this.id.toString(),
            name: this.name,
            address: this.address,
            size: `${this.row * this.column} - ${this.row}x${this.column}`,
            ordered: this.ordered.toString(),
            status: TheaterStatus.get(this.status)
        };
    }

    buildListItem = () => {
        let textColor = this.status === 1 ? "text-success" : "text-danger";
        let size = `${this.row * this.column} - ${this.row}x${this.column}`;

        let htmlStr = `
        <tr>
            <td class="text-center">${this.id}</td>
            <td>${this.name}</td>
            <td>${this.address}</td>
            <td class="text-center">${size}</td>
            <td class="text-center">${this.ordered}</td>
            <td class="text-center ${textColor}">${TheaterStatus.get(this.status)}</td>
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
                theaterId: {
                    required: true,
                    digits: true
                },
                theaterName: "required",
                theaterAddress: "required",
                theaterRow: {
                    required: true,
                    digits: true
                },
                theaterColumn: {
                    required: true,
                    digits: true
                },
            },
            messages: {
                theaterId: {
                    required: buildErrorTooltip("Vui long dien ma rap"),
                    digits: buildErrorTooltip("Ma rap phai la so nguyen")
                },
                theaterName: buildErrorTooltip("Vui long dien ten rap"),
                theaterAddress: buildErrorTooltip("Vui long dien dia chi rap"),
                theaterRow: {
                    required: buildErrorTooltip("Vui long dien so hang ghe"),
                    digits: buildErrorTooltip("So hang ghe phai la so nguyen")
                },
                theaterColumn: {
                    required: buildErrorTooltip("Vui long dien so ghe moi hang"),
                    digits: buildErrorTooltip("So ghe moi hang phai la so nguyen")
                }
            }
        }
    }

    buildEditModal = () => {
        let node = $('<div/>');
        let options = Array.from(TheaterStatus)
            .map(([k, v]) => { return { value: k, text: v } });
        node.append(buildInput("Ma rap", "theater-id", this.id, 1, DISABLED.YES));
        node.append(buildInput("Ten rap", "theater-name", this.name, "Ten rap", DISABLED.NO));
        node.append(buildInput("Dia chi", "theater-address", this.address, "123 ABC", DISABLED.NO));
        node.append(buildInput("So hang ghe", "theater-row", this.row, 6, DISABLED.NO));
        node.append(buildInput("So ghe moi hang", "theater-column", this.column, 10, DISABLED.NO));
        node.append(buildInput("Da dat", "theater-ordered", this.column, 10, DISABLED.NO));
        node.append(buildSelect("Tinh trang", "theater-status", this.status, options, DISABLED.NO));
        return node;
    }

    buildNewModal = () => {
        let node = $('<div/>');
        let options = Array.from(TheaterStatus)
            .map(([k, v]) => { return { value: k, text: v } });
        node.append(buildInput("Ma rap", "theater-id", this.id, 1, DISABLED.NO));
        node.append(buildInput("Ten rap", "theater-name", this.name, "Ten rap", DISABLED.NO));
        node.append(buildInput("Dia chi", "theater-address", this.address, "123 ABC", DISABLED.NO));
        node.append(buildInput("So hang ghe", "theater-row", this.row, 6, DISABLED.NO));
        node.append(buildInput("So ghe moi hang", "theater-column", this.column, 10, DISABLED.NO));
        node.append(buildInput("Da dat", "theater-ordered", this.column, 10, DISABLED.NO));
        node.append(buildSelect("Tinh trang", "theater-status", 1, options, DISABLED.NO));
        return node;
    }

    buildInfoModal = () => {
        let node = $('<div/>');
        let options = Array.from(TheaterStatus)
            .map(([k, v]) => { return { value: k, text: v } });
        node.append(buildInput("Ma rap", "theater-id", this.id, 1, DISABLED.YES));
        node.append(buildInput("Ten rap", "theater-name", this.name, "Ten rap", DISABLED.YES));
        node.append(buildInput("Dia chi", "theater-address", this.address, "123 ABC", DISABLED.YES));
        node.append(buildInput("So hang ghe", "theater-row", this.row, 6, DISABLED.YES));
        node.append(buildInput("So ghe moi hang", "theater-column", this.column, 10, DISABLED.YES));
        node.append(buildInput("Da dat", "theater-ordered", this.column, 10, DISABLED.YES));
        node.append(buildSelect("Tinh trang", "theater-status", this.status, options, DISABLED.YES));
        return node;
    }

    buildDeleteModal = () => {
        let node = $('<div/>');
        let options = Array.from(TheaterStatus)
            .map(([k, v]) => { return { value: k, text: v } });
        node.append(`
            <p class="h5 text-center">
                Ban thuc su muon xoa rap <br/>
                <span class="font-weight-bold">${this.name}</span> ?
            </p>
            <br/>
        `)
        node.append(buildInput("Ma rap", "theater-id", this.id, 1, DISABLED.YES));
        node.append(buildInput("Ten rap", "theater-name", this.name, "Ten rap", DISABLED.YES));
        node.append(buildInput("Dia chi", "theater-address", this.address, "123 ABC", DISABLED.YES));
        node.append(buildSelect("Tinh trang", "theater-status", this.status, options, DISABLED.YES));
        return node;
    }
}
