const express = require("express");
const router = express.Router();

const LIMIT = 4

const {
  User,
  Movie,
  Theater,
  TheaterStatus,
  TicketType,
  TicketStatus
} = require("../models");

router.get("/count/movies", (req, res) => {
  Movie.findAndCountAll()
  .then(data => res.json({ status: true, message: "OK", data: data.count, limit: LIMIT }))
  .catch(err => res.json({ status: false, message: err }));
})

router.get("/movies", (req, res) => {
  if (req.query.page === undefined || Object.keys(req.query.page).length == 0) {
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
      seatPerRow: req.body.seatPerRow
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

router.put("/theaters/:id/status/:id2", (req, res) => {
  Theater.update(
    {
      theaterStatusId: req.params.id2
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(() => {
      res.json({ status: true, message: "OK" });
    })
    .catch(err => {
      res.json({ status: false, message: err });
    });
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
      where: {
        id: req.params.id
      }
    },
    {
      name: req.body.name,
      price: req.body.price
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

module.exports = router;
