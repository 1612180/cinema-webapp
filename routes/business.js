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

const bcrypt = require("bcrypt");

router.get("/me", middleware.auth, (req, res) => {
  User.findAll({
    where: {
      email: res.get("email")
    }
  }).then(data => {
    if (!data || !data.length) {
      res.json({ status: false, message: "This email not exist" });
      return;
    }

    return res.json({
      status: true,
      message: "Get info OK",
      data: { id: data[0].id, name: data[0].username }
    });
  });
});

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

router.get("/users/:id/ticket_shopping_carts", (req, res) => {
  TicketShoppingCart.findAll({
    where: {
      userId: req.params.id
    }
  }).then(data => res.json({ status: true, message: "OK", data: data }));
});

router.get("/users/:id/ticket_shopping_carts/money", async (req, res) => {
  try {
    let data = await TicketShoppingCart.findAll({
      where: {
        userId: req.params.id
      }
    });

    let sum = 0;
    for (let i = 0; i < data.length; i += 1) {
      let ticket = await Ticket.findByPk(data[i].ticketId);
      let show = await ShowTime.findByPk(ticket.showTimeId);
      let ticket_type = await TicketType.findByPk(show.ticketTypeId);
      sum += ticket_type.price;
    }

    res.json({ status: true, message: "OK", data: sum });
  } catch (err) {
    res.json({ status: false, message: "Not OK", data: err });
  }
});

router.get("/show_times/:id/more", (req, res) => {
  ShowTime.findByPk(req.params.id).then(data_s => {
    Movie.findByPk(data_s.movieId).then(data_m => {
      Theater.findByPk(data_s.theaterId).then(data_t => {
        TicketType.findByPk(data_s.ticketTypeId).then(data_tt =>
          res.json({
            status: true,
            message: "OK",
            data: {
              movie: data_m.name,
              theater: data_t.name,
              date: data_s.date,
              time: data_s.time,
              price: data_tt.price
            }
          })
        );
      });
    });
  });
});

router.get("/users/:id/food_shopping_carts", (req, res) => {
  FoodShoppingCart.findAll({
    where: {
      userId: req.params.id
    }
  }).then(data => res.json({ status: true, message: "OK", data: data }));
});

router.get("/users/:id/food_shopping_carts/money", async (req, res) => {
  try {
    let data = await FoodShoppingCart.findAll({
      where: {
        userId: req.params.id
      }
    });

    let sum = 0;
    for (let i = 0; i < data.length; i += 1) {
      let food = await Food.findByPk(data[i].foodId);
      sum += data[i].quantity * food.price;
    }

    res.json({ status: true, message: "OK", data: sum });
  } catch (err) {
    res.json({ status: false, message: "Not OK", data: err });
  }
});

router.post("/users/:id/pay_ticket", (req, res) => {
  Order.findOrCreate({
    where: {
      userId: req.params.id,
      orderStatusId: 1
    }
  }).then(([data_o, _]) => {
    TicketShoppingCart.findAll({
      where: {
        userId: req.params.id
      }
    }).then(data_tc => {
      for (let i = 0; i < data_tc.length; i += 1) {
        OrdererTicket.create({
          orderId: data_o.id,
          ticketId: data_tc[i].ticketId
        });
      }

      TicketShoppingCart.destroy({
        where: {
          id: {
            [Op.in]: data_tc.map(i => i.id)
          }
        }
      });

      res.json({ status: true, message: "OK" });
    });
  });
});

router.post("/users/:id/pay_food", (req, res) => {
  Order.findOrCreate({
    where: {
      userId: req.params.id,
      orderStatusId: 1
    }
  }).then(([data_o, _]) => {
    FoodShoppingCart.findAll({
      where: {
        userId: req.params.id
      }
    }).then(data_fc => {
      for (let i = 0; i < data_fc.length; i += 1) {
        FoodOrder.create({
          orderId: data_o.id,
          foodId: data_fc[i].foodId,
          quantity: data_fc[i].quantity
        });
      }

      FoodShoppingCart.destroy({
        where: {
          id: {
            [Op.in]: data_fc.map(i => i.id)
          }
        }
      });

      res.json({ status: true, message: "OK" });
    });
  });
});

router.post("/auth/login", (req, res) => {
  User.findAll({
    where: {
      email: req.body.email
    }
  }).then(data => {
    if (!data || !data.length) {
      res.json({ status: false, message: "Email or password is not correct" });
      return;
    }

    bcrypt.compare(req.body.password, data[0].hashedPassword, (err, _) => {
      if (err) {
        res.json({
          status: false,
          message: "Email or password is not correct"
        });
        return;
      }

      jwt.sign(
        { email: data[0].email },
        secretKey,
        { expiresIn: "365d" },
        (err, token) => {
          if (err) {
            res.json({ status: false, message: "Something wrong :(" });
            return;
          }

          res.json({ status: true, message: "Login OK", data: token });
        }
      );
    });
  });
});

router.post("/auth/signup", (req, res) => {
  if (
    !req.body.username ||
    !req.body.password ||
    !req.body.password2 ||
    !req.body.email ||
    !req.body.phoneNumber
  ) {
    res.json({ status: false, message: "Missing something ?" });
    return;
  }

  if (req.body.password !== req.body.password2) {
    res.json({ status: false, message: "Password again is incorect" });
    return;
  }

  User.findAll({
    where: {
      email: req.body.email
    }
  }).then(data => {
    if (data.length) {
      res.json({ status: false, message: "Email already registered" });
      return;
    }

    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
      if (err) {
        res.json({ status: false, message: "Not OK", data: err });
        return;
      }

      User.create({
        username: req.body.username,
        hashedPassword: req.body.password,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber
      }).then(() => {
        res.json({ status: true, message: "Signup OK" });
      });
    });
  });
});

router.post("/auth/test", middleware.auth, (req, res) => {
  res.send(res.get("email"));
});

module.exports = router;