// node modules
import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";

// material
import { withStyles } from "@material-ui/core/styles";

// local component
import InfoBar from "components/common/info_bar";
import PromotionsGenerateButton from "components/promotions_generate_button";
import PromotionsListWrapper from "components/promotions_list_wrapper";

// local files
import { getApiUrl } from "api/utils";
import styles from "./styles";

const App = ({ classes }) => {
  const [renderListCount, setRenderListCount] = useState(0);
  const ENDPOINT = getApiUrl("");
  const socket = socketIOClient(ENDPOINT);
  useEffect(() => () => socket.disconnect(), [socket]);

  return (
    <div className={classes.wrapper}>
      <InfoBar />
      <div className={classes.buttonsRegion}>
        <PromotionsGenerateButton
          {...{ setRenderListCount, renderListCount }}
        />
      </div>
      <PromotionsListWrapper {...{ renderListCount, socket }} />
    </div>
  );
};

export default withStyles(styles)(App);
