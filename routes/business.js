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

const nodemailer = require("nodemailer");

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
      data: {
        id: data[0].id,
        name: data[0].username,
        email: data[0].email,
        phone: data[0].phoneNumber
      }
    });
  });
});

router.post("/me/info", middleware.auth, (req, res) => {
  User.update(
    {
      username: req.body.name,
      phoneNumber: req.body.phone
    },
    {
      where: {
        email: res.get("email")
      }
    }
  )
    .then(() => res.json({ status: true, message: "OK" }))
    .catch(err => res.json({ status: false, message: "OK", data: err }));
});

router.post("/me/password", middleware.auth, async (req, res) => {
  try {
    if (req.body.passwordPN !== req.body.passwordPN2) {
      res.json({ status: false, message: "Not OK" });
      return;
    }

    let user = await User.findAll({
      where: {
        email: res.get("email")
      }
    });
    if (!user || !user.length) {
      res.json({ status: false, message: "Not OK" });
      return;
    }

    bcrypt.compare(req.body.passwordPO, user[0].hashedPassword, (err, res2) => {
      if (!res2) {
        res.json({ status: false, message: "Not OK" });
        return;
      }

      bcrypt.hash(req.body.passwordPN, 10, async (err2, hashedPassword) => {
        if (err2) {
          res.json({ status: false, message: "Not OK" });
          return;
        }

        await User.update(
          {
            hashedPassword: hashedPassword
          },
          {
            where: {
              email: user[0].email
            }
          }
        );

        res.json({ status: true, message: "OK" });
      });
    });
  } catch (err) {
    res.json({ status: false, message: "Not OK 5", data: err });
  }
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

router.post("/users/:id/pay", async (req, res) => {
  try {
    let data_o = await Order.create({
      userId: req.params.id,
      orderStatusId: 1
    });

    let data_tc = await TicketShoppingCart.findAll({
      where: {
        userId: req.params.id
      }
    });

    console.log(data_tc)

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

    let data_fc = await FoodShoppingCart.findAll({
      where: {
        userId: req.params.id
      }
    });
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

    bcrypt.compare(req.body.password, data[0].hashedPassword, (err, res2) => {
      if (!res2) {
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
        hashedPassword: hashedPassword,
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

router.post("/auth/recovery/renew", async (req, res) => {
  try {
    let user = await User.findAll({
      where: {
        email: req.body.email
      }
    });
    if (!user || !user.length) {
      res.json({ status: false, message: "Not OK", data: err });
      return;
    }

    require("crypto").randomBytes(128, async (err, buffer) => {
      if (err) {
        res.json({ status: false, message: "Not OK", data: err });
        return;
      }

      let tokenRecover = buffer.toString("hex");

      await User.update(
        {
          tokenRecover: tokenRecover
        },
        {
          where: {
            email: req.body.email
          }
        }
      );

      // send email
      let transporter = nodemailer.createTransport({
        service: "Gmail",
        secure: true,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD
        }
      });

      transporter.sendMail({
        from: "Nigamon Cinema <nigamoncinema@gmail.com>",
        to: user[0].email,
        subject: "Nigamon Cinema - Đặt lại mật khẩu",
        text:
          "Truy cập vào đường link này để khôi phục mật khẩu cho tài khoản của bạn:\n" +
          process.env.URL +
          "/recovery?tokenRecover=" +
          tokenRecover +
          "&email=" +
          user[0].email
      });

      res.json({ status: true, message: "OK" });
    });
  } catch (err) {
    res.json({ status: false, message: "Not OK", data: err });
  }
});

router.post("/auth/recovery", async (req, res) => {
  try {
    if (req.body.password !== req.body.password2) {
      res.json({ status: false, message: "Not OK" });
      return;
    }

    let user = await User.findAll({
      where: {
        email: req.body.email,
        tokenRecover: req.body.tokenRecover
      }
    });
    if (!user || !user.length) {
      res.json({ status: false, message: "Not OK", data: err });
      return;
    }

    await bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
      if (err) {
        res.json({ status: false, message: "Not OK", data: err });
        return;
      }

      User.update(
        {
          hashedPassword: hashedPassword,
          tokenRecover: null
        },
        {
          where: {
            email: req.body.email,
            tokenRecover: req.body.tokenRecover
          }
        }
      );
    });

    res.json({ status: true, message: "Change password OK" });
  } catch (err) {
    res.json({ status: false, message: "Not OK", data: err });
  }
});

module.exports = router;
