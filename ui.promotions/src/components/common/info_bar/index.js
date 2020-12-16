// node modules
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

// material components
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

// local files
import { UPDATE_LOADER } from "store/types";
import { HIDE_DURATION, ELEVATION, types } from "./constants";

const InfoBar = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isInfoBarOpened, setInfoBarOpened] = useState(false);
  const placementOptions = { vertical: "top", horizontal: "center" };
  const [messageInfo, setMessageInfo] = useState(null);
  const { message, type } = useSelector(({ loader }) => loader);
  const severity = types[type] || types.loading;

  useEffect(() => {
    const { length } = message;
    const isOpened = length && messageInfo && isInfoBarOpened;

    if (length && !messageInfo) {
      setMessageInfo({ ...message[0] });
      dispatch({ type: UPDATE_LOADER });
      setInfoBarOpened(true);
    }

    if (isOpened) setInfoBarOpened(false);
  }, [messageInfo, message, isInfoBarOpened, dispatch]);

  const handleExited = () => setMessageInfo(null);
  const handleClose = () => setInfoBarOpened(false);

  return (
    <>
      {messageInfo && (
        <Snackbar
          key={messageInfo.key}
          anchorOrigin={placementOptions}
          autoHideDuration={HIDE_DURATION}
          open={isInfoBarOpened}
          onExited={handleExited}
          onClose={handleClose}
        >
          <Alert
            onClick={handleClose}
            elevation={ELEVATION}
            severity={severity}
          >
            {t(messageInfo.message)}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default InfoBar;
