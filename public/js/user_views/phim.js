function Pagination(res, page) {
  let page_left_2 = document.getElementById("page-left-2");
  page_left_2.addEventListener("click", () => {
    location.href = "/phim";
  });

  let page_left_1 = document.getElementById("page-left-1");
  page_left_1.addEventListener("click", () => {
    if (page > 1) {
      page -= 1;
      location.href = "/phim" + "?page=" + page;
    } else {
    }
  });

  let PAGE_MAX = Math.floor(res.data / res.limit) + 1;

  let page_right_1 = document.getElementById("page-right-1");
  page_right_1.addEventListener("click", () => {
    if (page < PAGE_MAX) {
      page += 1;
      location.href = "/phim" + "?page=" + page;
    }
  });

  let page_right_2 = document.getElementById("page-right-2");
  page_right_2.addEventListener("click", () => {
    location.href = "/phim" + "?page=" + PAGE_MAX;
  });

  if (page > 1) {
    let page_prev = document.createElement("button");
    page_prev.className = "btn btn-link font-weight-bold btn-link-normal";
    page_prev.innerText = page - 1;
    page_prev.addEventListener("click", () => {
      prev = page - 1;
      location.href = "/phim" + "?page=" + prev;
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
      location.href = "/phim" + "?page=" + next;
    });
    page_right_1.parentNode.insertBefore(page_next, page_right_1);
  }
}

function ShowPhim(res) {
  let display = document.getElementById("display");
  display.className = "container my-3";

  let row = document.createElement("div");
  row.className = "row";
  display.appendChild(row);

  for (let i in res.data) {
    let col = document.createElement("div");
    col.className = "col-lg-3 col-md-4 col-sm-6 col-12";
    row.appendChild(col);

    let div_wrap = document.createElement("div")
    div_wrap.className = "shadow"
    col.appendChild(div_wrap)

    let img = document.createElement("img");
    img.className = "img-fluid samurai";
    img.src = res.data[i].photoUrl;
    div_wrap.appendChild(img);

    let div_title = document.createElement("div")
    div_title.className = "ninja"
    div_wrap.appendChild(div_title)

    let title = document.createElement("h3")
    title.className = "font-weight-bold pb-3 text-normal"
    title.innerText = res.data[i].name
    div_title.appendChild(title)

    let btn = document.createElement("button");
    btn.className = "btn btn-primary btn-normal";
    btn.innerHTML = "Xem chi tiết";
    div_title.appendChild(btn);

    btn.addEventListener("click", () => {
      location.href = "/phim/" + res.data[i].id;
    });
  }
}

window.addEventListener("load", async () => {
  let params = new URL(location.href);
  let page = parseInt(params.searchParams.get("page"));
  if (!page) {
    page = 1;
  }

  let [res_count, res_page] = await Promise.all([
    fetch("/api/count/movies").then(res => res.json()),
    fetch("/api/movies" + "?page=" + page).then(res => res.json())
  ]);
  if (!res_count.data || !res_page.data) {
    return;
  }

  Pagination(res_count, page);
  ShowPhim(res_page);
});
