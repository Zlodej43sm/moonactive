// node modules
import { configureStore } from "@reduxjs/toolkit";

// local files
import { loader, promotionsList } from "store/reducers";

export default configureStore({
  devTools: process.env.NODE_ENV !== "production",
  reducer: {
    loader,
    promotionsList
  }
});
