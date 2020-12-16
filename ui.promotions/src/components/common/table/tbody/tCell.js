// node modules
import React from "react";
import Moment from "react-moment";

// material components
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";

// local components
import { BASE_DATE_FORMAT, field_types } from "components/common/constants";
import CommonMenu from "components/common/menu";

// local files
import styles from "./styles";

const TCell = ({ classes, ...props }) => {
  const {
    i,
    row,
    onRowAction,
    isItemSelected,
    cellSchema,
    cellsLength
  } = props;
  const { id, type } = cellSchema;
  const isFirstCell = i === 0;
  const isLastCell = i === cellsLength - 2;
  const cellValue =
    type === field_types.DATE ? (
      <>
        <Moment format={BASE_DATE_FORMAT}>{row[id]}</Moment>
        {isLastCell && <CommonMenu {...{ id: row._id, onRowAction }} />}
      </>
    ) : (
      <>
        {row[id]}
        {isLastCell && <CommonMenu {...{ id: row._id, onRowAction }} />}
      </>
    );
  return (
    <>
      {isFirstCell ? (
        <>
          <TableCell padding="checkbox">
            <Checkbox checked={isItemSelected} />
          </TableCell>
          <TableCell>{cellValue}</TableCell>
        </>
      ) : (
        <TableCell>{cellValue}</TableCell>
      )}
    </>
  );
};

export default withStyles(styles)(TCell);
