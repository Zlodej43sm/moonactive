const generate = require("../controllers/generate");

module.exports = (app) => {
  app.post("/generate", generate);
};
