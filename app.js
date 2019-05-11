const express = require('express')
const app = express()
const port = process.env.PORT || 9090

// module routes
const indexRoute = require('./routes/index')
const chitietphimRoute = require('./routes/chitietphim')
const giohangRoute = require('./routes/giohang')
const lichsudonhangRoute = require('./routes/lichsudonhang')
const suaprofileRoute = require('./routes/suaprofile')
const lienheRoute = require('./routes/lienhe')

// serve images, CSS files, and JavaScript files
app.use(express.static('public'))

app.use('/', indexRoute)

app.use('/chitietphim', chitietphimRoute)

app.use('/giohang', giohangRoute)

app.use('/lichsudonhang', lichsudonhangRoute)

app.use('/suaprofile', suaprofileRoute)

app.use('/lienhe', lienheRoute)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})