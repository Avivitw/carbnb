import { useState, useMemo, useContext } from "react";
import { searchContext } from "../providers/SearchProvider";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import ResultItem from "./ResultItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

const useStyles = makeStyles((theme) => ({
  searchBox: {
    padding: "0",
    marginTop: "175px",
  },
  formControl: {
    marginBottom: theme.spacing(1),
    minWidth: 120,
    font: "Trebuchet MS",
  },
  formControlRight: {
    // marginBottom: theme.spacing(1),
    minWidth: 120,
    float: "right",
  },
  selectEmpty: {
    // marginTop: theme.spacing(2),
  },
}));

function SearchResultsContainer(props) {
  const classes = useStyles();

  const { filters, cars, favourites } = useContext(searchContext);

  const [sortBy, setSortBy] = useState("1");

  const handleOnChangeSortBy = (event) => {
    setSortBy(event.target.value);
  };

  const sortedCarsRows = useMemo(() => {
    let carRows = cars.rows.map((car) => {
      return { ...car, priceN: 1 * car.price.slice(1) /* convert to number */ };
    });

    carRows = carRows
      .filter((car) => {
        if (filters.pets && !car.pet_friendly) {
          return false;
        }
        if (filters.rv && !car.rv) {
          return false;
        }
        if (filters.sport && !car.sport) {
          return false;
        }
        return true;
      })
      .sort((a, b) => (a.priceN - b.priceN) * sortBy);
    return carRows;
  }, [sortBy, cars.rows, filters]);

  const resultItems = sortedCarsRows.map((car) => {
    return (
      <ResultItem
        key={car.id}
        car={car}
        fav={!!favourites.find((fav) => fav.car_id === car.id)}
      ></ResultItem>
    );
  });

  return (
    <Container className={classes.searchBox} maxWidth="sm">
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Sort By</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          label="Sort By"
          onChange={handleOnChangeSortBy}
          value={sortBy}
        >
          <MenuItem value="1">Price: Low To High</MenuItem>
          <MenuItem value="-1">Price: High To Low</MenuItem>
        </Select>
      </FormControl>
      <Grid container spacing={2}>
        {resultItems}
      </Grid>
    </Container>
  );
}

export default SearchResultsContainer;
