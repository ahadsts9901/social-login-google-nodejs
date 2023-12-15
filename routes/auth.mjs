import express from "express";
import passport from "passport";
import "../passport.mjs"

const router = express.Router();

const CLIENT_URL = "http://localhost:5002/";

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

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

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"]})
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

export default router;