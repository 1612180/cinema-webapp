window.addEventListener("load", async () => {
  let params = new URL(document.location).searchParams;
  let res = await fetch(
    "/api/show_times/" + params.get("showTimeId") + "/tickets"
  );
  res = await res.json();

  if (!res.data || !res.data.length) {
    return;
  }

  row = res.data[res.data.length - 1].seatRow;
  col = res.data[res.data.length - 1].seatColumn;

  let tbody = document.createElement("tbody");
  tableTicket.appendChild(tbody);
  for (let i = 1; i <= row; i += 1) {
    let tr = document.createElement("tr");
    for (let j = 1; j <= col; j += 1) {
      let td = document.createElement("td");
      tr.appendChild(td);
      td.className = "td-normal font-weight-bold";
      td.innerText = i.toString() + "-" + j.toString();
      td.addEventListener("click", event => {
        if (event.target.className === "td-normal font-weight-bold") {
          event.target.className = "td-normal-active font-weight-bold";
        } else if (
          event.target.className === "td-normal-active font-weight-bold"
        ) {
          event.target.className = "td-normal font-weight-bold";
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
          );
          res = await res.json();
          console.log(res)
        }
      }
    }
  });
});
