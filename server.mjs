import express from "express";
import cors from "cors";
import passport from "passport";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import path from "path";
const _dirname = path.resolve();

import "dotenv/config";
import "./passport.mjs";
import "./mongodb.mjs";

import authRoute from "./routes/auth.mjs";

// initialization
const app = express();
app.use(express.json());
app.use(cookieParser());

// cors setup
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "*",
    credentials: true,
  })
);

// initialize passport
app.use(passport.initialize());

// routes

// auth route
app.use("/api/v1/auth", authRoute);

// protected route ( jwt authentication )
app.use("/api/v1", (req, res, next) => {

  const token = req.cookies.token;

  // console.log("token: ", token);

  try {

    const currentUser = jwt.verify(token, process.env.SECRET);

    req.currentUser = {
      ...currentUser
    };

    next();

  } catch (err) {
    console.error(err);
    res.status(401).send("unauthorized");
    return;
  }
});

// profile api for user authentication ( protected route )
app.get("/api/v1/profile", (req, res, next) => {
  res.send(req.currentUser);
  next();
});

// server connection with front end
app.use(express.static(_dirname + "/web/build"));
app.get("*", (req, res) => {
  res.sendFile(_dirname + "/web/build/index.html");
})
app.use("*", express.static(_dirname + "/web/build"));

// ports
const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log("Server is running!");
});