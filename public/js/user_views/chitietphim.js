window.addEventListener('load', function () {
    let baseurl = location.protocol + '//' + location.host

    let id = location.href.split('/')[4]

    let movieImg = document.getElementById('movieImg')
    let movieName = document.getElementById('movieName')
    let movieRating = document.getElementById('movieRating')
    let movieDescription = document.getElementById('movieDescription')

    fetch(baseurl + '/api/movies' + '/' + id)
        .then(res => res.json())
        .then(res => {
            if (res.status === true) {
                console.log(res.data[0])
                movieImg.src = res.data[0].img
                movieName.innerText = res.data[0].name
                movieRating.innerText = res.data[0].rating
                movieDescription.innerText = res.data[0].description
            }
        })

})