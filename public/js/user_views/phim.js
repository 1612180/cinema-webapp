window.addEventListener("load", () => {
  let baseurl = location.protocol + "//" + location.host;

  let params = new this.URL(location.href);
  console.log(params.searchParams.get("page"));

  console.log(params.searchParams.get("page"));

  fetch(baseurl + "/api/movies")
    .then(res => res.json())
    .then(res => {
      let display = document.getElementById("display");
      display.className = "container my-3";

      let row = document.createElement("div");
      row.className = "row";
      display.appendChild(row);

      for (let i in res.data) {
        let col = document.createElement("div");
        col.className = "col-lg-3 col-sm-4 col-12";
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
        btn.innerText = "Mua vé";
        card_body.appendChild(btn);

        btn.addEventListener("click", () => {
          location.href = baseurl + "/phim/" + res.data[i].id;
        });
      }
    });
});
