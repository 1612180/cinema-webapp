function CheckOrdered(res, row, col) {
  for (let i = 0; i < res.data.length; i += 1) {
    if (res.data[i].seatRow === row && res.data[i].seatColumn === col) {
      return true;
    }
  }

  return false;
}

window.addEventListener("load", async () => {
  let params = new URL(document.location).searchParams;

  let [res_size, res_ordered] = await Promise.all([
    fetch("/api/show_times/" + params.get("showTimeId") + "/size").then(res =>
      res.json()
    ),
    fetch("/api/show_times/" + params.get("showTimeId") + "/ordered").then(
      res => res.json()
    )
  ]);

  if (!res_size.data) {
    return;
  }

  row = res_size.data.row;
  col = res_size.data.col;

  let spanMoney = document.getElementById("spanMoney");
  spanMoney.innerText = "0";

  console.log(res_ordered);

  let tbody = document.createElement("tbody");
  tableTicket.appendChild(tbody);
  for (let i = 1; i <= row; i += 1) {
    let tr = document.createElement("tr");
    for (let j = 1; j <= col; j += 1) {
      let td = document.createElement("td");
      tr.appendChild(td);
      if (CheckOrdered(res_ordered, i, j)) {
        td.className = "td-normal-inactive font-weight-bold";
      } else {
        td.className = "td-normal font-weight-bold";
      }
      td.innerText = i.toString() + "-" + j.toString();
      td.addEventListener("click", async event => {
        let params = new URL(document.location).searchParams;
        let res = await fetch(
          "/api/show_times/" + params.get("showTimeId") + "/money"
        );
        res = await res.json();

        let spanMoney = document.getElementById("spanMoney");
        curMoney = parseInt(spanMoney.innerText);

        if (event.target.className === "td-normal font-weight-bold") {
          event.target.className = "td-normal-active font-weight-bold";
          spanMoney.innerText = curMoney + res.data;
        } else if (
          event.target.className === "td-normal-active font-weight-bold"
        ) {
          event.target.className = "td-normal font-weight-bold";
          spanMoney.innerText = curMoney - res.data;
        }
        console.log(td.innerText);
      });
    }
    tbody.appendChild(tr);
  }

  let btnBack = document.getElementById("btnBack");
  btnBack.addEventListener("click", () => {
    window.history.back();
  });

  let btnAccept = document.getElementById("btnAccept");
  btnAccept.addEventListener("click", async () => {
    if (!sessionStorage.getItem("userid")) {
      alert("Xin hãy đăng nhập");
      return;
    }

    let tableTicket = document.getElementById("tableTicket");
    let params = new URL(document.location).searchParams;

    for (let i = 0; i < tableTicket.rows.length; i += 1) {
      for (let j = 0; j < tableTicket.rows[i].cells.length; j += 1) {
        let r = tableTicket.rows[i].cells[j];
        if (r.className === "td-normal-active font-weight-bold") {
          let curRow = i + 1;
          let curCol = j + 1;
          let res = await fetch(
            "/api/show_times/" +
              params.get("showTimeId") +
              "/row/" +
              curRow +
              "/col/" +
              curCol,
            {
              method: "POST",
              headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token")
              }
            }
          ).then(res => res.json());
          if (!res.status) {
            console.log(res);
            return;
          }
        }
      }
    }

    location.href = "/food";
  });
});
