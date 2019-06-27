const express = require("express");
const router = express.Router();

// '../' is malicous
const path = require("path");
const middleware = require("./middleware");

router.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/../views/user_home.html"));
});

router.get("/phim", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/../views/user_phim.html"));
});

router.get("/phim/:id", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/../views/user_phim_info.html"));
});

router.get("/rap", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/../views/user_rap.html"));
});

router.get("/rap/:id", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/../views/user_rap_info.html"));
});

router.get("/giohang", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/../views/user_giohang.html"));
});

router.get("/support", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/../views/user_support.html"));
});

router.get("/me/profile", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/../views/user_profile.html"));
});

router.get("/me/history", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/../views/user_history.html"));
});

router.get("/ve", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/../views/user_ticket.html"))
})

router.get("/food", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/../views/user_food.html"))
})

router.get("/quen", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/../views/user_quen.html"))
})

router.get("/recovery", (req, res) => {
  if(!req.query.tokenRecover || !req.query.email){
    res.send("Haizz, U don't know how to stop do you ?")
    return
  }
  res.sendFile(path.resolve(__dirname + "/../views/user_recovery.html"))
})

module.exports = router;
