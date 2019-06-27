function SetUpDate() {
  let fromDate = document.getElementById("fromDate");
  fromDate.valueAsDate = new Date();

  let toDate = document.getElementById("toDate");
  toDate.valueAsDate = new Date();
}

function ConvertDate(datedb) {
  let date = new Date(datedb);
  let dd = String(date.getDate()).padStart(2, "0");
  let mm = String(date.getMonth() + 1).padStart(2, "0");
  let yyyy = date.getFullYear();
  return yyyy + "-" + mm + "-" + dd;
}

function ConvertTime(datedb) {
  let date = new Date(datedb);
  let hh = String(date.getHours()).padStart(2, "0");
  let mm = String(date.getMinutes()).padStart(2, "0");
  return hh + ":" + mm;
}

async function LoadPhim(orderid) {
  let res = await fetch("/api/orders/" + orderid + "/ticket").then(res =>
    res.json()
  );

  if (!res.status) {
    return;
  }

  console.log(res.data);

  let tbodyTicket = document.getElementById("tbodyTicket");
  tbodyTicket.innerHTML = "";
  for (let i = 0; i < res.data.data_r1.length; i += 1) {
    let tr = document.createElement("tr");
    tbodyTicket.appendChild(tr);

    let td1 = document.createElement("td");
    tr.appendChild(td1);
    td1.innerText = res.data.data_r4[i];

    let td2 = document.createElement("td");
    tr.appendChild(td2);
    td2.innerText = res.data.data_r5[i];

    let td3 = document.createElement("td");
    tr.appendChild(td3);
    td3.innerText = ConvertDate(res.data.data_r2[i].date);

    let td4 = document.createElement("td");
    tr.appendChild(td4);
    td4.innerText = res.data.data_r2[i].time;

    let td5 = document.createElement("td");
    tr.appendChild(td5);
    td5.innerText =
      res.data.data_r1[i].seatRow + "-" + res.data.data_r1[i].seatColumn;

    let td6 = document.createElement("td");
    tr.appendChild(td6);
    td6.innerText = res.data.data_r3[i];
  }
}

async function LoadFood(orderid) {
  let res = await fetch("/api/orders/" + orderid + "/food").then(res =>
    res.json()
  );

  if (!res.status) {
    return;
  }

  console.log(res.data);
  let tbodyFood = document.getElementById("tbodyFood");
  tbodyFood.innerHTML = "";
  for (let i = 0; i < res.data.data_r1.length; i += 1) {
    let tr = document.createElement("tr");
    tbodyFood.appendChild(tr);

    let td1 = document.createElement("td");
    tr.appendChild(td1);
    td1.style.textTransform = "capitalize";
    td1.innerText = res.data.data_r1[i].name;

    let td2 = document.createElement("td");
    tr.appendChild(td2);
    td2.innerText = res.data.data_r2[i];

    let td3 = document.createElement("td");
    tr.appendChild(td3);
    td3.innerText = res.data.data_r1[i].price;

    let td4 = document.createElement("td");
    tr.appendChild(td4);
    td4.innerText = parseInt(td2.innerText) * parseInt(td3.innerText);
  }
}

async function LoadDonHang() {
  let fromDate = document.getElementById("fromDate");
  console.log(new Date(fromDate.value).toISOString());

  let toDate = document.getElementById("toDate");
  console.log(new Date(toDate.value).toISOString());

  let res = await fetch(
    "/api/users/" +
      sessionStorage.getItem("userid") +
      "/order" +
      "?fromDate=" +
      new Date(fromDate.value).toISOString() +
      "&toDate=" +
      new Date(toDate.value).toISOString()
  ).then(res => res.json());
  console.log(res);

  let tbodyHistory = document.getElementById("tbodyHistory");
  for (let i = 0; i < res.data.length; i += 1) {
    let tr = document.createElement("tr");
    tbodyHistory.appendChild(tr);
    tr.setAttribute("orderid", res.data[i].id);
    tr.addEventListener("click", event => {
      $(event.currentTarget).addClass("tr-normal");
      $(event.currentTarget)
        .siblings()
        .removeClass("tr-normal");

      LoadPhim(event.currentTarget.getAttribute("orderid"));
      LoadFood(event.currentTarget.getAttribute("orderid"));
      window.scrollTo(0, document.body.scrollHeight);
    });

    let td1 = document.createElement("td");
    tr.appendChild(td1);
    td1.innerText = res.data[i].id;

    let td2 = document.createElement("td");
    tr.appendChild(td2);
    td2.innerText = ConvertDate(res.data[i].createdAt);

    let td3 = document.createElement("td");
    tr.appendChild(td3);
    td3.innerText = ConvertTime(res.data[i].createdAt);

    let td4 = document.createElement("td");
    tr.appendChild(td4);
    td4.innerText = res.money[i] + " VND";
  }
}

window.addEventListener("load", async () => {
  if (!sessionStorage.getItem("userid")) {
    location.href = "/";
    return;
  }

  await SetUpDate();
  LoadDonHang();

  let fromDate = document.getElementById("fromDate");
  fromDate.addEventListener("change", () => {
    LoadDonHang();
  });

  let toDate = document.getElementById("toDate");
  toDate.addEventListener("change", () => {
    LoadDonHang();
  });

  let btnBack = document.getElementById("btnBack");
  btnBack.addEventListener("click", () => {
    location.href = "/";
  });
});
