function Pagination(res, page) {
    let page_left_2 = document.getElementById("page-left-2");
    page_left_2.addEventListener("click", () => {
      location.href = "/rap";
    });

    let page_left_1 = document.getElementById("page-left-1");
    page_left_1.addEventListener("click", () => {
      if (page > 1) {
        page -= 1;
        location.href = "/rap" + "?page=" + page;
      } else {
      }
    });

    let PAGE_MAX = Math.floor(res.data / res.limit) + 1;

    let page_right_1 = document.getElementById("page-right-1");
    page_right_1.addEventListener("click", () => {
      if (page < PAGE_MAX) {
        page += 1;
        location.href = "/rap" + "?page=" + page;
      }
    });

    let page_right_2 = document.getElementById("page-right-2");
    page_right_2.addEventListener("click", () => {
      location.href = "/rap" + "?page=" + PAGE_MAX;
    });

    if (page > 1) {
      let page_prev = document.createElement("button");
      page_prev.className = "btn btn-link font-weight-bold btn-link-normal";
      page_prev.innerText = page - 1;
      page_prev.addEventListener("click", () => {
        prev = page - 1;
        location.href = "/rap" + "?page=" + prev;
      });
      page_right_1.parentNode.insertBefore(page_prev, page_right_1);
    }

    let page_cur = document.createElement("button");
    page_cur.className = "btn btn-link font-weight-bold btn-link-normal";
    page_cur.innerText = page;
    page_cur.addEventListener("click", () => {
      location.reload();
    });
    page_right_1.parentNode.insertBefore(page_cur, page_right_1);

    if (page < PAGE_MAX) {
      let page_next = document.createElement("button");
      page_next.className = "btn btn-link font-weight-bold btn-link-normal";
      page_next.innerText = page + 1;
      page_next.addEventListener("click", () => {
        next = page + 1;
        location.href = "/rap" + "?page=" + next;
      });
      page_right_1.parentNode.insertBefore(page_next, page_right_1);
    }
  }

  function ShowRap(res) {
    let display = document.getElementById("display");
    display.className = "container my-3";

    let row = document.createElement("div");
    row.className = "row";
    display.appendChild(row);

    for (let i in res.data) {
      let col = document.createElement("div");
      col.className = "col-md-6 col-12";
      row.appendChild(col);

      let card = document.createElement("div");
      card.className = "card my-3 card-normal";
      col.appendChild(card);

      let photoUrl = document.createElement("img");
      photoUrl.className = "card-img-top img-normal";
      photoUrl.style.height = "48vh";
      photoUrl.style.objectFit = "cover";
      photoUrl.src = res.data[i].photoUrl;
      card.appendChild(photoUrl);

      let card_body = document.createElement("div");
      card_body.className = "card-body text-center";
      card.appendChild(card_body);

      let name = document.createElement("h5");
      name.className = "card-title font-weight-bold";
      name.style.height = "8vh";
      name.innerText = res.data[i].name;
      card_body.appendChild(name);

      let btn = document.createElement("button");
      btn.className = "btn btn-primary btn-normal";
      btn.innerText = "Chi tiết";
      card_body.appendChild(btn);

      btn.addEventListener("click", () => {
        location.href = "/rap/" + res.data[i].id;
      });
    }
  }

  window.addEventListener("load", async () => {
    let baseurl = location.protocol + "//" + location.host;

    let params = await new this.URL(location.href);
    let page = await params.searchParams.get("page");
    if (page === null) {
      page = 1;
    }

    let res = await fetch(baseurl + "/api/count/theaters");
    res = await res.json();
    await Pagination(res, parseInt(page));

    res = await fetch(baseurl + "/api/theaters" + "?page=" + page);
    res = await res.json();
    if (res.data === null) {
      return;
    }

    await ShowRap(res);
  });
