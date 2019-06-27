window.addEventListener("load", () => {
  let btnBack = document.getElementById("btnBack");
  btnBack.addEventListener("click", () => {
    location.href = "/";
  });

  let btnAccept = document.getElementById("btnAccept");
  btnAccept.addEventListener("click", async event => {
    event.preventDefault();

    let email = document.getElementById("emailR").value;
    if (email === "") {
      return;
    }

    let res = await fetch("/api/auth/recovery/renew", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email
      })
    }).then(res => res.json());

    if(!res.status){
        console.log(res)
        alert("Something wrong")
        return
    }

    alert("Please check email to recover password")
  });
});
