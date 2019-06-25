const express = require("express");
const router = express.Router();

const LIMIT = 4;

const {
  Op,
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
  Banner,
  MovieGenre
} = require("../models");

const middleware = require("./middleware");

const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY || "wtf";

router.post(
  "/show_times/:sid/row/:rid/col/:cid",
  middleware.auth,
  (req, res) => {
    console.log(res.get("email"));
    Ticket.findAll({
      where: {
        showTimeId: req.params.sid,
        seatRow: req.params.rid,
        seatColumn: req.params.cid
      }
    }).then(dataTicket => {
      if (!dataTicket.length) {
        res.json({ status: false, message: "No data ticket" });
        return;
      }
      User.findAll({
        where: {
          email: res.get("email")
        }
      }).then(dataUser => {
        if (!dataUser.length) {
          res.json({ status: false, message: "No data user" });
          return;
        }
        TicketShoppingCart.create({
          userId: dataUser[0].id,
          ticketId: dataTicket[0].id
        }).then(data => {
          res.json({ status: true, message: "OK", data: data });
        });
      });
    });
  }
);

router.get("/show_times/:id/money", (req, res) => {
  ShowTime.findByPk(req.params.id).then(data => {
    TicketType.findByPk(data.ticketTypeId).then(data2 =>
      res.json({ status: true, message: "OK", data: data2.price })
    );
  });
});

router.get("/show_times/:id/ordered", (req, res) => {
  OrdererTicket.findAll().then(data => {
    Ticket.findAll({
      where: {
        id: {
          [Op.in]: data.map(i => i.ticketId)
        }
      }
    }).then(data2 => res.json({ status: true, message: "OK", data: data2 }));
  });
});

router.get("/show_times/:id/size", (req, res) => {
  ShowTime.findByPk(req.params.id).then(data => {
    Theater.findByPk(data.theaterId).then(data2 => {
      res.json({
        status: true,
        message: "OK",
        data: { row: data2.rowNum, col: data2.seatPerRow }
      });
    });
  });
});

module.exports = router;
