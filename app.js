require('dotenv').config()

const express = require('express')
const app = express()
const path = require('path')

// module routes
const userViews = require('./routes/user_views')
const adminRoute = require('./routes/admin')
const api = require('./routes/api')

// for parsing application/json
app.use(express.json())

// static
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', userViews)

app.use('/admin', adminRoute)

app.use('/api', api)

const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})