function ShowPhim(res) {
  let mPhotoUrl = document.getElementById("mPhotoUrl");
  mPhotoUrl.src = res.data.photoUrl;

  let mName = document.getElementById("mName");
  mName.innerText = res.data.name;

  let mRating = document.getElementById("mRating");
  mRating.innerText = res.data.rating;

  let mDirector = document.getElementById("mDirector");
  mDirector.innerText = res.data.director;

  let mActor = document.getElementById("mActor");
  mActor.innerText = res.data.actor;

  let mGenre = document.getElementById("mGenre");
  mGenre.innerText = res.data.genre;

  let mIntroduce = document.getElementById("mIntroduce");
  mIntroduce.innerText = res.data.introduce;
}

function ShowRap() {

}

window.addEventListener("load", async function() {
  let baseurl = location.protocol + "//" + location.host;
  let id = location.href.split("/")[4];

  let res = await fetch(baseurl + "/api/movies" + "/" + id);
  res = await res.json();

  await ShowPhim(res);

  res = await this.fetch(baseurl + "/api/movies" + "/" + id + "/theaters" + "/" + 1)
  res = await res.json()

  console.log(res)

  await ShowRap()
});
