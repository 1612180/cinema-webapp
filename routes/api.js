const express = require("express");
const router = express.Router();

const pgp = require("pg-promise")();
const db = pgp(process.env.DATABASE_URL);

// movies
router.get("/movies", (req, res) => {
  db.any("select * from movies;")
    .then(data => {
      res.json({ status: true, data: data });
    })
    .catch(error => {
      res.json({ status: false });
      console.log("ERROR:", error);
    });
});

router.get("/movies/:id", (req, res) => {
  db.any("select * from movies where id = $1;", [req.params.id])
    .then(data => {
      res.json({ status: true, data: data });
    })
    .catch(error => {
      res.json({ status: false });
      console.log("ERROR:", error);
    });
});

router.post("/movies", (req, res) => {
  db.none(
    "insert into movies(name, rating, description) \
    values (${name}, ${rating}, ${description});",
    req.body
  )
    .then(() => {
      res.json({ status: true });
    })
    .catch(error => {
      res.json({ status: true });
      console.log("ERROR:", error);
    });
});

router.put("/movies/:id", (req, res) => {
  db.none(
    "update movies \
        set name = $1, \
            rating = $2, \
            description = $3 \
        where id = $4;",
    [req.body.name, req.body.rating, req.body.description, req.params.id]
  )
    .then(() => {
      res.json({ status: true });
    })
    .catch(error => {
      res.json({ status: true });
      console.log("ERROR:", error);
    });
});

router.delete("/movies", (req, res) => {
  db.none("delete from movies;")
    .then(() => {
      res.json({ status: true });
    })
    .catch(error => {
      res.json({ status: false });
      console.log("ERROR:", error);
    });
});

router.delete("/movies/:id", (req, res) => {
  db.none("delete from movies where id = $1;", [req.params.id])
    .then(() => {
      res.json({ status: true });
    })
    .catch(error => {
      res.json({ status: false });
      console.log("ERROR:", error);
    });
});

// cinemas
router.get("/cinemas", (req, res) => {
  db.any("select * from cinemas;")
    .then(data => {
      res.json({ status: true, data: data });
    })
    .catch(error => {
      res.json({ status: false });
      console.log("ERROR:", error);
    });
});

router.get("/cinemas/:id", (req, res) => {
  db.any("select * from cinemas where id = $1;", [req.params.id])
    .then(data => {
      res.json({ status: true, data: data });
    })
    .catch(error => {
      res.json({ status: false });
      console.log("ERROR:", error);
    });
});

router.post("/cinemas", (req, res) => {
  db.none(
    "insert into cinemas(name, address, seat_capacity) \
    values (${name}, ${address}, ${seat_capacity});",
    req.body
  )
    .then(() => {
      res.json({ status: true });
    })
    .catch(error => {
      res.json({ status: false });
      console.log("ERROR:", error);
    });
});

router.put("/cinemas/:id", (req, res) => {
  db.none(
    "update cinemas \
    set name = $1, \
        address = $2, \
        seat_capacity = $3 \
    where id = $4;",
    [req.body.name, req.body.address, req.body.seat_capacity, req.params.id]
  )
    .then(() => {
      res.json({ status: true });
    })
    .catch(error => {
      res.json({ status: false });
      console.log("ERROR:", error);
    });
});

router.delete("/cinemas", (req, res) => {
  db.none("delete from cinemas;", [req.params.id])
    .then(() => {
      res.json({ status: true });
    })
    .catch(error => {
      res.json({ status: false });
      console.log("ERROR:", error);
    });
});
router.delete("/cinemas/:id", (req, res) => {
  db.none("delete from cinemas where id = $1;", [req.params.id])
    .then(() => {
      res.json({ status: true });
    })
    .catch(error => {
      res.json({ status: false });
      console.log("ERROR:", error);
    });
});

module.exports = router;
