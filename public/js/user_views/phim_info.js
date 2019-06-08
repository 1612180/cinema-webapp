window.addEventListener("load", function() {
  let baseurl = location.protocol + "//" + location.host;
  let id = location.href.split("/")[4];

  fetch(baseurl + "/api/movies" + "/" + id)
    .then(res => res.json())
    .then(res => {
      if (res.status !== true) {
        return;
      }

      console.log(res.data);

      let movieImg = document.getElementById("movieImg");
      movieImg.src = res.data.photoUrl;

      let movieName = document.getElementById("movieName");
      movieName.innerText = res.data.name;

      let movieRating = document.getElementById("movieRating");
      movieRating.innerText = res.data.rating;

      let movieDescription = document.getElementById("movieDescription");
      movieDescription.innerText = res.data.introduce;

      let movieCountry = document.getElementById("movieCountry");
      movieCountry.innerText = res.data.country;

      let movieNSX = document.getElementById("movieNSX");
      movieNSX.innerText = res.data.nsx;

      let movieGenre = document.getElementById("movieGenre");
      movieGenre.innerText = res.data.genre;
    })
    .catch(err => {
      console.log(err);
    });
});
