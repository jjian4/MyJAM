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
      user.save();
      res.send(user.portfolioSettings);
    } catch (e) {
      res.status(500).send(e.message);
    }
  });

  // Gets a summary of all of the user's portfolios (id, dateCreated, lastUpdate, name, numEntries)
  // Use when you don't need a list of every entry id in each portfolio
  app.get("/api/portfolios_summary", requireLogin, async (req, res) => {
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
            dateCreated: portfolio.dateCreated,
            lastUpdate: portfolio.lastUpdate,
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
          // TODO: Delete all of the portfolio's entries before deleting the portfolio
          const portfolioToDelete = await Portfolio.findById(portfolioId);
          for (const entryId of portfolioToDelete.entryIds) {
            await Entry.findByIdAndDelete(entryId);
          }
          await Portfolio.deleteOne({ _id: portfolioId });
        }
      }

      // If any portfolios were created, make new document in db (id auto-generates)
      for (const item of newPortfoliosList) {
        if (!item.id) {
          const newPortfolio = await new Portfolio({
            dateCreated: Date.now(),
            lastUpdate: Date.now(),
            name: item.name,
            ownerId: user.id,
            entryIds: [],
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
        return res
          .status(401)
          .send("User does not have access to this portfolio.");
      }
      const portfolio = await Portfolio.findById(portfolioId);

      const entries = [];
      for (entryId of portfolio.entryIds) {
        const entry = await Entry.findById(entryId);
        if (entry) {
          entries.push(entry);
        }
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
        return res
          .status(401)
          .send("User does not have access to this portfolio.");
      }
      const portfolio = await Portfolio.findById(portfolioId);
      const newEntry = await new Entry(entry).save();
      // Also add to portfolio entryIds list
      portfolio.entryIds.push(newEntry.id);
      portfolio.lastUpdate = Date.now();
      portfolio.save();
      res.send(newEntry);
    } catch (e) {
      res.status(500).send(e.message);
    }
  });

  app.patch("/api/entry", requireLogin, async (req, res) => {
    // newValues only needs to include the properties that changed (but always needs id)
    const { portfolioId, newValues } = req.body;
    try {
      const user = await User.findById(req.user.id);
      const { portfolioIds } = user;
      if (!portfolioIds.includes(portfolioId)) {
        return res
          .status(401)
          .send("User does not have access to this portfolio.");
      }
      const portfolio = await Portfolio.findById(portfolioId);
      if (!portfolio.entryIds.includes(newValues.id)) {
        return res
          .status(401)
          .send("The portfolio does not have access to this entry.");
      }
      const updatedEntry = await Entry.findByIdAndUpdate(
        newValues.id,
        newValues,
        {
          new: true,
        }
      );
      portfolio.lastUpdate = Date.now();
      portfolio.save();
      res.send(updatedEntry);
    } catch (e) {
      res.status(500).send(e.message);
    }
  });

  app.delete("/api/entry", requireLogin, async (req, res) => {
    const { portfolioId, entryId } = req.body;
    try {
      const user = await User.findById(req.user.id);
      const { portfolioIds } = user;
      if (!portfolioIds.includes(portfolioId)) {
        return res
          .status(401)
          .send("User does not have access to this portfolio.");
      }
      const portfolio = await Portfolio.findById(portfolioId);
      if (!portfolio.entryIds.includes(entryId)) {
        return res
          .status(401)
          .send("The portfolio does not have access to this entry.");
      }

      await Entry.findByIdAndDelete(entryId);
      // Also remove from portfolio entryIds list
      portfolio.entryIds.pull({ _id: entryId });
      portfolio.lastUpdate = Date.now();
      portfolio.save();
      res.send(entryId);
    } catch (e) {
      res.status(500).send(e.message);
    }
  });
};
