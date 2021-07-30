import { Link } from "react-router-dom";
import { useContext } from "react";

import { searchContext } from "../providers/SearchProvider";

import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid, Checkbox, FormControlLabel } from "@material-ui/core";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import { purple } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  paper: {
    height: "280px",
    backgroundColor: "#eeeef5",
    padding: theme.spacing(1),
    boxShadow: theme.shadows[5],
    // textAlign: "center",
    color: theme.palette.text.secondary,
    textDecoration: "none",
    "& > span": {
      textDecoration: "none",
    },
  },
  img: {
    width: "100%",
  },
  imageWrapper: {
    height: "160px",
    overflow: "hidden",
    marginBottom: "4px",
  },
  h: {
    fontWeight: "bold",
  },
  favChecked: {
    color: purple[600],
    marginLeft: "8px",
  },
  favIcon: {
    marginLeft: "8px",
  },
  clear: {
    clear: "both",
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
}));

function ResultItem(props) {
  const { addFavourite, removeFavourite, search } = useContext(searchContext);

  const classes = useStyles();

  const handleFavoriteChange = (event) => {
    if (event.target.checked) {
      addFavourite(props.car.id);
    } else {
      removeFavourite(props.car.id);
    }
  };

  return (
    <Grid item xs={4}>
      <Paper className={classes.paper}>
        <FormControlLabel
          control={
            <Checkbox
              icon={<FavoriteBorder className={classes.favIcon} />}
              checkedIcon={<Favorite className={classes.favChecked} />}
              name="checkedH"
              checked={props.fav}
              onChange={handleFavoriteChange}
            />
          }
        />
        <Link
          to={{
            pathname: `/cars/${props.car.id}`,
            initialDates: {
              from: search.fromDate,
              to: search.toDate,
            },
          }}
          className={classes.link}
        >
          <div className={classes.imageWrapper}>
            <img
              className={classes.img}
              src={props.car.image}
              alt={props.car.make + " " + props.car.model}
            />
            <div className={classes.clear}></div>
          </div>
          <span className={classes.h}>
            {props.car.make} {props.car.model}
          </span>
          <br />
          <span>{props.car.price}/day</span>
          <br />
        </Link>
      </Paper>
    </Grid>
  );
}
export default ResultItem;
