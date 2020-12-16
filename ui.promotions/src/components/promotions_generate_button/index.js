// node modules
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import classNames from "classnames";

// material
import { withStyles } from "@material-ui/core/styles";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import Button from "@material-ui/core/Button";

// local files
import { generatePromotionsApi } from "api";
import { ERASE_PROMOTIONS_LIST } from "store/types";
import styles from "./styles";

const PromotionsGenerateButton = ({ classes, ...props }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { setRenderListCount, renderListCount } = props;
  const { initialListLength } = useSelector(
    ({ promotionsList }) => promotionsList
  );
  const [isLoading, setIsLoading] = useState(false);
  const iconClass = classNames({ [classes.loading]: isLoading });
  const handleButtonClick = () => {
    const options = {
      body: {
        listLength: initialListLength
      },
      successCb: () => {
        dispatch({
          type: ERASE_PROMOTIONS_LIST
        });
        setRenderListCount(renderListCount + 1);
        setIsLoading(false);
      },
      errorCb: () => setIsLoading(false),
      loadingMsg: "Generating promotions list"
    };
    const generatePromotionsPromise = generatePromotionsApi(options);

    setIsLoading(true);
    dispatch(generatePromotionsPromise);
  };

  return (
    <Button
      variant="contained"
      startIcon={<AutorenewIcon className={iconClass} />}
      disabled={isLoading}
      onClick={handleButtonClick}
    >
      {t("Generate promotions list")}
    </Button>
  );
};

export default withStyles(styles)(PromotionsGenerateButton);
