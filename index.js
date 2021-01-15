const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
const authRoutes = require("./routes/authRoutes");
require("./models/User");
require("./passport");

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    keys: [keys.cookieKey],
  })
);
// Passport pulls user id out of cookie
app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);

if (process.env.NODE_ENV === "production") {
  // In deployed version, serve prod assets like main.js and main.css
  app.use(express.static("client/build"));

  // If route is unrecognized (ex. routes other
  // than api/* or /auth/google), serve index.html
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
