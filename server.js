const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const image = require("./controllers/image");
const profile = require("./controllers/profile");
const db = knex({
  // client: "pg",
  // connection: {
  //   host: "127.0.0.1",
  //   user: "postgres",
  //   password: "hockey89",
  //   database: "smartbrain",
  // },
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  },
});

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// console.log(
//   db
//     .select("*")
//     .from("users")
//     .then((data) => console.log(data))
// );

// console.log(
//   db
//     .select("*")
//     .from("users")
//     .then((data) => {
//       // console.log(data);
//     })
// );

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("it is working");
});

app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});

app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});
app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on ${process.env.PORT}`);
});
