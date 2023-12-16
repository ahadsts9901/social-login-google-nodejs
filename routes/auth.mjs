import express from "express";
import passport from "passport";

import "../passport.mjs"

const router = express.Router();

// client url
// const CLIENT_URL = "http://localhost:3000";
const CLIENT_URL = "/";

// if login fail
router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

// logout
router.post("/logout", async (req, res, next) => {

  res.cookie('token', "", {
    httpOnly: true,
    secure: true,
  });

  res.clearCookie("token");
  res.redirect(CLIENT_URL);
  req.logout();

  console.log("logout done");

});

// google: actual api to hit
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// google: callback api to redirect to homepage
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL, // redirect to homepage on success
    failureRedirect: "/login/failed", //redirect to error on error
  })
);

// facebook: actual api to hit for
router.get(
  "/facebook",
  passport.authenticate("facebook")
);

// facebook: callback api to redirect to homepage for
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: CLIENT_URL, // redirect to homepage on success
    failureRedirect: "/login/failed", //redirect to error on error
  })
);

export default router;