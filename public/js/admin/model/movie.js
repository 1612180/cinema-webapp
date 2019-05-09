// Movie
let MovieTypes = new Map();

class Movie {
    constructor(id, name, director, actor, type, length, start, end) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.director = director;
        this.actor = actor;
        this.length = length;
        this.start = start;
        this.end = end;
    }

    getItemData = () => {
        return {
            id: this.id.toString(),
            name: this.name,
            director: this.director,
            actor: this.actor,
            type: MovieTypes.get(this.type),
            length: this.length.toString(),
            status: (() => {
                let today = new Date();
                if (this.start <= today && today <= this.end) {
                    return "Dang chieu";
                }
                if (today < this.start) {
                    return "Sap chieu";
                }
                if (this.end < today) {
                    return "Ngung chieu";
                }
                return "";
            })()
        };
    }

    buildListItem = () => {
        let status = "";
        let textColor = "";
        let type = MovieTypes.get(this.type);
        let today = new Date();
        if (this.start <= today && today <= this.end) {
            status = "Dang chieu";
            textColor = "text-success";
        } else if (today < this.start) {
            status = "Sap chieu";
            textColor = "text-warning";
        } else if (this.end < today) {
            status = "Ngung chieu";
            textColor = "text-danger";
        }

        let htmlStr = `
            <tr>
                <td class="text-center">${this.id}</td>
                <td>${this.name}</td>
                <td>${this.director}</td>
                <td>${this.actor}</td>
                <td>${type}</td>
                <td class="text-center">${this.length + ' phut'}</td>
                <td class="text-center ${textColor}">${status}</td>
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
                movieId: {
                    required: true,
                    digits: true
                },
                movieName: "required",
                movieLength: {
                    required: true,
                    digits: true
                }
            },
            messages: {
                movieId: {
                    required: buildErrorTooltip("Vui long dien ma phim"),
                    digits: buildErrorTooltip("Ma phim phai la so nguyen")
                },
                movieName: buildErrorTooltip("Vui long dien ten phim"),
                movieLength: {
                    required: buildErrorTooltip("Vui long dien thoi luong phim"),
                    digits: buildErrorTooltip("Thoi luong phim phai la so nguyen")
                }
            }
        };
    }

    buildEditModal = () => {
        let node = $('<div/>');
        let options = Array.from(MovieTypes).map(([id, text]) => { return { value: id, text: text } });
        node.append(buildInput("Ma phim", "movie-id", this.id, 1, DISABLED.YES));
        node.append(buildInput("Ten phim", "movie-name", this.name, "Ten phim", DISABLED.NO));
        node.append(buildInput("Dao dien", "movie-director", this.director, "Dao dien", DISABLED.NO));
        node.append(buildInput("Dien vien", "movie-actor", this.actor, "Dien vien", DISABLED.NO));
        node.append(buildSelect("The loai", "movie-type", this.type, options, DISABLED.NO));
        node.append(buildInput("Thoi luong", "movie-length", this.length, 180, DISABLED.NO));
        node.append(buildInput("Ngay bat dau", "movie-start-date", uniformDateFormat(this.start), "", DISABLED.NO));
        node.append(buildInput("Ngay ket thuc", "movie-end-date", uniformDateFormat(this.end), "", DISABLED.NO));
        initDatePickersInNode(node, 'movie-start-date', 'movie-end-date', null);
        return node;
    }

    buildNewModal = () => {
        let node = $('<div/>');
        let options = Array.from(MovieTypes).map(([id, text]) => { return { value: id, text: text } });
        node.append(buildInput("Ma phim", "movie-id", null, 1, DISABLED.NO));
        node.append(buildInput("Ten phim", "movie-name", null, "Ten phim", DISABLED.NO));
        node.append(buildInput("Dao dien", "movie-director", null, "Dao dien", DISABLED.NO));
        node.append(buildInput("Dien vien", "movie-actor", null, "Dien vien", DISABLED.NO));
        node.append(buildSelect("The loai", "movie-type", 1, options, DISABLED.NO));
        node.append(buildInput("Thoi luong", "movie-length", null, 180, DISABLED.NO));
        node.append(buildInput("Ngay bat dau", "movie-start-date", null, "", DISABLED.NO));
        node.append(buildInput("Ngay ket thuc", "movie-end-date", null, "", DISABLED.NO));
        initDatePickersInNode(node, 'movie-start-date', 'movie-end-date', null);
        return node;
    }


    buildInfoModal = () => {
        let node = $('<div/>');
        let options = Array.from(MovieTypes).map(([id, text]) => { return { value: id, text: text } });
        node.append(buildInput("Ma phim", "movie-id", this.id, 1, DISABLED.YES));
        node.append(buildInput("Ten phim", "movie-name", this.name, "Ten phim", DISABLED.YES));
        node.append(buildInput("Dao dien", "movie-director", this.director, "Dao dien", DISABLED.YES));
        node.append(buildInput("Dien vien", "movie-actor", this.actor, "Dien vien", DISABLED.YES));
        node.append(buildSelect("The loai", "movie-type", this.type, options, DISABLED.YES));
        node.append(buildInput("Thoi luong", "movie-length", this.length, 180, DISABLED.YES));
        node.append(buildInput("Ngay bat dau", "movie-start-date", uniformDateFormat(this.start), "", DISABLED.YES));
        node.append(buildInput("Ngay ket thuc", "movie-end-date", uniformDateFormat(this.end), "", DISABLED.YES));
        return node;
    }

    buildDeleteModal = () => {
        let node = $('<div/>');
        let options = Array.from(MovieTypes).map(([id, text]) => { return { value: id, text: text } });
        node.append(`
            <p class="h5 text-center">
                Ban thuc su muon xoa phim <br/>
                <span class="font-weight-bold">${this.name}</span> ?
            </p>
            <br/>
        `)
        node.append(buildInput("Ma phim", "movie-id", this.id, 1, DISABLED.YES));
        node.append(buildInput("Ten phim", "movie-name", this.name, "Ten phim", DISABLED.YES));
        node.append(buildInput("Dao dien", "movie-director", this.director, "Dao dien", DISABLED.YES));
        node.append(buildInput("Dien vien", "movie-actor", this.actor, "Dien vien", DISABLED.YES));
        node.append(buildSelect("The loai", "movie-type", this.type, options, DISABLED.YES));
        node.append(buildInput("Thoi luong", "movie-length", this.length, 180, DISABLED.YES));
        node.append(buildInput("Ngay bat dau", "movie-start-date", uniformDateFormat(this.start), "", DISABLED.YES));
        node.append(buildInput("Ngay ket thuc", "movie-end-date", uniformDateFormat(this.end), "", DISABLED.YES));
        return node;
    }
}
