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
    MovieGenre,
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

//---------------------------------- jwt middleware ------------------------------------//
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

//---------------------------------------- login -----------------------------------------------//
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

//------------------------------------ theaters ---------------------------------------------//
router.get('/theaters/status', adminJwtMiddleware, (req, res) => {
    TheaterStatus.findAndCountAll({
    }).then(result => {
        const status = (result.rows.map(r => r.dataValues).map(r => ({
            id: r.id,
            label: r.name
        })))
        res.json({
            choices: status
        })
    }).catch(err => {
        res.status(500).send('GET Theater Status Error')
    })
})
router.get('/theaters', adminJwtMiddleware, (req, res) => {
    console.log('theaters')
    const query = req.query
    const page = parseInt(query.page || 1)
    const status = parseInt(query.status || 0)
    const searchText = query.searchText

    Theater.findAndCountAll({
        where: {
            ...(status ? { theaterStatusId: status } : {})
        },
        ...(page ? ({
            limit: LIMIT,
            offset: LIMIT * (page - 1),
            order: [['updatedAt', 'DESC']],
        }) : {})
    }).then(result => {
        const theaters = (result.rows.map(r => r.dataValues).map(r => ({
            id: r.id,
            name: r.name,
            address: r.address,
            row: r.rowNum,
            column: r.seatPerRow,
            status: r.theaterStatusId
        })))
        res.json({
            theaters: theaters,
            currentPage: page,
            lastPage: Math.ceil(result.count / LIMIT),
            total: result.count
        })
    }).catch(err => {
        res.status(500).send('GET Theaters Error')
    })
})

