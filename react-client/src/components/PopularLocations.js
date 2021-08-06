import { useContext } from "react";
import { searchContext } from "../providers/SearchProvider";

import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Grid } from "@material-ui/core";
// import Grid from "@material-ui/core/Grid";
import "./PopularLocations.scss";

import vanc from "../pics/vancouverShort.jpg";
import cal from "../pics/calgaryShort.jpg";
import torn from "../pics/torontoShort.jpg";
import sas from "../pics/sasShort.jpeg";
import edm from "../pics/edmShort.jpeg";
import vic from "../pics/vicShort.jpeg";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    boxShadow: theme.shadows[8],
    font: "Trebuchet MS",
  },
  popularLocations: {
    padding: "0px",
    backgroundColor: "#FFFFFF",
  },
  h: {
    font: "Trebuchet MS",
    borderTop: "2px solid #eeeef5",
    textAlign: "center",
    marginTop: "80px",
    marginBottom: "20px",
    fontWeight: "bold",
    fontSize: theme.typography.pxToRem(26),
    color: theme.palette.action.active,
    paddingTop: "20px",
  },
}));

function PopularLocations(props) {
  const classes = useStyles();

  const { setLocation } = useContext(searchContext);

  return (
    <div>
      <Container className={classes.popularLocations}>
        <div className={classes.h}>Popular Locations</div>
        <Container className={classes.popularLocations} maxWidth="sm">
          <Grid container spacing={3}>
            <Grid
              item
              xs={2}
              align="center"
              onClick={() => {
                setLocation("Vancouver");
              }}
            >
              <Avatar alt="Vancouver" src={vanc} className={classes.large} />
              <div className="place-name">Vancouver</div>
            </Grid>
            <Grid
              item
              xs={2}
              align="center"
              onClick={() => {
                setLocation("Calgary");
              }}
            >
              <Avatar alt="Calgary" src={cal} className={classes.large} />
              <div className="place-name">Calgary</div>
            </Grid>
            <Grid
              item
              xs={2}
              align="center"
              onClick={() => {
                setLocation("Toronto");
              }}
            >
              <Avatar alt="Toronto" src={torn} className={classes.large} />
              <div className="place-name">Toronto</div>
            </Grid>
            <Grid item xs={2} align="center">
              <Avatar alt="Victoria" src={vic} className={classes.large} />
              <div className="place-name">Victoria</div>
            </Grid>
            <Grid item xs={2} align="center">
              <Avatar alt="Edmonton" src={edm} className={classes.large} />
              <div className="place-name">Edmonton</div>
            </Grid>
            <Grid item xs={2} align="center">
              <Avatar alt="Saskatoon" src={sas} className={classes.large} />
              <div className="place-name">Saskatoon</div>
            </Grid>
          </Grid>
        </Container>
      </Container>
    </div>
  );
}

export default PopularLocations;
