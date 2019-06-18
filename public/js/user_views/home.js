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

  for (let i = 0; i < res.data.length; i += 1) {
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

function ShowBanner(res) {
  let banner = document.getElementById("banner");

  for (let i = 0; i < res.data.length; i += 1) {
    let div = document.createElement("div");
    if (i === 0) {
      div.className = "carousel-item active";
    } else {
      div.className = "carousel-item";
    }
    banner.appendChild(div);

    let img = document.createElement("img");
    img.className = "d-block w-100";
    img.src = res.data[i].photoUrl;
    div.appendChild(img);

    if (i >= 3) {
      return;
    }
  }
}

window.addEventListener("load", async () => {
  let [res_dangch, res_sapch, res_banner] = await Promise.all([
    fetch("/api/now/" + getToday() + "?page=1").then(res => res.json()),
    fetch("/api/future/" + getToday() + "?page=1").then(res => res.json()),
    fetch("/api/banner").then(res => res.json())
  ]);

  if (!sessionStorage.getItem("status")) {
    sessionStorage.setItem("status", "dangchieu");
  }

  if (sessionStorage.getItem("status") === "dangchieu") {
    ShowPhim(res_dangch);
    Switch("dangchieu");
  } else if (sessionStorage.getItem("status") === "sapchieu") {
    ShowPhim(res_sapch);
    Switch("sapchieu");
  }

  ShowBanner(res_banner);

  let btnDangChieu = document.getElementById("btnDangChieu");
  btnDangChieu.addEventListener("click", () => {
    ShowPhim(res_dangch);
    Switch("dangchieu");
    sessionStorage.setItem("status", "dangchieu");
  });

  let btnSapChieu = document.getElementById("btnSapChieu");
  btnSapChieu.addEventListener("click", () => {
    ShowPhim(res_sapch);
    Switch("sapchieu");
    sessionStorage.setItem("status", "sapchieu");
  });

  let btnMore = document.getElementById("btnMore");
  btnMore.addEventListener("click", () => {
    sessionStorage.removeItem("pageDangChieu");
    sessionStorage.removeItem("pageSapChieu");
    location.href = "/phim";
  });
});
