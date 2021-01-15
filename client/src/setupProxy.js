const createProxyMiddleware = require("http-proxy-middleware");

// Allows client to access server routes with relative url paths
// (by default client will go to port 3000 instead of 5000)
module.exports = function (app) {
  app.use(
    ["/api", "/auth/google"],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );
};
