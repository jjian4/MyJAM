const mongoose = require("mongoose");
const { Schema } = mongoose;

const entrySchema = new Schema({
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
  statusId: String,
  url: String,
  notes: String,
});

// Gives each entry a new property 'id', since client checks for id instead of _id
entrySchema.virtual("id").get(function () {
  return this._id.toHexString();
});
entrySchema.set("toJSON", {
  virtuals: true,
});

mongoose.model("entries", entrySchema);
