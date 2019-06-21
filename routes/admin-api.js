const express = require("express");
const router = express.Router();

const jwt = require('jsonwebtoken')
const secretKey = process.env.SECRET_KEY || 'wtf'
const tokenName = 'NIGAMON_JWT_TOKEN'

const LIMIT = 4;

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
    let decoded = jwt.decode(req.headers.authorization.slice(7))
    res.json({
        isLogin: true,
        userInfo: {
            name: decoded.name,
            lastLogin: decoded.lastLogin,
            email: decoded.email
        }
    })
})

module.exports = router;
