// node modules
import React from "react";
import uuid from "react-uuid";

// material components
import { withStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";

// local components
import TRow from "./tRow";
import EmptyView from "./emptyView";

// local files
import styles from "./styles";

const TBody = ({ classes, ...props }) => {
  let { rows, tableSchema } = props;
  const cellsLength = tableSchema.length + 1;

  return (
    <TableBody>
      {rows.length ? (
        rows.map((row) => (
          <TRow key={uuid()} {...{ ...props, row, cellsLength }} />
        ))
      ) : (
        <EmptyView {...{ cellsLength }} />
      )}
    </TableBody>
  );
};

export default withStyles(styles)(TBody);
