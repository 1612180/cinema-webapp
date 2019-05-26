require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT || 8080

// module routes
const indexRoute = require('./routes/index')
const chitietphimRoute = require('./routes/chitietphim')
const giohangRoute = require('./routes/giohang')
const lichsudonhangRoute = require('./routes/lichsudonhang')
const suaprofileRoute = require('./routes/suaprofile')
const lienheRoute = require('./routes/lienhe')
const adminRoute = require('./routes/admin')
const api = require('./routes/api')

// serve images, CSS files, and JavaScript files
app.use(express.static('public'))

app.use('/', indexRoute)

app.use('/chitietphim', chitietphimRoute)

app.use('/giohang', giohangRoute)

app.use('/lichsudonhang', lichsudonhangRoute)

app.use('/suaprofile', suaprofileRoute)

app.use('/lienhe', lienheRoute)

app.use('/admin', adminRoute)

app.use('/api', api)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})