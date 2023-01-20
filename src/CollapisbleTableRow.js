import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset"
    }
  }
});

export default function CollapsibleTableRow({
  row,
  rowIndex,
  rowHeaderDefinition,
  rowForm,
  onChangeRow
}) {
  const classes = useRowStyles();

  const resolveAccessor = (accessor, row) => {
    if (Array.isArray(accessor)) {
      const resolvedAccessor = accessor.map((acc) => {
        return row[acc];
      });
      const joinedAccessor = resolvedAccessor.join(" ");
      return joinedAccessor;
    } else {
      return row[accessor];
    }
  };

  return (
    <>
      <Fragment key={rowIndex}>
        <TableRow className={classes.root}>
          <TableCell style={{ width: "30px" }}>
            <IconButton
              size="small"
              onClick={() => onChangeRow(rowIndex, "isOpen", !row.isOpen)}
            >
              {row.isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          {rowHeaderDefinition.map((metadata) => (
            <TableCell>
              <TextField
                label={metadata.label}
                fullWidth
                defaultValue={resolveAccessor(metadata.accessor, row)}
                InputProps={{
                  readOnly: true,
                  disableUnderline: true
                }}
                variant="standard"
              />
            </TableCell>
          ))}
        </TableRow>
        <TableRow style={{ background: "#E5E5E5" }}>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse
              in={row.isOpen}
              timeout="auto"
              unmountOnExit
              style={{ paddingBottom: 15, paddingTop: 15 }}
            >
              {rowForm(row, rowIndex, onChangeRow)}
            </Collapse>
          </TableCell>
        </TableRow>
      </Fragment>
    </>
  );
}
