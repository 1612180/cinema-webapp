require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT || 8080

// module routes
const userViews = require('./routes/user_views')
const adminRoute = require('./routes/admin')
const adminNewRoute = require('./src/admin/routes')
// const api = require('./routes/api')

// for parsing application/json
app.use(express.json())

// serve images, CSS files, and JavaScript files
app.use(express.static('public'))

app.use('/', userViews)

app.use('/admin', adminRoute)
app.use('/v2/admin', adminNewRoute)

// app.use('/api', api)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})