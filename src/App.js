import { useState } from "react";
import CollapsibleTable from "./CollapisbleTable";
import "./styles.css";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Switch from "@material-ui/core/Switch";

export default function App() {
  const rowHeaderDefinition = [
    { label: "Name", accessor: ["firstName", "middleName", "lastName"] },
    { label: "Type", accessor: "type" },
    { label: "EffectiveStartDate", accessor: "effectiveStartDate" },
    { label: "EffectiveEndDate", accessor: "effectiveEndDate" }
  ];

  const [rows, setRows] = useState([
    {
      id: 1,
      prefix: "Mr.",
      firstName: "John",
      middleName: "W.",
      lastName: "Doe",
      suffix: "Jr.",
      type: "Alias",
      isPreferredName: false,
      effectiveStartDate: "1990-Jan-01",
      effectiveEndDate: "2023-Dec-01",
      isOpen: false
    },
    {
      id: 2,
      prefix: "Mr.",
      firstName: "Johnny",
      middleName: "W.",
      lastName: "D.",
      suffix: "Jr.",
      type: "Alias",
      isPreferredName: true,
      effectiveStartDate: "1990-Jan-01",
      effectiveEndDate: "2023-Feb-01",
      isOpen: false
    }
  ]);

  const onAddRow = () => {
    setRows([
      ...rows,
      {
        prefix: "Mr.",
        firstName: "JJ",
        middleName: "W.",
        lastName: "D.",
        suffix: "Jr.",
        type: "Alias",
        effectiveStartDate: "1990-Jan-01",
        effectiveEndDate: "2023-Feb-01",
        isOpen: true
      }
    ]);
  };

  const onChangeRow = (rowIndex, property, value) => {
    setRows((prevRows) => {
      return prevRows.map((row, index) => {
        if (rowIndex === index) {
          console.log("ROW", row);
          const attr = Object.keys(row).filter((r) => r === property);
          const newRow = { ...row };
          newRow[attr] = value;
          return newRow;
        }
        return row;
      });
    });
  };

  const onSave = () => {
    console.log(JSON.stringify(rows));
  };

  const rowDataForm = (row, rowIndex, onChangeRow) => {
    const types = ["Alias", "Real Name"];
    const prefixes = ["Mr.", "Ms."];
    const suffixes = ["Jr.", "I", "II"];

    return (
      <Grid container spacing={1}>
        <Grid item xs={10}></Grid>
        <Grid item xs={2} style={{ padding: 0 }} align="right">
          <FormControlLabel
            control={
              <Switch
                color="primary"
                checked={row.isPreferredName}
                size="small"
              />
            }
            label="Prefered"
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            select
            fullWidth
            label="Type"
            value={row.type}
            size="small"
            variant="outlined"
          >
            {types.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={9}></Grid>
        <Grid item xs={2}>
          <TextField
            select
            fullWidth
            label="Prefix"
            value={row.prefix}
            size="small"
            variant="outlined"
          >
            {prefixes.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="First Name"
            fullWidth
            defaultValue={row.firstName}
            size="small"
            variant="outlined"
            onChange={(event) =>
              onChangeRow(rowIndex, "lastName", event.target.value)
            }
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Middle Name"
            fullWidth
            defaultValue={row.middleName}
            size="small"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Last Name"
            fullWidth
            defaultValue={row.lastName}
            size="small"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={1}>
          <TextField
            select
            fullWidth
            label="Suffix"
            value={row.suffix}
            size="small"
            variant="outlined"
          >
            {suffixes.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={3}>
          <TextField
            label="Effective Start Date"
            fullWidth
            defaultValue={row.effectiveStartDate}
            size="small"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Effective End Date"
            fullWidth
            defaultValue={row.effectiveEndDate}
            size="small"
            variant="outlined"
          />
        </Grid>
      </Grid>
    );
  };

  return (
    <div className="App">
      <CollapsibleTable
        title="Names"
        addLabel="Add Name"
        saveLabel="Save"
        rows={rows}
        rowHeaderDefinition={rowHeaderDefinition}
        rowForm={rowDataForm}
        onAddRow={onAddRow}
        onSave={onSave}
        onChangeRow={onChangeRow}
      />
    </div>
  );
}
