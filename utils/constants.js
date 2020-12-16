const PROMOTION_TYPES = ["Basic", "Common", "Epic"];

const commonPath = {
  GENERATE_SERVICE: "./services/generatePromotionsService.js",
  PROMOTIONS_OUTPUT_JSON: "./public/promotions.json"
};

const commonConst = {
  MS_IN_DAY: 86400000
};

const statusCodes = {
  OK: 200,
  BAD_REQ: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  ERR: 500
};

module.exports = {
  PROMOTION_TYPES,
  commonPath,
  commonConst,
  statusCodes
};
