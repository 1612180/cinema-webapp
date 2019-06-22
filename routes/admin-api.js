const express = require("express");
const router = express.Router();

const jwt = require('jsonwebtoken')
const secretKey = process.env.SECRET_KEY || 'wtf'
const tokenName = 'NIGAMON_JWT_TOKEN'

const LIMIT = 5;

const {
    Op,
    Admin,
    User,
    Movie,
    Theater,
    TheaterStatus,
    TicketType,
    TicketStatus,
    ShowTime,
    Ticket,
    TicketShoppingCart,
    Order,
    OrderStatus,
    OrdererTicket,
    Food,
    FoodStatus,
    FoodOrder,
    FoodShoppingCart,
    Banner
} = require("../models");

// jwt middleware 
const adminJwtMiddleware = (req, res, next) => {
    if (req.headers.authorization) {
        jwt.verify(req.headers.authorization.slice(7), secretKey, (err, decoded) => {
            if (err) {
                res.status(401).send('Unauthorized Access')
            } else {
                jwt.sign({
                    name: decoded.name,
                    lastLogin: decoded.lastLogin,
                    email: decoded.email
                }, secretKey, {
                        expiresIn: "2h"
                    }, (err, token) => {
                        if (err) {
                            res.status(500).send('Something is broken')
                        } else {
                            res.set(tokenName, token)
                            res.status(200)
                            next()
                        }
                    })
            }
        })
    } else {
        res.status(401).send('Unauthorized Access')
    }
}

// login
router.post('/login', (req, res) => {
    Admin.findByPk(req.body.email)
        .then(data => {
            if (data.hashedPassword === req.body.password) {
                Admin.update({
                    lastLogin: new Date()
                }, {
                        where: {
                            email: data.email
                        }
                    })
                jwt.sign({
                    name: data.adminName,
                    lastLogin: data.lastLogin,
                    email: data.email
                }, secretKey, {
                        expiresIn: "2h"
                    }, (err, token) => {
                        if (err) {
                            res.status(500).send('Something is broken')
                        } else {
                            res.json({
                                isLogin: true,
                                token: token,
                                userInfo: {
                                    name: data.adminName,
                                    lastLogin: data.lastLogin,
                                    email: data.email
                                }
                            })
                        }
                    })
            } else {
                res.json({ isLogin: false })
            }
        })
        .catch(() => res.json({ isLogin: false }))
})

router.get('/login', adminJwtMiddleware, (req, res) => {
    const decoded = jwt.decode(req.headers.authorization.slice(7))
    res.json({
        isLogin: true,
        userInfo: {
            name: decoded.name,
            lastLogin: decoded.lastLogin,
            email: decoded.email
        }
    })
})

router.get('/movies', adminJwtMiddleware, (req, res) => {
    const query = req.query
    console.log(query)
    const page = parseInt(query.page || 1)
    const genre = query.genre
    const status = query.status
    const searchText = query.searchText

    Movie.findAndCountAll({
        limit: LIMIT,
        offset: LIMIT * (page - 1),
        order: [['updatedAt', 'DESC']]
    }).then(result => {
        const movies = (result.rows.map(r => r.dataValues).map(r => ({
            id: r.id,
            name: r.name,
            actor: r.actor,
            director: r.director,
            type: 1,
            length: 180,
            start: r.startDate,
            end: r.endDate,
            intro: r.introduce,
            imageUrl: r.photoUrl
        })))
        res.json({
            movies: movies,
            currentPage: page,
            lastPage: Math.ceil(result.count / LIMIT),
            total: result.count
        })
    }).catch(err => {
        res.status(500).send('GET Movies Error')
    })
})

router.post('/movies/:id', adminJwtMiddleware, (req, res) => {
    const add = req.query.addNew || false
    const movie = req.body
    if (add) {
        Movie.create({
            id: movie.id,
            name: movie.name,
            actor: movie.actor,
            director: movie.director,
            startDate: new Date(movie.start),
            endDate: new Date(movie.end),
            introduce: movie.intro,
            imageUrl: movie.imageUrl
        }).then(() => {
            res.json({ code: 'OK' })
        }).catch(err => {
            console.log(err)
            res.json({
                code: 'FAILED',
                msg: err
            })
        })
    } else {
        Movie.update({
            name: movie.name,
            actor: movie.actor,
            director: movie.director,
            startDate: new Date(movie.start),
            endDate: new Date(movie.end),
            introduce: movie.intro,
            imageUrl: movie.imageUrl
        }, {
                where: {
                    id: movie.id
                }
            }).then(() => {
                res.json({
                    code: 'OK'
                })
            }).catch(err => {
                console.log(err)
                res.json({
                    code: 'FAILED',
                    msg: err
                })
            })
    }
})

module.exports = router;
