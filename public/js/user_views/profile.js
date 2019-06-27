function SetUp() {
  let pName = document.getElementById("pName");
  pName.disabled = true;

  let pPhone = document.getElementById("pPhone");
  pPhone.disabled = true;

  let btnAccept = document.getElementById("btnAccept");
  btnAccept.style.display = "none";
}

async function LoadProfile() {
  try {
    let res = await fetch("/api/me", {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token")
      }
    }).then(res => res.json());

    if (!res.status) {
      location.href = "/";
      return;
    }

    let pName = document.getElementById("pName");
    pName.value = res.data.name;

    let pPhone = document.getElementById("pPhone");
    pPhone.value = res.data.phone;
  } catch (err) {
    location.href = "/";
    return;
  }
}

function EditProfile() {
  let pName = document.getElementById("pName");
  pName.disabled = false;

  let pPhone = document.getElementById("pPhone");
  pPhone.disabled = false;

  let btnEdit = document.getElementById("btnEdit");
  btnEdit.style.display = "none";

  let btnAccept = document.getElementById("btnAccept");
  btnAccept.style.display = "block";
}

async function UpdateProfile() {
  let res = await fetch("/api/me/info", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: document.getElementById("pName").value,
      phone: document.getElementById("pPhone").value
    })
  }).then(res => res.json());
  if (!res || !res.status) {
    alert("Something wrong");
    return;
  }

  if (!alert("Thay đổi thông tin thành công")) {
    location.reload();
  }
}

window.addEventListener("load", () => {
  SetUp();
  LoadProfile();

  let btnEdit = document.getElementById("btnEdit");
  btnEdit.addEventListener("click", EditProfile);

  let btnAccept = document.getElementById("btnAccept");
  btnAccept.addEventListener("click", UpdateProfile);

  let formP = document.getElementById("formP");
  formP.addEventListener("submit", async event => {
    event.preventDefault();

    let res = await fetch("/api/me/password", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        passwordPO: document.getElementById("passwordPO").value,
        passwordPN: document.getElementById("passwordPN").value,
        passwordPN2: document.getElementById("passwordPN2").value
      })
    }).then(res => res.json());
    if (!res.status) {
      document.getElementById("changePassErr").innerText = res.message;
      return;
    }

    if (!alert("Thay đổi mật khẩu thành công")) {
      location.reload();
    }
  });
});