//---------------------------------------- movies --------------------------------------------//
router.get('/movies/genres', adminJwtMiddleware, (req, res) => {
    MovieGenre.findAndCountAll({
    }).then(result => {
        const types = (result.rows.map(r => r.dataValues).map(r => ({
            id: r.id,
            label: r.name,
        })))
        res.json({
            choices: types
        })
    }).catch(err => {
        res.status(500).send('GET Movie Genres Error')
    })
})
router.get('/movies', adminJwtMiddleware, (req, res) => {
    console.log('movies')
    const query = req.query
    const page = parseInt(query.page || 1)
    const genre = parseInt(query.genre || '0')
    const status = query.status
    const searchText = query.searchText

    const getStatusWhere = (status) => {
        switch (status) {
            case 'coming': {
                return {
                    startDate: { [Op.gt]: new Date() },
                }
            }
            case 'showing': {
                return {
                    startDate: {
                        [Op.or]: [
                            { [Op.eq]: null },
                            { [Op.lte]: new Date() }
                        ]
                    },
                    endDate: {
                        [Op.or]: [
                            { [Op.eq]: null },
                            { [Op.gte]: new Date() }
                        ]
                    }
                }
            }
            case 'passed': {
                return {
                    endDate: { [Op.lt]: new Date() },
                }
            }
            default: {
                return {}
            }
        }
    }

    Movie.findAndCountAll({
        where: {
            ...(genre ? { movieGenreId: genre } : {}),
            ...getStatusWhere(status)
        },
        ...(page ? ({
            limit: LIMIT,
            offset: LIMIT * (page - 1),
            order: [['updatedAt', 'DESC']],
        }) : {})
    }).then(result => {
        const movies = (result.rows.map(r => r.dataValues).map(r => ({
            id: r.id,
            name: r.name,
            actor: r.actor,
            director: r.director,
            type: r.movieGenreId,
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
    if (parseInt(req.params.id) !== parseInt(movie.id)) {
        return res.json({
            code: 'FAILED',
            msg: 'Mismatch ID'
        })
    }
    if (add) {
        Movie.create({
            id: movie.id,
            name: movie.name,
            actor: movie.actor,
            director: movie.director,
            startDate: movie.start && new Date(movie.start),
            endDate: movie.end && new Date(movie.end),
            introduce: movie.intro,
            imageUrl: movie.imageUrl,
            movieGenreId: movie.type
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
            startDate: movie.start && new Date(movie.start),
            endDate: movie.end && new Date(movie.end),
            introduce: movie.intro,
            imageUrl: movie.imageUrl,
            movieGenreId: movie.type
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
router.delete('/movies/:id', adminJwtMiddleware, (req, res) => {
    Movie.destroy({
        where: {
            id: parseInt(req.params.id)
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
})

//------------------------------------------- tickets -------------------------------------//
router.get('/tickets/status', adminJwtMiddleware, (req, res) => {
    TicketStatus.findAndCountAll({
    }).then(result => {
        const types = (result.rows.map(r => r.dataValues).map(r => ({
            id: r.id,
            label: r.name,
        })))
        res.json({
            choices: types
        })
    }).catch(err => {
        res.status(500).send('GET Ticket Status Error')
    })
})
router.get('/tickets', adminJwtMiddleware, (req, res) => {
    console.log('tickets')
    const query = req.query
    const page = parseInt(query.page || 1)
    const status = parseInt(query.status || 0)
    const searchText = query.searchText

    TicketType.findAndCountAll({
        where: {
            ...(status ? { ticketStatusId: status } : {})
        },
        ...(page ? ({
            limit: LIMIT,
            offset: LIMIT * (page - 1),
            order: [['updatedAt', 'DESC']],
        }) : {})
    }).then(result => {
        const tickets = (result.rows.map(r => r.dataValues).map(r => ({
            id: r.id,
            name: r.name,
            price: r.price,
            status: r.ticketStatusId
        })))
        res.json({
            tickets: tickets,
            currentPage: page,
            lastPage: Math.ceil(result.count / LIMIT),
            total: result.count
        })
    }).catch(err => {
        res.status(500).send('GET Tickets Error')
    })
})
router.post('/tickets/:id', adminJwtMiddleware, (req, res) => {
    const add = req.query.addNew || false
    const ticket = req.body
    if (parseInt(req.params.id) !== parseInt(ticket.id)) {
        return res.json({
            code: 'FAILED',
            msg: 'Mismatch ID'
        })
    }
    if (add) {
        TicketType.create({
            id: ticket.id,
            name: ticket.name,
            price: ticket.price,
            ticketStatusId: ticket.status
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
        TicketType.update({
            name: ticket.name,
            price: ticket.price,
            ticketStatusId: ticket.status
        }, {
                where: {
                    id: ticket.id
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
router.delete('/tickets/:id', adminJwtMiddleware, (req, res) => {
    TicketType.destroy({
        where: {
            id: parseInt(req.params.id)
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
})

//----------------------------------------- foods ---------------------------------------------//
router.get('/foods/status', adminJwtMiddleware, (req, res) => {
    console.log('food')
    FoodStatus.findAndCountAll({
    }).then(result => {
        const types = (result.rows.map(r => r.dataValues).map(r => ({
            id: r.id,
            label: r.name,
        })))
        res.json({
            choices: types
        })
    }).catch(err => {
        res.status(500).send('GET Food Status Error')
    })
})
router.get('/foods', adminJwtMiddleware, (req, res) => {
    const query = req.query
    const page = parseInt(query.page || 1)
    const status = parseInt(query.status || 0)
    const searchText = query.searchText

    Food.findAndCountAll({
        where: {
            ...(status ? { foodStatusId: status } : {})
        },
        ...(page ? ({
            limit: LIMIT,
            offset: LIMIT * (page - 1),
            order: [['updatedAt', 'DESC']],
        }) : {})
    }).then(result => {
        const foods = (result.rows.map(r => r.dataValues).map(r => ({
            id: r.id,
            name: r.name,
            price: r.price,
            status: r.foodStatusId
        })))
        res.json({
            foods: foods,
            currentPage: page,
            lastPage: Math.ceil(result.count / LIMIT),
            total: result.count
        })
    }).catch(err => {
        res.status(500).send('GET Tickets Error')
    })
})
router.post('/foods/:id', adminJwtMiddleware, (req, res) => {
    const add = req.query.addNew || false
    const food = req.body

    if (parseInt(req.params.id) !== parseInt(food.id)) {
        return res.json({
            code: 'FAILED',
            msg: 'Mismatch ID'
        })
    }

    if (add) {
        Food.create({
            id: food.id,
            name: food.name,
            price: food.price,
            foodStatusId: food.status
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
        Food.update({
            name: food.name,
            price: food.price,
            foodStatusId: food.status
        }, {
                where: {
                    id: food.id
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
router.delete('/foods/:id', adminJwtMiddleware, (req, res) => {
    Food.destroy({
        where: {
            id: parseInt(req.params.id)
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
})

module.exports = router;
