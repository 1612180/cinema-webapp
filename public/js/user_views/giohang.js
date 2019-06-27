function ConvertDate(datedb) {
  let date = new Date(datedb);
  let dd = String(date.getDate()).padStart(2, "0");
  let mm = String(date.getMonth() + 1).padStart(2, "0");
  let yyyy = date.getFullYear();
  return yyyy + "-" + mm + "-" + dd;
}

async function TicketCart() {
  let res_ticket_cart = await fetch(
    "/api/users/" + sessionStorage.getItem("userid") + "/ticket_shopping_carts"
  ).then(res => res.json());

  let tbodyTicket = document.getElementById("tbodyTicket");
  for (let i = 0; i < res_ticket_cart.data.length; i += 1) {
    let res_ticket = await fetch(
      "/api/tickets/" + res_ticket_cart.data[i].ticketId
    ).then(res => res.json());
    let res_showtime = await fetch(
      "/api/show_times/" + res_ticket.data.showTimeId + "/more"
    ).then(res => res.json());

    let tr = document.createElement("tr");
    tbodyTicket.appendChild(tr);

    let td1 = document.createElement("td");
    tr.appendChild(td1);
    td1.innerText = res_showtime.data.movie;

    let td2 = document.createElement("td");
    tr.appendChild(td2);
    td2.innerText = res_showtime.data.theater;

    let td3 = document.createElement("td");
    tr.appendChild(td3);
    td3.innerText = ConvertDate(res_showtime.data.date);

    let td4 = document.createElement("td");
    tr.appendChild(td4);
    td4.innerText = res_showtime.data.time;

    let td5 = document.createElement("td");
    tr.appendChild(td5);
    td5.innerText = res_ticket.data.seatRow + "-" + res_ticket.data.seatColumn;

    let td6 = document.createElement("td");
    tr.appendChild(td6);
    td6.innerText = res_showtime.data.price;

    let td7 = document.createElement("td");
    tr.appendChild(td7);

    let icon = document.createElement("i");
    td7.appendChild(icon);
    icon.className = "fas fa-times fa-normal";
    icon.setAttribute("cartid", res_ticket_cart.data[i].id);

    icon.addEventListener("click", async () => {
      let res = await fetch(
        "/api/ticket_shopping_carts/" + icon.getAttribute("cartid"),
        {
          method: "DELETE"
        }
      ).then(res => res.json());
      if (!res.status) {
        console.log(res);
        return;
      }

      location.reload();
    });
  }
}

async function TicketFood() {
  let res_food_cart = await fetch(
    "/api/users/" + sessionStorage.getItem("userid") + "/food_shopping_carts"
  ).then(res => res.json());

  let tbodyFood = document.getElementById("tbodyFood");
  for (let i = 0; i < res_food_cart.data.length; i += 1) {
    let res_food = await fetch(
      "/api/foods/" + res_food_cart.data[i].foodId
    ).then(res => res.json());

    let tr = document.createElement("tr");
    tbodyFood.appendChild(tr);

    let td1 = document.createElement("td");
    tr.appendChild(td1);
    td1.style.textTransform = "capitalize";
    td1.innerText = res_food.data.name;

    let td2 = document.createElement("td");
    tr.appendChild(td2);
    td2.innerText = res_food_cart.data[i].quantity;

    let td3 = document.createElement("td");
    tr.appendChild(td3);
    td3.innerText = res_food.data.price;

    let td4 = document.createElement("td");
    tr.appendChild(td4);
    td4.innerText = parseInt(td3.innerText) * parseInt(td2.innerText);

    let td5 = document.createElement("td");
    tr.appendChild(td5);

    let icon = document.createElement("i");
    td5.appendChild(icon);
    icon.className = "fas fa-times fa-normal";
    icon.setAttribute("cartid", res_food_cart.data[i].id);

    icon.addEventListener("click", async event => {
      let res = await fetch(
        "/api/food_shopping_carts/" + event.target.getAttribute("cartid"),
        {
          method: "DELETE"
        }
      ).then(res => res.json());

      location.reload();
    });
  }
}

async function ShowMoney() {
  let res_money_ticket = await fetch(
    "/api/users/" +
      sessionStorage.getItem("userid") +
      "/ticket_shopping_carts/money"
  ).then(res => res.json());

  let res_money_food = await fetch(
    "/api/users/" +
      sessionStorage.getItem("userid") +
      "/food_shopping_carts/money"
  ).then(res => res.json());

  let spanMoney = document.getElementById("spanMoney");
  spanMoney.innerText =
    parseInt(res_money_ticket.data) + parseInt(res_money_food.data);
}

window.addEventListener("load", () => {
  if (!sessionStorage.getItem("userid")) {
    location.href = "/";
    return;
  }

  TicketCart();
  TicketFood();
  ShowMoney();

  let btnBack = document.getElementById("btnBack");
  btnBack.addEventListener("click", () => {
    location.href = "/";
  });

  let btnAccept = document.getElementById("btnAccept");
  btnAccept.addEventListener("click", async () => {
    // deprecated
    // fetch("/api/users/" + sessionStorage.getItem("userid") + "/pay_ticket", {
    //   method: "POST"
    // });

    // fetch("/api/users/" + sessionStorage.getItem("userid") + "/pay_food", {
    //   method: "POST"
    // });

    let res = await fetch(
      "/api/users/" + sessionStorage.getItem("userid") + "/pay",
      {
        method: "POST"
      }
    );

    if (!res.status) {
      alert("Something wrong");
      return;
    }

    if (!alert("Thanh toán thành công")) {
      location.reload();
    }
  });
});
