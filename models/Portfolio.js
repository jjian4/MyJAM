const mongoose = require("mongoose");
const { Schema } = mongoose;

const portfolioSchema = new Schema({
  name: String,
  ownerId: mongoose.ObjectId,
  entries: [
    {
      dateCreated: Date,
      lastUpdate: Date,
      color: String,
      isStarred: Boolean,
      company: String,
      domain: String,
      logo: String,
      jobTitle: String,
      applyDate: String,
      deadlineDate: String,
      status: String,
      url: String,
      notes: String,
    },
  ],
});

mongoose.model("portfolios", portfolioSchema);
