const { statusCodes } = require("../utils/constants");

const { Promotion } = require("../models");

const promotionsList = async (req, res) => {
  try {
    const {
      query: { from, itemsPerStep },
    } = req;
    const promotions = await Promotion.find({})
      .sort("_order")
      .skip(+from)
      .limit(+itemsPerStep);
    const message = promotions.length
      ? "Promotions list fetched"
      : "No promotions";

    res.status(statusCodes.OK).json({
      message,
      result: promotions,
    });
  } catch ({ message }) {
    res.status(statusCodes.ERR).json({ message });
  }
};

module.exports = promotionsList;
