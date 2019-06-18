function Pagination(res, page, status) {
  let page_left_2 = document.getElementById("page-left-2");
  page_left_2.addEventListener("click", () => {
    if (status === "dangchieu") {
      sessionStorage.setItem("pageDangChieu", 1);
    } else if (status === "sapchieu") {
      sessionStorage.setItem("pageSapChieu", 1);
    } else {
      console.log("I'm crying");
    }
    location.reload();
  });

  let page_left_1 = document.getElementById("page-left-1");
  page_left_1.addEventListener("click", () => {
    if (page > 1) {
      if (status === "dangchieu") {
        sessionStorage.setItem("pageDangChieu", page - 1);
      } else if (status === "sapchieu") {
        sessionStorage.setItem("pageSapChieu", page - 1);
      } else {
        console.log("I'm crying");
      }
      location.reload();
    }
  });

  let PAGE_MAX = Math.floor(res.data / res.limit) + 1;

  let page_right_1 = document.getElementById("page-right-1");
  page_right_1.addEventListener("click", () => {
    if (page < PAGE_MAX) {
      if (status === "dangchieu") {
        sessionStorage.setItem("pageDangChieu", page + 1);
      } else if (status === "sapchieu") {
        sessionStorage.setItem("pageSapChieu", page + 1);
      } else {
        console.log("I'm crying");
      }
      location.reload();
    }
  });

  let page_right_2 = document.getElementById("page-right-2");
  page_right_2.addEventListener("click", () => {
    if (status === "dangchieu") {
      sessionStorage.setItem("pageDangChieu", PAGE_MAX);
    } else if (status === "sapchieu") {
      sessionStorage.setItem("pageSapChieu", PAGE_MAX);
    } else {
      console.log("I'm crying");
    }
    location.reload();
  });

  let placebo = document.getElementById("placebo");
  placebo.innerHTML = "";

  if (page > 1) {
    let page_prev = document.createElement("button");
    page_prev.className = "btn btn-link font-weight-bold btn-link-normal";
    page_prev.innerText = page - 1;
    page_prev.addEventListener("click", () => {
      if (status === "dangchieu") {
        sessionStorage.setItem("pageDangChieu", page - 1);
      } else if (status === "sapchieu") {
        sessionStorage.setItem("pageSapChieu", page - 1);
      } else {
        console.log("I'm crying");
      }
      location.reload();
    });
    placebo.appendChild(page_prev);
  }

  let page_cur = document.createElement("button");
  page_cur.className = "btn btn-link font-weight-bold btn-link-normal";
  page_cur.innerText = page;
  page_cur.addEventListener("click", () => {
    location.reload();
  });
  placebo.appendChild(page_cur);

  if (page < PAGE_MAX) {
    let page_next = document.createElement("button");
    page_next.className = "btn btn-link font-weight-bold btn-link-normal";
    page_next.innerText = page + 1;
    page_next.addEventListener("click", () => {
      if (status === "dangchieu") {
        sessionStorage.setItem("pageDangChieu", page + 1);
      } else if (status === "sapchieu") {
        sessionStorage.setItem("pageSapChieu", page + 1);
      } else {
        console.log("I'm crying");
      }
      location.reload();
    });
    placebo.appendChild(page_next);
  }
}

function getToday() {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = today.getFullYear();
  return yyyy + "-" + mm + "-" + dd;
}

function ShowPhim(res) {
  let row = document.getElementById("showPhim");
  row.innerHTML = "";

  for (let i in res.data) {
    let col = document.createElement("div");
    col.className = "col-lg-3 col-md-4 col-sm-6";
    row.appendChild(col);

    let shadow = document.createElement("div");
    shadow.className = "shadow my-3";
    col.appendChild(shadow);

    let img = document.createElement("img");
    img.className = "img-fluid samurai";
    img.src = res.data[i].photoUrl;
    shadow.appendChild(img);

    let ninja = document.createElement("div");
    ninja.className = "ninja";
    shadow.appendChild(ninja);

    let title = document.createElement("h3");
    title.className = "font-weight-bold pb-3 text-normal";
    title.innerText = res.data[i].name;
    ninja.appendChild(title);

    let btn = document.createElement("button");
    btn.className = "btn btn-primary btn-normal";
    btn.innerHTML = "Xem chi tiết";
    ninja.appendChild(btn);

    btn.addEventListener("click", () => {
      location.href = "/phim/" + res.data[i].id;
    });
  }
}

function Switch(status) {
  let btnDangChieu = document.getElementById("btnDangChieu");
  let btnSapChieu = document.getElementById("btnSapChieu");
  if (status === "dangchieu") {
    btnDangChieu.classList.remove("btn-link-normal-inactive");
    btnDangChieu.classList.add("btn-link-normal");

    btnSapChieu.classList.remove("btn-link-normal");
    btnSapChieu.classList.add("btn-link-normal-inactive");
  } else if (status === "sapchieu") {
    btnSapChieu.classList.remove("btn-link-normal-inactive");
    btnSapChieu.classList.add("btn-link-normal");

    btnDangChieu.classList.remove("btn-link-normal");
    btnDangChieu.classList.add("btn-link-normal-inactive");
  }
}

async function ShowPhimDangChieu() {
  if (!sessionStorage.getItem("pageDangChieu")) {
    sessionStorage.setItem("pageDangChieu", 1);
  }
  page = parseInt(sessionStorage.getItem("pageDangChieu"));

  let [res_count, res_page] = await Promise.all([
    fetch("/api/count/now/" + getToday()).then(res => res.json()),
    fetch("/api/now/" + getToday() + "?page=" + page).then(res => res.json())
  ]);

  if (!res_count.data || !res_page.data) {
    return;
  }

  Pagination(res_count, page, "dangchieu");
  ShowPhim(res_page);
}

async function ShowPhimSapChieu() {
  if (!sessionStorage.getItem("pageSapChieu")) {
    sessionStorage.setItem("pageSapChieu", 1);
  }
  page = parseInt(sessionStorage.getItem("pageSapChieu"));

  let [res_count, res_page] = await Promise.all([
    fetch("/api/count/future/" + getToday()).then(res => res.json()),
    fetch("/api/future/" + getToday() + "?page=" + page).then(res => res.json())
  ]);

  if (!res_count.data || !res_page.data) {
    return;
  }

  Pagination(res_count, page, "sapchieu");
  ShowPhim(res_page);
}

window.addEventListener("load", () => {
  if (!sessionStorage.getItem("status")) {
    sessionStorage.setItem("status", "dangchieu");
  }

  if (sessionStorage.getItem("status") === "dangchieu") {
    ShowPhimDangChieu();
    Switch("dangchieu");
  } else if (sessionStorage.getItem("status") === "sapchieu") {
    ShowPhimSapChieu();
    Switch("sapchieu");
  }

  let btnDangChieu = document.getElementById("btnDangChieu");
  btnDangChieu.addEventListener("click", () => {
    sessionStorage.setItem("status", "dangchieu");
    sessionStorage.removeItem("pageDangChieu");
    sessionStorage.removeItem("pageSapChieu");
    ShowPhimDangChieu();
    Switch("dangchieu");
  });

  let btnSapChieu = document.getElementById("btnSapChieu");
  btnSapChieu.addEventListener("click", () => {
    sessionStorage.setItem("status", "sapchieu");
    sessionStorage.removeItem("pageDangChieu");
    sessionStorage.removeItem("pageSapChieu");
    ShowPhimSapChieu();
    Switch("sapchieu");
  });
});
