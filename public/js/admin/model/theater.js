// Movie
const MovieTypes = new Map([
    [1, "Tau hai"],
    [2, "Hanh dong"],
    [3, "Kinh di"],
    [4, "Tam ly"],
    [5, "Tinh cam"],
])

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

        return `
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
    };

    buildEditModal = () => {
        return (
            buildInput("Ma phim", "movie-id", this.id, 1, REQUIRED.YES, DISABLED.YES)
            + buildInput("Ten phim", "movie-name", this.name, "Ten phim", REQUIRED.YES, DISABLED.NO)
            + buildInput("Dao dien", "movie-director", this.director, "Dao dien", REQUIRED.NO, DISABLED.NO)
            + buildInput("Dien vien", "movie-actor", this.actor, "Dien vien", REQUIRED.NO, DISABLED.NO)
            + buildInput("Thoi luong", "movie-length", this.length, 180, REQUIRED.NO, DISABLED.NO)
            + buildInput("Ngay bat dau", "movie-start-date", uniformDateFormat(this.start), "", REQUIRED.NO, DISABLED.NO)
            + buildInput("Ngay ket thuc", "movie-end-date", uniformDateFormat(this.end), "", REQUIRED.NO, DISABLED.NO)
        );
    }

    buildNewModal = () => {
        return (
            buildInput("Ma phim", "movie-id", null, 1, REQUIRED.YES, DISABLED.NO)
            + buildInput("Ten phim", "movie-name", null, "Ten phim", REQUIRED.YES, DISABLED.NO)
            + buildInput("Dao dien", "movie-director", null, "Dao dien", REQUIRED.NO, DISABLED.NO)
            + buildInput("Dien vien", "movie-actor", null, "Dien vien", REQUIRED.NO, DISABLED.NO)
            + buildInput("Thoi luong", "movie-length", null, 180, REQUIRED.NO, DISABLED.NO)
            + buildInput("Ngay bat dau", "movie-start-date", null, "", REQUIRED.NO, DISABLED.NO)
            + buildInput("Ngay ket thuc", "movie-end-date", null, "", REQUIRED.NO, DISABLED.NO)
        );
    }

    buildInfoModal = () => {
        return (
            buildInput("Ma phim", "movie-id", this.id, 1, REQUIRED.YES, DISABLED.YES)
            + buildInput("Ten phim", "movie-name", this.name, "Ten phim", REQUIRED.YES, DISABLED.YES)
            + buildInput("Dao dien", "movie-director", this.director, "Dao dien", REQUIRED.NO, DISABLED.YES)
            + buildInput("Dien vien", "movie-actor", this.actor, "Dien vien", REQUIRED.NO, DISABLED.YES)
            + buildInput("Thoi luong", "movie-length", this.length, 180, REQUIRED.NO, DISABLED.YES)
            + buildInput("Ngay bat dau", "movie-start-date", uniformDateFormat(this.start), "", REQUIRED.NO, DISABLED.YES)
            + buildInput("Ngay ket thuc", "movie-end-date", uniformDateFormat(this.end), "", REQUIRED.NO, DISABLED.YES)
        );
    }
}
