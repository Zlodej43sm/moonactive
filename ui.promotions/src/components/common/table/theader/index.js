// node modules
import React from "react";
import { uniqueId } from "lodash";
import { useTranslation } from "react-i18next";

// material components
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";

// local files
import styles from "./styles";

const THeader = ({ classes, ...props }) => {
  const { t } = useTranslation();
  const { handleSelectAllClick, numSelected, rowCount, tableSchema } = props;
  const indeterminate = numSelected > 0 && numSelected < rowCount;
  const checked = rowCount > 0 && numSelected === rowCount;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            {...{ indeterminate, checked, onChange: handleSelectAllClick }}
          />
        </TableCell>
        {tableSchema.map(({ name }) => (
          <TableCell key={uniqueId()} className={classes.head}>
            {t(name)}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default withStyles(styles)(THeader);
