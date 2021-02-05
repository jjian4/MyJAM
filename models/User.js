const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  creationDate: Date,
  lastLoginDate: Date,
  displayName: String,
  familyName: String,
  givenName: String,
  email: String,
  photo: String,
  portfolioIds: [mongoose.ObjectId],
});

mongoose.model("users", userSchema);
