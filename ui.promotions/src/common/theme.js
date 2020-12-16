import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  customStyles: {
    contentWidth: 1024,
    contentMinWidth: 768
  },
  animations: {
    rotate: (duration = "1000ms") => `rotate ${duration} infinite ease-in-out`
  }
});
