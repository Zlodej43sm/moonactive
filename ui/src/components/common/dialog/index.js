// node modules
import React from "react";
import { useTranslation } from "react-i18next";

// material components
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

// local files
import styles from "./styles";

const CommonDialog = ({ classes, children, ...props }) => {
  const { t } = useTranslation();
  const { title, open, onClose, onSave } = props;

  return (
    <Dialog fullWidth {...{ open, onClose }}>
      <DialogTitle className={classes.title}>{title}</DialogTitle>
      <form onSubmit={onSave} autoComplete="off">
        <DialogContent>{children}</DialogContent>
        <DialogActions className={classes.actions}>
          <Button onClick={onClose}>{t("Cancel")}</Button>
          <Button type="submit" variant="contained">
            {t("Save")}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default withStyles(styles)(CommonDialog);
