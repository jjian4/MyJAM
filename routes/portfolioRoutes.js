const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");

const User = mongoose.model("users");

module.exports = (app) => {
  app.put("/api/portfolio_settings", requireLogin, async (req, res) => {
    const { userId, newPortfolioSettings } = req.body;
    try {
      const user = await User.findById(userId);
      user.portfolioSettings = newPortfolioSettings;
      await user.save();
      res.send(user.portfolioSettings);
    } catch (e) {
      res.status(500).send(e.message);
    }
  });
};
