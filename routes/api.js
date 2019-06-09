const express = require("express");
const router = express.Router();

const LIMIT = 4;

const {
  User,
  Movie,
  Theater,
  TheaterStatus,
  TicketType,
  TicketStatus,
  ShowTime,
  Ticket,
  TicketShoppingCart
} = require("../models");

router.get("/count/movies", (req, res) => {
  Movie.findAndCountAll()
    .then(data =>
      res.json({ status: true, message: "OK", data: data.count, limit: LIMIT })
    )
    .catch(err => res.json({ status: false, message: err }));
});

router.get("/movies", (req, res) => {
  if (
    req.query.page === undefined ||
    Object.keys(req.query.page).length === 0
  ) {
    Movie.findAll()
      .then(data => res.json({ status: true, message: "OK", data: data }))
      .catch(err => res.json({ status: false, message: err }));
    return;
  }

  let offset = LIMIT * (req.query.page - 1);
  Movie.findAll({
    limit: LIMIT,
    offset: offset
  })
    .then(data => res.json({ status: true, message: "OK", data: data }))
    .catch(err => res.json({ status: false, message: err }));
});

router.get("/movies/:id", (req, res) => {
  Movie.findByPk(req.params.id)
    .then(data => res.json({ status: true, message: "OK", data: data }))
    .catch(err => res.json({ status: false, message: err }));
});

router.post("/movies", (req, res) => {
  Movie.create({
    name: req.body.name,
    rating: req.body.rating,
    actor: req.body.actor,
    director: req.body.director,
    photoUrl: req.body.photoUrl,
    introduce: req.body.introduce,
    startDate: req.body.startDate,
    endDate: req.body.endDate
  })
    .then(data => res.json({ status: true, message: "OK", data: data }))
    .catch(err => res.json({ status: false, message: err }));
});

