const { Types } = require("mongoose");

const { statusCodes } = require("../utils/constants");

const { Promotion } = require("../models");

const promotionDuplicate = async(req, res) => {
  try {
    const { body: { id } } = req;
    const promotionDuplicated = await Promotion.findById(id);

    promotionDuplicated._id = Types.ObjectId();
    promotionDuplicated.isNew = true;

    await promotionDuplicated.save();

    res.status(statusCodes.OK).json({
      message: `Promotion ${id} successfully duplicated!`,
      result: promotionDuplicated
    });
  } catch ({ message }) {
    res.status(statusCodes.ERR).json({ message });
  }
};

const promotionUpdate = async(req, res) => {
  try {
    const { body } = req;
    const promotionUpdated = await Promotion.findByIdAndUpdate(body.id, body, { new: true });

    res.status(statusCodes.OK).json({
      message: `Promotion ${body.id} successfully updated!`,
      result: promotionUpdated
    });
  } catch ({ message }) {
    res.status(statusCodes.ERR).json({ message });
  }
};

const promotionDelete = async(req, res) => {
  try {
    const { body: { id } } = req;
    const promotionDeleted = await Promotion.findByIdAndDelete(id);

    res.status(statusCodes.OK).json({
      message: `Promotion ${id} deleted!`,
      result: promotionDeleted
    });
  } catch ({ message }) {
    res.status(statusCodes.ERR).json({ message });
  }
};

module.exports = {
  promotionDuplicate,
  promotionUpdate,
  promotionDelete
};
