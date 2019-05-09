const express = require('express')
const app = express()
const port = process.env.PORT || 9090

// module routes
const indexRoute = require('./routes/index')
const chitietphimRoute = require('./routes/chitietphim')

// serve images, CSS files, and JavaScript files
app.use(express.static('public'))

app.use('/', indexRoute)

app.use('/chitietphim', chitietphimRoute)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})