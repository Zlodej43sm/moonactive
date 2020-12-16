// node modules
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { I18nextProvider } from "react-i18next";

// material
import { ThemeProvider } from "@material-ui/core/styles";

// local components
import App from "components/app";

// local files
import i18next from "i18next/config";
import { theme } from "common/theme";
import store from "store";
import "index.css";

ReactDOM.render(
  <I18nextProvider i18n={i18next}>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </I18nextProvider>,
  document.getElementById("root")
);
