// node modules
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// material components
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {
  MoreVert,
  EditOutlined,
  FileCopyOutlined,
  DeleteOutlined
} from "@material-ui/icons";

// local files
import {
  ACTION_EDIT,
  ACTION_DUPLICATE,
  ACTION_DELETE
} from "components/common/constants";
import styles from "./styles";

// @TODO: MenuItem can be rendered and adjusted on a hight level as an array of options to be more flexible
const MenuWrapper = ({ classes, ...props }) => {
  const { t } = useTranslation();
  const { id, onRowAction } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    event.stopPropagation();
  };
  const handleClose = (event) => {
    setAnchorEl(null);
    event.stopPropagation();
  };
  const handleAction = (event) => {
    const { action } = event.currentTarget.dataset;
    handleClose(event);
    onRowAction({ id, action });
  };
  const isOpen = !!anchorEl;

  return (
    <>
      <IconButton className={classes.iconButton} onClick={handleClick}>
        <MoreVert />
      </IconButton>
      {!!isOpen && (
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={isOpen}
          onClose={handleClose}
        >
          <MenuItem
            onClick={handleAction}
            className={classes.menuItem}
            data-action={ACTION_DUPLICATE}
          >
            <FileCopyOutlined fontSize={"small"} /> {t("Duplicate")}
          </MenuItem>
          <MenuItem
            onClick={handleAction}
            className={classes.menuItem}
            data-action={ACTION_EDIT}
          >
            <EditOutlined fontSize={"small"} /> {t("Edit")}
          </MenuItem>
          <MenuItem
            onClick={handleAction}
            className={classes.menuItem}
            data-action={ACTION_DELETE}
          >
            <DeleteOutlined fontSize={"small"} /> {t("Delete")}
          </MenuItem>
        </Menu>
      )}
    </>
  );
};

export default withStyles(styles)(MenuWrapper);
