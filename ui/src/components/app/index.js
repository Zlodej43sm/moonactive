// node modules
import React, { useState } from "react";

// material
import { withStyles } from "@material-ui/core/styles";

// local component
import InfoBar from "components/common/info_bar";
import PromotionsGenerateButton from "components/promotions_generate_button";
import PromotionsListWrapper from "components/promotions_list_wrapper";

// local files
import styles from "./styles";

const App = ({ classes }) => {
  const [renderListCount, setRenderListCount] = useState(0);
  return (
    <div className={classes.wrapper}>
      <InfoBar />
      <div className={classes.buttonsRegion}>
        <PromotionsGenerateButton
          {...{ setRenderListCount, renderListCount }}
        />
      </div>
      <PromotionsListWrapper {...{ renderListCount }} />
    </div>
  );
};

export default withStyles(styles)(App);
