const promotionsList = require("../controllers/promotionsList");

module.exports = (app) => {
  app.get("/promotionsList", promotionsList);
};
