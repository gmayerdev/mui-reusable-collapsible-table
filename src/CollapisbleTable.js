import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import CollapsibleTableRow from "./CollapisbleTableRow";

export default function CollapsibleTable({
  title,
  addLabel,
  saveLabel,
  rows,
  rowHeaderDefinition,
  rowForm,
  onAddRow,
  onSave,
  onChangeRow
}) {
  return (
    <>
      <Grid container spacing={2} style={{ paddingTop: 10 }}>
        <Grid item xs={1}>
          <Typography variant="h6">{title}</Typography>
        </Grid>
        <Grid item xs={11} align="right">
          <Button variant="contained" onClick={onAddRow}>
            {addLabel}
          </Button>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {rows.map((row, rowIndex) => (
              <CollapsibleTableRow
                row={row}
                rowIndex={rowIndex}
                rowHeaderDefinition={rowHeaderDefinition}
                rowForm={rowForm}
                onAddRow={onAddRow}
                onChangeRow={onChangeRow}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container spacing={2} style={{ paddingTop: 10 }}>
        <Grid item xs={10}></Grid>
        <Grid item xs={2} align="right">
          <Button variant="contained" onClick={onSave}>
            {saveLabel}
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
