function ModalDN() {
  let formDN = document.getElementById("formDN");
  formDN.addEventListener("submit", async event => {
    event.preventDefault();

    let emailDN = document.getElementById("emailDN").value;
    let passwordDN = document.getElementById("passwordDN").value;

    let res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: emailDN,
        password: passwordDN
      })
    });
    res = await res.json();
    console.log(res);
    if (!res.status) {
      let loginErr = document.getElementById("loginErr");
      loginErr.innerText = res.message;
      return;
    }
    sessionStorage.setItem("token", res.data);
    location.reload();
  });
}

function ModalDK() {
  let formDN = document.getElementById("formDN");
  formDN.addEventListener("submit", async event => {
    event.preventDefault();

    let nameDK = document.getElementById("nameDK").value;
    let emailDK = document.getElementById("emailDK").value;
    let passwordDK = document.getElementById("passwordDK").value;
    let password2DK = document.getElementById("password2DK").value;
    let phoneDK = document.getElementById("phoneDK").value;

    let res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: nameDK,
        email: emailDK,
        password: passwordDK,
        password2: password2DK,
        phoneNumber: phoneDK
      })
    });
    res = await res.json();
    if (!res.status) {
      let signupErr = document.getElementById("signupErr");
      signupErr.innerText = res.message;
      return;
    }

    location.reload();
  });
}

window.addEventListener("load", async () => {
  // handle dang nhap, dang ky profile
  if (sessionStorage.getItem("token")) {
    let btn_dangnhap = document.getElementById("btn-dangnhap");
    let btn_dangky = document.getElementById("btn-dangky");
    let span_profile = document.getElementById("span-profile");

    let res = await fetch("/api/me", {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token")
      }
    });
    res = await res.json();
    console.log(res)
    if (!res.status) {
      span_profile.style.display = "none";
    } else {
      btn_dangnhap.style.display = "none";
      btn_dangky.style.display = "none";
      let hello_profile = document.getElementById("hello-profile");
      hello_profile.innerText = "Xin chào " + res.data.name;
      sessionStorage.setItem("userid", res.data.id)
    }
  }

  ModalDN()
  ModalDK()
});
