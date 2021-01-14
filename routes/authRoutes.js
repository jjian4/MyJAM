const passport = require("passport");

module.exports = (app) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  app.get("/auth/google/callback", passport.authenticate("google"));

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.send({ logged_out: true, current_user: req.user });
  });

  app.get("/api/current_user", (req, res) => {
    res.send({ current_user: req.user || null });
  });
};
