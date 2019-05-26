const express = require('express')
const router = express.Router()

const pgp = require('pg-promise')()
const db = pgp(process.env.DATABASE_URL)

// movies
router.get('/movies', (req, res) => {
    db.any('select * from movies;')
        .then(data => {
            res.json({ status: true, data: data })
        })
        .catch(error => {
            res.json({ status: false })
            console.log('ERROR:', error);
        })
})

router.get('/movies/:id', (req, res) => {
    db.any('select * from movies where id = $1;', [req.params.id])
        .then(data => {
            res.json({ status: true, data: data })
        })
        .catch(error => {
            res.json({ status: false })
            console.log('ERROR:', error);
        })
})

router.post('/movies', (req, res) => {
    
})

router.delete('/movies/:id', (req, res) => {
    db.result('delete from movies where id = $1', [req.params.id])
        .then(() => {
            res.json({ status: true })
        })
        .catch(error => {
            res.json({ status: false })
            console.log('ERROR:', error);
        });
})

// cinemas
router.get('/cinemas', (req, res) => {
    db.any('select * from cinemas;')
        .then(data => {
            res.json({ status: true, data: data })
        })
        .catch(error => {
            res.json({ status: false })
            console.log('ERROR:', error);
        })
})

router.get('/cinemas/:id', (req, res) => {
    db.any('select * from cinemas where id = $1;', [req.params.id])
        .then(data => {
            res.json({ status: true, data: data })
        })
        .catch(error => {
            res.json({ status: false })
            console.log('ERROR:', error);
        })
})

router.delete('/cinemas/:id', (req, res) => {
    db.result('delete from cinemas where id = $1', [req.params.id])
        .then(() => {
            res.json({ status: true })
        })
        .catch(error => {
            res.json({ status: false })
            console.log('ERROR:', error);
        });
})

module.exports = router