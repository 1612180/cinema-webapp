window.addEventListener('load', function () {
    let baseurl = location.protocol + '//' + location.host
    let id = location.href.split('/')[4]

    fetch(baseurl + '/api/movies' + '/' + id)
        .then(res => res.json())
        .then(res => {
            if (res.status !== true) {
                return
            }

            console.log(res.data[0])

            let movieImg = document.getElementById('movieImg')
            movieImg.src = res.data[0].img

            let movieName = document.getElementById('movieName')
            movieName.innerText = res.data[0].name

            let movieRating = document.getElementById('movieRating')
            movieRating.innerText = res.data[0].rating

            let movieDescription = document.getElementById('movieDescription')
            movieDescription.innerText = res.data[0].description

            let movieCountry = document.getElementById('movieCountry')
            movieCountry.innerText = res.data[0].country

            let movieNSX = document.getElementById('movieNSX')
            movieNSX.innerText = res.data[0].nsx

            let movieGenre = document.getElementById('movieGenre')
            movieGenre.innerText = res.data[0].genre
        })
        .catch(err => {
            console.log(err)
        })
})