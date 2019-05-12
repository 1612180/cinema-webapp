const express = require('express')
const router = express.Router()

// '../' is malicous
const path = require('path')

router.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../views/admin-dashboard.html'))
})
router.get('/login', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../views/admin-login.html'))
})
router.get('/forget', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../views/admin-forget.html'))
})
router.get('/food', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../views/admin-food.html'))
})
router.get('/ticket', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../views/admin-ticket.html'))
})
router.get('/theater', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../views/admin-theater.html'))
})
router.get('/order', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../views/admin-order.html'))
})
router.get('/movie', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../views/admin-movie.html'))
})

module.exports = router