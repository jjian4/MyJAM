const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");

const User = mongoose.model("users");
const Portfolio = mongoose.model("portfolios");
const Entry = mongoose.model("entries");

module.exports = (app) => {
  app.put("/api/portfolio_settings", requireLogin, async (req, res) => {
    const { newPortfolioSettings } = req.body;
    try {
      const user = await User.findById(req.user.id);
      user.portfolioSettings = newPortfolioSettings;
      await user.save();
      res.send(user.portfolioSettings);
    } catch (e) {
      res.status(500).send(e.message);
    }
  });

  // Gets a summary of all of the user's portfolios
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
            numEntries: portfolio.entryIds.length,
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

      res.send(newPortfoliosList);
    } catch (e) {
      res.status(500).send(e.message);
    }
  });

  // Gets all entries in a specific portfolio
  app.get("/api/entries/:portfolioId", requireLogin, async (req, res) => {
    const { portfolioId } = req.params;
    try {
      const user = await User.findById(req.user.id);
      const { portfolioIds } = user;
      if (!portfolioIds.includes(portfolioId)) {
        res.status(401).send("User does not have access to this portfolio.");
      }
      const portfolio = await Portfolio.findById(portfolioId);

      const entries = [];
      for (entryId of portfolio.entryIds) {
        const entry = await Entry.findById(entryId);
        entries.push(entry);
      }

      res.send(entries);
    } catch (e) {
      res.status(500).send(e.message);
    }
  });

  // Save a new portfolio entry
  app.post("/api/entry", requireLogin, async (req, res) => {
    const { portfolioId, entry } = req.body;
    try {
      const user = await User.findById(req.user.id);
      const { portfolioIds } = user;
      if (!portfolioIds.includes(portfolioId)) {
        res.status(401).send("User does not have access to this portfolio.");
      }
      const portfolio = await Portfolio.findById(portfolioId);
      const newEntry = await new Entry(entry).save();
      portfolio.entryIds.push(newEntry.id);
      portfolio.save();
      res.send(newEntry);
    } catch (e) {
      res.status(500).send(e.message);
    }
  });
};
