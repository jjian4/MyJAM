const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");

const User = mongoose.model("users");
const Portfolio = mongoose.model("portfolios");

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

  app.get("/api/portfolios", requireLogin, async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      const { portfolioIds } = user;

      const portfolios = [];

      for (const id of portfolioIds) {
        const portfolio = await Portfolio.findById(id);
        if (
          portfolio &&
          portfolio.ownerId &&
          portfolio.ownerId.toString() === user.id
        ) {
          portfolios.push({
            id: id,
            name: portfolio.name,
            numEntries: portfolio.entries.length,
          });
        }
      }
      res.send(portfolios);
    } catch (e) {
      res.status(500).send(e.message);
    }
  });

  app.put("/api/portfolios", requireLogin, async (req, res) => {
    const { newPortfoliosList } = req.body;

    try {
      const user = await User.findById(req.user.id);
      const { portfolioIds } = user;

      // If any portfolios were deleted, delete from db
      for (const portfolioId of portfolioIds) {
        if (!newPortfoliosList.find((x) => x.id === portfolioId.toString())) {
          await Portfolio.deleteOne({ _id: portfolioId });
        }
      }

      // If any portfolios were created, make new document in db (id auto-generates)
      for (const item of newPortfoliosList) {
        if (!item.id) {
          const newPortfolio = await new Portfolio({
            ...item,
            ownerId: user.id,
          }).save();
          item.id = newPortfolio.id;
        }
      }

      // Update user's portfolioIds field
      user.portfolioIds = newPortfoliosList.map((item) => item.id);
      user.save();

      // Return new portfolio list (now with generated ids)
      res.send(newPortfoliosList);
    } catch (e) {
      res.status(500).send(e.message);
    }
  });
};
