const fs = require("fs");

const { commonPath, statusCodes } = require("../utils/constants");
const runServiceWorker = require("../utils/serviceWorker");

const { Promotion } = require("../models");

const generate = async(req, res) => {
  try {
    const { body: { listLength = 10000 } } = req;
    const generatedPromotionsList = await runServiceWorker(commonPath.GENERATE_SERVICE, listLength);

    await Promotion.deleteMany();
    await Promotion.insertMany(generatedPromotionsList);
    await fs.writeFile(commonPath.PROMOTIONS_OUTPUT_JSON, JSON.stringify(generatedPromotionsList), "utf8", err => {
      if (err) {
        throw err;
      }
    });
    res.status(statusCodes.OK).json({ message: `Promotions list successfully generated - ${commonPath.PROMOTIONS_OUTPUT_JSON}!` });
  } catch ({ message }) {
    res.status(statusCodes.ERR).json({ message });
  }
};

module.exports = generate;
