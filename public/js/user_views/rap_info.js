function ShowRap(res) {
  let mPhotoUrl = document.getElementById("mPhotoUrl");
  mPhotoUrl.src = res.data.photoUrl;

  let mName = document.getElementById("mName");
  mName.innerText = res.data.name;

  let mAddress = document.getElementById("mAddress");
  mAddress.innerText = res.data.address;
}

window.addEventListener("load", async function() {
  let baseurl = location.protocol + "//" + location.host;
  let id = location.href.split("/")[4];

  let res = await fetch(baseurl + "/api/theaters" + "/" + id);
  res = await res.json();
  if (res.data === null) {
    return;
  }

  await ShowRap(res);
});
