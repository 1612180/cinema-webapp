window.addEventListener("load", () => {
  let btnBack = document.getElementById("btnBack");
  btnBack.addEventListener("click", () => {
    location.href = "/";
  });

  let btnAccept = document.getElementById("btnAccept");
  btnAccept.addEventListener("click", async event => {
    event.preventDefault();

    let params = new URL(document.location).searchParams;

    let res = await fetch("/api/auth/recovery", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        password: document.getElementById("passwordR").value,
        password2: document.getElementById("passwordR2").value,
        email: params.get("email"),
        tokenRecover: params.get("tokenRecover")
      })
    }).then(res => res.json());

    if(!res.status) {
        alert("Thay đổi mật khẩu không thành công")
        return
    }

    alert("Thay đổi mật khẩu thành công")
  });
});
