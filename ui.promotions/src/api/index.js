import { requestHandler } from "./requestHandler";

const generatePromotionsApi = requestHandler("generate", "post");
const getPromotionsListApi = requestHandler("promotionsList", "get");
const promotionDuplicateApi = requestHandler("promotion", "post");
const promotionEditApi = requestHandler("promotion", "put");
const promotionDeleteApi = requestHandler("promotion", "delete");

export {
  generatePromotionsApi,
  getPromotionsListApi,
  promotionDuplicateApi,
  promotionEditApi,
  promotionDeleteApi
};
