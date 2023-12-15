import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { userModel } from "./schema.mjs";
import passport from "passport";
import "dotenv/config";
import jwt from "jsonwebtoken";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/v1/auth/google/callback",
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      const user = {
        name: profile._json.name,
        firstName: profile._json.given_name,
        lastName: profile._json.family_name,
        email: profile._json.email,
        isVerified: profile._json.email_verified,
        profilePhoto: profile._json.picture,
        provider: profile.provider,
      };

      console.log(accessToken);

      const userData = await userModel.findOne({
        email: user.email,
      }).exec()

      var createUser;

      if (!userData) {
        createUser = await userModel.create({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          isEmailVerified: user.isVerified,
          profilePhoto: user.profilePhoto,
          provider: user.provider,
        })
      }

      const token = jwt.sign({
        isAdmin: false,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        _id: userData._id ? userData._id : createUser.insertedId,
        profilePhoto: user.profilePhoto,
        gender: userData.gender || null,
        dateOfBirth: userData.dateOfBirth || null,
        createdOn: userData.createdOn,
        provider: user.provider,
      }, process.env.SECRET, {
        expiresIn: `24h`
      });

      console.log("again again");

      req.res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
      });

      done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user); // Serializing the entire user object
});

passport.deserializeUser((user, done) => {
  done(null, user); // Deserializing the entire user object
});