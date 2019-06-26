async function LoadFood() {
  let res_food = await fetch("/api/foods").then(res => res.json());

  let containFood = document.getElementById("containFood");
  for (let i = 0; i < res_food.data.length; i += 1) {
    let row = document.createElement("div");
    containFood.appendChild(row);
    row.className = "row py-2";

    let div_space = document.createElement("div");
    row.appendChild(div_space);
    div_space.className = "col-md-1";

    let div_img = document.createElement("div");
    row.appendChild(div_img);
    div_img.className = "col-md-5";

    let img = document.createElement("img");
    div_img.appendChild(img);
    img.className = "img-fluid";
    img.src = res_food.data[i].photoUrl;

    let div_info = document.createElement("div");
    row.appendChild(div_info);
    div_info.className = "col-md-5";

    let name = document.createElement("h4");
    div_info.appendChild(name);
    name.style.textTransform = "capitalize";
    name.innerText = res_food.data[i].name;

    let div_sl = document.createElement("div");
    div_info.appendChild(div_sl);

    let span_sl = document.createElement("span");
    div_sl.appendChild(span_sl);
    span_sl.className = "font-weight-bold mr-3";
    span_sl.innerText = "Số lượng";

    let minus = document.createElement("i");
    div_sl.appendChild(minus);
    minus.className = "fas fa-minus fa-normal mr-3";
    minus.setAttribute("food", "food-" + i);
    minus.setAttribute("money", res_food.data[i].price);

    let cur = document.createElement("span");
    div_sl.appendChild(cur);
    cur.className = "font-weight-bold mr-3";
    cur.innerText = "0";
    cur.id = "food-" + i;
    sessionStorage.setItem("food-" + i, "0");

    let plus = document.createElement("i");
    div_sl.appendChild(plus);
    plus.className = "fas fa-plus fa-normal";
    plus.setAttribute("food", "food-" + i);
    plus.setAttribute("money", res_food.data[i].price);

    minus.addEventListener("click", event => {
      let fattr = event.target.getAttribute("food");
      let fid = fattr.split("food-")[1];

      let cur = document.getElementById(fattr);
      cursl = parseInt(cur.innerText);
      if (cursl > 0) {
        cur.innerText = cursl - 1;

        let spanMoney = document.getElementById("spanMoney");
        spanMoney.innerText =
          parseInt(spanMoney.innerText) -
          parseInt(event.target.getAttribute("money"));
      }
    });

    plus.addEventListener("click", event => {
      let fattr = event.target.getAttribute("food");
      let fid = fattr.split("food-")[1];

      let cur = document.getElementById(fattr);
      cursl = parseInt(cur.innerText);
      cur.innerText = cursl + 1;

      let spanMoney = document.getElementById("spanMoney");
      spanMoney.innerText =
        parseInt(spanMoney.innerText) +
        parseInt(event.target.getAttribute("money"));
    });
  }
}

window.addEventListener("load", () => {
  let spanMoney = document.getElementById("spanMoney");
  spanMoney.innerText = "0";

  LoadFood();

  let btnBack = document.getElementById("btnBack");
  btnBack.addEventListener("click", () => {
    history.back();
  });

  let btnAccept = document.getElementById("btnAccept");
  btnAccept.addEventListener("click", async () => {
    let res = await fetch("/api/foods").then(res => res.json());
    for (let i = 0; i < res.data.length; i += 1) {
      let cur = document.getElementById("food-" + i);

      if (cur.innerText === "0") {
        continue;
      }

      let res_cart = await fetch("/api/food_shopping_carts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          quantity: cur.innerText,
          foodId: i + 1,
          userId: sessionStorage.getItem("userid")
        })
      }).then(res => res.json());
    }

    location.href = "/giohang";
  });
});
