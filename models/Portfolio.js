const mongoose = require("mongoose");
const { Schema } = mongoose;

const portfolioSchema = new Schema({
  name: String,
  ownerId: mongoose.ObjectId,
  entryIds: [mongoose.ObjectId],
});

mongoose.model("portfolios", portfolioSchema);
