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

  let formTicket = document.getElementById("formTicket");
  for (let i = 0; i < row; i += 1) {
    let div = document.createElement("div");
    formTicket.appendChild(div);
    for (let j = 0; j < col; j += 1) {
      let ticketNum = j + 1 + i * col;
      let div2 = document.createElement("div2");
      div.appendChild(div2);
      div2.className = "form-check form-check-inline";

      let input = document.createElement("input");
      input.className = "form-check-input";
      input.type = "checkbox";
      input.id = "ticket" + res.data[ticketNum - 1].id;
      div2.appendChild(input);

      let label = document.createElement("label");
      label.className = "form-check-label";
      label.htmlFor = input.id;
      label.innerText = "Ghế " + ticketNum;
      div2.appendChild(label);
    }
  }
});
