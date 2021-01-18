const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  displayName: String,
  familyName: String,
  givenName: String,
  portfolios: [{ portfolioId: mongoose.ObjectId, portfolioName: String }],
  portfolioSettings: {
    portfolioId: mongoose.ObjectId,
    display: String,
    isCardColorOn: Boolean,
    // Dashboard settings
    boardDensity: String,
    boardColumnFilter: [
      {
        status: String,
        isActive: Boolean,
        isExpanded: Boolean,
      },
    ],
    boardSortProperty: String,
    boardIsSortAscending: Boolean,
    // Table settings
    tableDensity: String,
    tableColumnFilter: [
      {
        name: String,
        property: String,
        isActive: Boolean,
        isDate: Boolean,
      },
    ],
    tableSortProperty: String,
    tableIsSortAscending: Boolean,
  },
});

mongoose.model("users", userSchema);
