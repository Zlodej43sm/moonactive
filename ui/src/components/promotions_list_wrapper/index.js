// node modules
import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

// material
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

// local components
import CommonTable from "components/common/table";
import PromotionEditDialog from "components/promotion_edit_dialog";

// local files
import {
  getPromotionsListApi,
  promotionDuplicateApi,
  promotionDeleteApi
} from "api";
import {
  ACTION_EDIT,
  ACTION_DUPLICATE,
  ACTION_DELETE,
  ACTION_PREV,
  ACTION_NEXT,
  ROW_HEIGHT
} from "components/common/constants";
import {
  SET_PROMOTIONS_LIST,
  LOAD_PREV_PROMOTIONS_LIST,
  LOAD_NEXT_PROMOTIONS_LIST,
  DUPLICATE_PROMOTION,
  DELETE_PROMOTION
} from "store/types";
import { generateOptionsObject } from "components/common/utils";
import styles from "./styles";

const PromotionsListWrapper = ({ classes, ...props }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { renderListCount, socket } = props;
  const {
    from,
    to,
    rows,
    itemsPerStep,
    itemsPerPage,
    promotionSchema
  } = useSelector(({ promotionsList }) => promotionsList);
  const [isNextLoading, setIsNextLoading] = useState(false);
  const [isPrevLoading, setIsPrevLoading] = useState(false);
  const [promotion, setPromotion] = useState(null);
  const onRowAction = useCallback(
    (data) => {
      const { id, action } = data;
      let apiHandler = null;
      let options = null;

      switch (action) {
        case ACTION_DUPLICATE:
          options = generateOptionsObject({
            body: { id },
            loadingMsg: "Duplicating promotion",
            type: DUPLICATE_PROMOTION,
            dispatch
          });
          apiHandler = promotionDuplicateApi;
          break;
        case ACTION_EDIT:
          const row = rows.find(({ _id }) => _id === id);
          setPromotion(row);
          break;
        case ACTION_DELETE:
          options = generateOptionsObject({
            body: { id },
            loadingMsg: "Deleting promotion",
            type: DELETE_PROMOTION,
            dispatch
          });
          apiHandler = promotionDeleteApi;
          break;
        default:
          throw new Error(`Action - ${action} not defined`);
      }

      if (apiHandler) {
        const apiPromise = apiHandler(options);
        dispatch(apiPromise);
      }
    },
    [rows, dispatch]
  );
  const onContentScroll = useCallback(
    (direction, contentEl) => {
      let getPromotionsFrom = null;
      let type = null;
      let isUpdateNeeded = false;

      switch (direction) {
        case ACTION_PREV:
          type = LOAD_PREV_PROMOTIONS_LIST;
          getPromotionsFrom = from - itemsPerStep;
          isUpdateNeeded = from - itemsPerStep >= 0;
          setIsPrevLoading(isUpdateNeeded);
          break;
        case ACTION_NEXT:
          type = LOAD_NEXT_PROMOTIONS_LIST;
          getPromotionsFrom = to;
          isUpdateNeeded = true;
          setIsNextLoading(true);
          break;
        default:
          throw new Error(`Direction - ${direction} not defined`);
      }

      if (isUpdateNeeded) {
        const options = {
          body: {
            from: getPromotionsFrom,
            itemsPerStep
          },
          successCb: (res) => {
            dispatch({
              type,
              payload: { rows: res.result }
            });
            setIsPrevLoading(false);
            setIsNextLoading(false);

            contentEl.scrollTop = contentEl.scrollHeight / 2 - ROW_HEIGHT / 2;
          },
          errorCb: () => {
            setIsPrevLoading(false);
            setIsNextLoading(false);
          }
        };
        const promotionsListPromise = getPromotionsListApi(options);

        dispatch(promotionsListPromise);
      }
    },
    [dispatch, itemsPerStep, from, to]
  );

  useEffect(() => {
    const options = generateOptionsObject({
      body: { from: 0, itemsPerStep: itemsPerPage },
      loadingMsg: "Loading promotions list",
      type: SET_PROMOTIONS_LIST,
      dispatch
    });
    const promotionsListPromise = getPromotionsListApi(options);
    dispatch(promotionsListPromise);
  }, [renderListCount, itemsPerPage, dispatch]);

  return (
    <>
      <Paper className={classes.wrapper}>
        {isPrevLoading && t("Loading previous...")}
        <CommonTable
          {...{
            tableSchema: promotionSchema,
            rows,
            onRowAction,
            onContentScroll
          }}
        />
        {isNextLoading && t("Loading next...")}
      </Paper>
      {promotion && (
        <PromotionEditDialog
          {...{
            toggleOpened: setPromotion,
            promotion,
            promotionSchema,
            socket
          }}
        />
      )}
    </>
  );
};

export default withStyles(styles)(PromotionsListWrapper);
