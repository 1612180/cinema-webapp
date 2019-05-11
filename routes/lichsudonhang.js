const express = require('express')
const router = express.Router()

// '../' is malicous
const path = require('path')

router.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../views/lichsudonhang.html'))
})

module.exports = router