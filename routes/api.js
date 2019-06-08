const express = require("express");
const router = express.Router();

const { User, Movie, Theater, TheaterStatus } = require("../models");

router.get("/movies", (req, res) => {
  Movie.findAll()
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

module.exports = router;
