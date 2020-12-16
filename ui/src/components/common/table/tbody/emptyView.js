// node modules
import React from "react";
import { useTranslation } from "react-i18next";

// material components
import { withStyles } from "@material-ui/core/styles";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

// local files
import styles from "./styles";

const EmptyView = ({ classes, ...props }) => {
  const { t } = useTranslation();
  const { cellsLength } = props;

  return (
    <TableRow>
      <TableCell colSpan={cellsLength} align="center">
        {t("List is empty")}
      </TableCell>
    </TableRow>
  );
};

export default withStyles(styles)(EmptyView);
