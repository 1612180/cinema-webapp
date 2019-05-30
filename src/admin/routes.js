const Express = require('express')

const router = Express.Router()

router.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname })
})

module.exports = router