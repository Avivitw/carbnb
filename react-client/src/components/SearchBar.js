import { useState, useEffect, Fragment, useContext } from "react";
import { searchContext } from "../providers/SearchProvider";

import {
  makeStyles,
  InputLabel,
  FormControl,
  FormControlLabel,
  Select,
  Button,
  Checkbox,
  Grid,
} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Container from "@material-ui/core/Container";

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  searchBox: {
    backgroundColor: "white",
    padding: "25px",
    borderRadius: "4px",
    boxShadow: theme.shadows[5],
    marginTop: "200px",
    opacity: 0.85,
  },
  checkbox: {
    alignContent: "flex-end",
    alignItems: "center",
  },
  Submit: {
    font: "Trebuchet MS",
    fontSize: theme.typography.pxToRem(20),
    fontWeight: "bold",
    color: "white",
    backgroundColor: "#64b5f6",
  },
}));

function SearchBar(props) {
  const classes = useStyles();
  const { search, filters, setSearch, setPets, setRv, setSport } =
    useContext(searchContext);

  const [location, setLocation] = useState(search.location);
  const [fromDate, setFromDate] = useState(search.fromDate);
  const [toDate, setToDate] = useState(search.toDate);

  // when the global location changed (e.g PopularLocations clicked) it will update the internal search
  useEffect(() => {
    setLocation(search.location);
  }, [search.location]);

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleFromDateChange = (date) => {
    setFromDate(date);
  };

  const handleToDateChange = (date) => {
    setToDate(date);
  };

  const handleSearchClick = () => {
    setSearch((prev) => {
      return { ...prev, location, fromDate, toDate };
    });
  };

  return (
    <Container className={classes.searchBox} maxWidth="sm">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth={true}>
              <InputLabel id="demo-simple-select-label">Location</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={location}
                onChange={handleLocationChange}
              >
                <MenuItem value={"Vancouver"}>Vancouver</MenuItem>
                <MenuItem value={"Toronto"}>Toronto</MenuItem>
                <MenuItem value={"Calgary"}>Calgary</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <KeyboardDatePicker
              className={classes.input}
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              id="from-date"
              label="From"
              value={fromDate}
              onChange={handleFromDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
              fullWidth={true}
            />
          </Grid>
          <Grid item xs={6}>
            <KeyboardDatePicker
              className={classes.input}
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              id="to-date"
              label="To"
              value={toDate}
              onChange={handleToDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
              fullWidth={true}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              className={classes.Submit}
              variant="contained"
              fullWidth={true}
              onClick={handleSearchClick}
            >
              Search
            </Button>
          </Grid>

          {search.location !== "" && (
            <Fragment className={classes.chekbox}>
              <Grid item xs={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filters.pets}
                      onChange={() => setPets(!filters.pets)}
                      name="petCb"
                      color="primary"
                    />
                  }
                  label="Pet Friendly"
                />
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filters.rv}
                      onChange={() => setRv(!filters.rv)}
                      name="rvCb"
                      color="primary"
                    />
                  }
                  label="RV's Only"
                />
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filters.sport}
                      onChange={() => setSport(!filters.sport)}
                      name="sportCb"
                      color="primary"
                    />
                  }
                  label="Sport"
                />
              </Grid>
            </Fragment>
          )}
        </Grid>
      </MuiPickersUtilsProvider>
    </Container>
  );
}

export default SearchBar;