router.put("/movies/:id", (req, res) => {
  Movie.update(
    {
      name: req.body.name,
      rating: req.body.rating,
      actor: req.body.actor,
      director: req.body.director,
      photoUrl: req.body.photoUrl,
      introduce: req.body.introduce,
      startDate: req.body.startDate,
      endDate: req.body.endDate
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(() => res.json({ status: true, message: "OK" }))
    .catch(err => res.json({ status: false, message: err }));
});

router.delete("/movies", (req, res) => {
  Movie.destroy({
    truncate: true
  })
    .then(() => res.json({ status: true, message: "OK" }))
    .catch(err => res.json({ status: false, message: err }));
});

router.delete("/movies/:id", (req, res) => {
  Movie.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(() => res.json({ status: true, message: "OK" }))
    .catch(err => res.json({ status: false, message: err }));
});

router.get("/theaters", (req, res) => {
  Theater.findAll()
    .then(data => res.json({ status: true, message: "OK", data: data }))
    .catch(err => res.json({ status: false, message: err }));
});

router.get("/theaters/:id", (req, res) => {
  Theater.findByPk(req.params.id)
    .then(data => res.json({ status: true, message: "OK", data: data }))
    .catch(err => res.json({ status: false, message: err }));
});

router.post("/theaters", (req, res) => {
  Theater.create({
    name: req.body.name,
    address: req.body.address,
    rowNum: req.body.rowNum,
    seatPerRow: req.body.seatPerRow
  })
    .then(data => res.json({ status: true, message: "OK", data: data }))
    .catch(err => res.json({ status: false, message: err }));
});

router.put("/theaters/:id", (req, res) => {
  Theater.update(
    {
      name: req.body.name,
      address: req.body.address,
      rowNum: req.body.rowNum,
      seatPerRow: req.body.seatPerRow,
      theaterStatusId: req.body.theaterStatusId
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(() => res.json({ status: true, message: "OK" }))
    .catch(err => res.json({ status: false, message: err }));
});

router.delete("/theaters", (req, res) => {
  Theater.destroy({
    truncate: true
  })
    .then(() => res.json({ status: true, message: "OK" }))
    .catch(err => res.json({ status: false, message: err }));
});

router.delete("/theaters/:id", (req, res) => {
  Theater.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(() => res.json({ status: true, message: "OK" }))
    .catch(err => res.json({ status: false, message: err }));
});

router.get("/theater_statuses", (req, res) => {
  TheaterStatus.findAll()
    .then(data => res.json({ status: true, message: "OK", data: data }))
    .catch(err => res.json({ status: false, message: err }));
});

router.post("/theater_statuses", (req, res) => {
  TheaterStatus.create({
    name: req.body.name
  })
    .then(data => res.json({ status: true, message: "OK", data: data }))
    .catch(err => res.json({ status: false, message: err }));
});

router.get("/ticket_types", (req, res) => {
  TicketType.findAll()
    .then(data => res.json({ status: true, message: "OK", data: data }))
    .catch(err => res.json({ status: false, message: err }));
});

router.get("/ticket_types/:id", (req, res) => {
  TicketType.findByPk(req.params.id)
    .then(data => res.json({ status: true, message: "OK", data: data }))
    .catch(err => res.json({ status: false, message: err }));
});

router.post("/ticket_types", (req, res) => {
  TicketType.create({
    name: req.body.name,
    price: req.body.price
  })
    .then(data => res.json({ status: true, message: "OK", data: data }))
    .catch(err => res.json({ status: false, message: err }));
});

router.put("/ticket_types/:id", (req, res) => {
  TicketType.update(
    {
      name: req.body.name,
      price: req.body.price,
      ticketStatusId: req.body.ticketStatusId
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(() => res.json({ status: true, message: "OK" }))
    .catch(err => res.json({ status: false, message: err }));
});

router.delete("/ticket_types", (req, res) => {
  TicketType.destroy({
    truncate: true
  })
    .then(() => res.json({ status: true, message: "OK" }))
    .catch(err => res.json({ status: false, message: err }));
});

router.delete("/ticket_types/:id", (req, res) => {
  TicketType.destroy({
    where: {
      id: req.params.id
    },
    truncate: true
  })
    .then(() => res.json({ status: true, message: "OK" }))
    .catch(err => res.json({ status: false, message: err }));
});

router.get("/ticket_statuses", (req, res) => {
  TicketStatus.findAll()
    .then(data => res.json({ status: true, message: "OK", data: data }))
    .catch(err => res.json({ status: false, message: err }));
});

router.get("/ticket_statuses/:id", (req, res) => {
  TicketStatus.findByPk(req.params.id)
    .then(data => res.json({ status: true, message: "OK", data: data }))
    .catch(err => res.json({ status: false, message: err }));
});

router.post("/ticket_statuses", (req, res) => {
  TicketStatus.create({
    name: req.body.name
  })
    .then(data => res.json({ status: true, message: "OK", data: data }))
    .catch(err => res.json({ status: false, message: err }));
});

router.put("/ticket_statuses/:id", (req, res) => {
  TicketStatus.update(
    {
      where: {
        id: req.params.id
      }
    },
    {
      name: req.body.name
    }
  )
    .then(() => res.json({ status: true, message: "OK" }))
    .catch(err => res.json({ status: false, message: err }));
});

router.delete("/ticket_statuses", (req, res) => {
  TicketStatus.destroy({
    truncate: true
  })
    .then(() => res.json({ status: true, message: "OK" }))
    .catch(err => res.json({ status: false, message: err }));
});

router.delete("/ticket_statuses/:id", (req, res) => {
  TicketStatus.destroy({
    where: {
      id: req.params.id
    },
    truncate: true
  })
    .then(() => res.json({ status: true, message: "OK" }))
    .catch(err => res.json({ status: false, message: err }));
});

router.get("/show_times", (req, res) => {
  ShowTime.findAll()
    .then(data => res.json({ status: true, message: "OK", data: data }))
    .catch(err => res.json({ status: false, message: err }));
});

router.get("/show_times/:id", (req, res) => {
  ShowTime.findByPk(req.params.id)
    .then(data => res.json({ status: true, message: "OK", data: data }))
    .catch(err => res.json({ status: false, message: err }));
});

router.post("/show_times/", (req, res) => {
  ShowTime.create({
    time: req.body.time
  })
    .then(data => res.json({ status: true, message: "OK", data: data }))
    .catch(err => res.json({ status: false, message: err }));
});

router.put("/show_times/:id", (req, res) => {
  ShowTime.update(
    {
      time: req.body.time,
      movieId: req.body.movieId,
      theaterId: req.body.theaterId,
      ticketTypeId: req.body.ticketTypeId
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(() => res.json({ status: true, message: "OK" }))
    .catch(err => res.json({ status: false, message: err }));
});

router.delete("/show_times", (req, res) => {
  ShowTime.destroy({
    truncate: true
  })
    .then(() => res.json({ status: true, message: "OK" }))
    .catch(err => res.json({ status: false, message: err }));
});

router.delete("/show_times/:id", (req, res) => {
  ShowTime.destroy({
    where: {
      id: req.params.id
    },
    truncate: true
  })
    .then(() => res.json({ status: true, message: "OK" }))
    .catch(err => res.json({ status: false, message: err }));
});

router.get("/tickets", (req, res) => {
  Ticket.findAll()
    .then(data => res.json({ status: true, message: "OK", data: data }))
    .catch(err => res.json({ status: false, message: err }));
});

router.get("/tickets/:id", (req, res) => {
  Ticket.findByPk(req.params.id)
    .then(data => res.json({ status: true, message: "OK", data: data }))
    .catch(err => res.json({ status: false, message: err }));
});

router.post("/tickets", (req, res) => {
  Ticket.create({
    seatRow: req.body.seatRow,
    seatColumn: req.body.seatColumn
  })
    .then(data => res.json({ status: true, message: "OK", data: data }))
    .catch(err => res.json({ status: false, message: err }));
});

router.put("/tickets/:id", (req, res) => {
  Ticket.update(
    {
      seatRow: req.body.seatRow,
      seatColumn: req.body.seatColumn
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(() => res.json({ status: true, message: "OK" }))
    .catch(err => res.json({ status: false, message: err }));
});

router.delete("/tickets", (req, res) => {
  Ticket.destroy({
    truncate: true
  })
    .then(() => res.json({ status: true, message: "OK" }))
    .catch(err => res.json({ status: false, message: err }));
});

router.delete("/tickets/:id", (req, res) => {
  Ticket.destroy({
    where: {
      id: req.params.id
    },
    truncate: true
  })
    .then(() => res.json({ status: true, message: "OK" }))
    .catch(err => res.json({ status: false, message: err }));
});

router.get("/users", (req, res) => {
  User.findAll()
    .then(data => res.json({ status: true, message: "OK", data: data }))
    .catch(err => res.json({ status: false, message: err }));
});

router.get("/users/:id", (req, res) => {
  User.findByPk(req.params.id)
    .then(data => res.json({ status: true, message: "OK", data: data }))
    .catch(err => res.json({ status: false, message: err }));
});

router.post("/users", (req, res) => {
  User.create({
    username: req.body.username,
    hashedPassword: req.body.hashedPassword,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber
  })
    .then(data => res.json({ status: true, message: "OK", data: data }))
    .catch(err => res.json({ status: false, message: err }));
});

router.put("/users/:id", (req, res) => {
  User.update(
    {
      username: req.body.username,
      hashedPassword: req.body.hashedPassword,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(() => res.json({ status: true, message: "OK" }))
    .catch(err => res.json({ status: false, message: err }));
});

router.delete("/users", (req, res) => {
  User.destroy({
    truncate: true
  })
    .then(() => res.json({ status: true, message: "OK" }))
    .catch(err => res.json({ status: false, message: err }));
});

router.delete("/users/:id", (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    },
    truncate: true
  })
    .then(() => res.json({ status: true, message: "OK" }))
    .catch(err => res.json({ status: false, message: err }));
});

router.get("/ticket_shopping_carts", (req, res) => {
  TicketShoppingCart.findAll()
    .then(data => res.json({ status: true, message: "OK", data: data }))
    .catch(err => res.json({ status: false, message: err }));
});

router.get("/ticket_shopping_carts/:id", (req, res) => {
  TicketShoppingCart.findByPk(req.params.id)
    .then(data => res.json({ status: true, message: "OK", data: data }))
    .catch(err => res.json({ status: false, message: err }));
});

router.post("/ticket_shopping_carts", (req, res) => {
  TicketShoppingCart.create({
    userId: req.body.userId,
    ticketId: req.body.ticketId
  })
    .then(data => res.json({ status: true, message: "OK", data: data }))
    .catch(err => res.json({ status: false, message: err }));
});

router.delete("/ticket_shopping_carts", (req, res) => {
  TicketShoppingCart.destroy({
    truncate: true
  })
    .then(() => res.json({ status: true, message: "OK" }))
    .catch(err => res.json({ status: false, message: err }));
});

router.delete("/ticket_shopping_carts/:id", (req, res) => {
  TicketShoppingCart.destroy({
    where: {
      id: req.params.id
    },
    truncate: true
  })
    .then(() => res.json({ status: true, message: "OK" }))
    .catch(err => res.json({ status: false, message: err }));
});

module.exports = router;
