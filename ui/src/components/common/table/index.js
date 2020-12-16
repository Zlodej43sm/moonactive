// node modules
import React, { useState, useRef, useCallback } from "react";

// material components
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";

// local component
import THeader from "./theader";
import TBody from "./tbody";

// local files
import { ACTION_PREV, ACTION_NEXT } from "components/common/constants";
import styles from "./styles";

const CommonTable = React.memo(({ classes, ...props }) => {
  const { rows, onRowAction, onContentScroll, tableSchema } = props;
  const tableEl = useRef();
  const [selected, setSelected] = useState([]);
  const handleSelectAllClick = useCallback(
    (event) => {
      if (event.target.checked) {
        const newSelecteds = rows.map((n) => n._id);
        setSelected(newSelecteds);
        return;
      }
      setSelected([]);
    },
    [rows]
  );
  const handleClick = useCallback(
    (id) => () => {
      const selectedIndex = selected.indexOf(id);
      let newSelected = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        );
      }

      setSelected(newSelected);
    },
    [selected]
  );
  const isSelected = (id) => selected.indexOf(id) !== -1;
  const onScroll = (event) => {
    const { target } = event;
    const isReachBottom =
      target.scrollHeight - target.scrollTop === target.clientHeight;
    const isReachTop = target.scrollTop === 0;

    if (isReachTop || isReachBottom) {
      const direction = isReachTop ? ACTION_PREV : ACTION_NEXT;
      onContentScroll(direction, tableEl.current);
    }
  };
  return (
    <TableContainer
      className={classes.container}
      ref={tableEl}
      onScroll={onScroll}
    >
      <Table stickyHeader>
        <THeader
          {...{
            tableSchema,
            numSelected: selected.length,
            rowCount: rows.length,
            handleSelectAllClick
          }}
        />
        <TBody
          {...{
            tableSchema,
            rows,
            handleClick,
            onRowAction,
            isSelected
          }}
        />
      </Table>
    </TableContainer>
  );
});

export default withStyles(styles)(CommonTable);
