const { workerData, parentPort } = require("worker_threads");

const { PROMOTION_TYPES, commonConst } = require("../utils/constants");

const promotionsList = [];
const { MS_IN_DAY } = commonConst;
let i = 0;

while (i < workerData) {
  const _order = i;
  const promotionName = `Promotion ${i}`;
  const type = PROMOTION_TYPES[Math.floor(Math.random() * PROMOTION_TYPES.length)];
  const userGroupName = `Group ${Math.floor(Math.random() * workerData)}`;
  const startDate = Date.now() - (i * MS_IN_DAY);
  const endDate = Date.now() - (i * MS_IN_DAY * 2);

  promotionsList.push({ _order, promotionName, type, userGroupName, startDate, endDate });
  i++;
}

parentPort.postMessage(promotionsList);
