const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const mongoose = require("mongoose");
const keys = require("./config/keys");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      const { id, displayName, name, emails, photos } = profile;
      const email = emails && emails.length > 0 ? emails[0].value : null;
      const photo = photos && photos.length > 0 ? photos[0].value : null;

      // The only time we use googleId instead of mongodb user id
      const existingUser = await User.findOne({ googleId: id });
      if (existingUser) {
        // Update name, email, photo since they may have changed since last login
        existingUser.displayName = displayName;
        existingUser.familyName = name.familyName;
        existingUser.givenName = name.givenName;
        existingUser.email = email;
        existingUser.photo = photo;
        existingUser.save();
        return done(null, existingUser);
      }

      const newUser = await new User({
        googleId: id,
        displayName: displayName,
        familyName: name.familyName,
        givenName: name.givenName,
        email: email,
        photo: photo,
        portfolios: [],
        portfolioSettings: {},
      }).save();
      done(null, newUser);
    }
  )
);
