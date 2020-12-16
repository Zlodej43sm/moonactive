const { promotionUpdate, promotionDuplicate, promotionDelete } = require("../controllers/promotion");

module.exports = app => {
  app.post("/promotion", promotionDuplicate);
  app.put("/promotion", promotionUpdate);
  app.delete("/promotion", promotionDelete);
};
