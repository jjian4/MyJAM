const passport = require("passport");
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");

const User = mongoose.model("users");
const Portfolio = mongoose.model("portfolios");
const Entry = mongoose.model("entries");

module.exports = (app) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/portfolio");
    }
  );

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });

  app.delete("/api/current_user", requireLogin, async (req, res) => {
    // For each portfolio, delete entries, then delete portfolio
    try {
      const user = await User.findById(req.user.id);
      const { portfolioIds } = user;

      for (const portfolioId of portfolioIds) {
        const portfolio = await Portfolio.findById(portfolioId);
        for (const entryId of portfolio.entryIds) {
          await Entry.findByIdAndDelete(entryId);
        }
        await Portfolio.findByIdAndDelete(portfolioId);
      }

      await User.findByIdAndDelete(req.user.id);

      req.logout();
      res.send(req.user);
    } catch (e) {
      res.status(500).send(e.message);
    }
  });
};
