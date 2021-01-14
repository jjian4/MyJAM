module.exports = {
  googleClientID: process.env.GOOGLE_CLIENT_ID, // from google, needed for google oauth
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET, // from google, needed for google oauth
  mongoURI: process.env.MONGO_URI, // from mongodb, to access db
  cookieKey: process.env.COOKIE_KEY, // random string, used to make cookie session
};
