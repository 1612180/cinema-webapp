require("dotenv").config();
const path = require("path");

// express
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

// module routes
const userViews = require("./routes/user_views");
const admin = require("./routes/admin");
const api = require("./routes/api");

// for parsing application/json
app.use(express.json());

// static
app.use(express.static(path.join(__dirname, "public")));
app.use("/dist", express.static("dist"));

app.use("/", userViews);

app.use("/admin", admin);
app.use("/admin/*", admin);

app.use("/api", api);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
