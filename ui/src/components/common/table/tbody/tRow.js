// node modules
import React from "react";
import uuid from "react-uuid";

// material components
import { withStyles } from "@material-ui/core/styles";
import TableRow from "@material-ui/core/TableRow";

// local components
import TCell from "./tCell";

// local files
import styles from "./styles";

const TRow = ({ classes, ...props }) => {
  const { row, handleClick, isSelected, tableSchema, cellsLength } = props;
  const { _id } = row;
  const isItemSelected = isSelected(_id);

  return (
    <TableRow
      hover
      onClick={handleClick(_id)}
      className={classes.rowRoot}
      selected={isItemSelected}
    >
      {tableSchema.map((cellSchema, i) => (
        <TCell
          key={uuid()}
          {...{ ...props, i, cellSchema, isItemSelected, cellsLength }}
        />
      ))}
    </TableRow>
  );
};

export default withStyles(styles)(TRow);
