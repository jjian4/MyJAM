const mongoose = require("mongoose");
const { Schema } = mongoose;

const portfolioSchema = new Schema({
  dateCreated: Date,
  lastUpdate: Date,
  name: String,
  ownerId: mongoose.ObjectId,
  displaySettings: {
    display: String,
    isCardColorOn: Boolean,
    // Dashboard settings
    boardDensity: String,
    boardColumnFilter: [
      {
        statusId: String,
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
  entryIds: [mongoose.ObjectId],
});

mongoose.model("portfolios", portfolioSchema);
