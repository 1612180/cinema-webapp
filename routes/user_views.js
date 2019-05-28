const express = require('express')
const router = express.Router()

// '../' is malicous
const path = require('path')

router.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../views/user_home.html'))
})

router.get('/phim', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../views/user_phim.html'))
})

router.get('/phim/:id', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../views/user_chitietphim.html'))
})

router.get('/giohang', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../views/user_giohang.html'))
})

router.get('/support', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../views/user_support.html'))
})

router.get('/me/profile', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../views/user_profile.html'))
})

router.get('/me/history', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../views/user_history.html'))
})

module.exports = router