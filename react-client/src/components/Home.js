import { useContext } from "react";
import { searchContext } from "../providers/SearchProvider";

import SearchBar from "./SearchBar";
import PopularLocations from "./PopularLocations";
import SearchResultsContainer from "./SearchResultsContainer";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import SearchProvider from "../providers/SearchProvider";
import { Typography } from "@material-ui/core";
import BackgroundImage from "./BackgroundImage";

const useStyles = makeStyles((theme) => ({
  h: {
    borderTop: "2px solid #eeeef5",
    textAlign: "center",
    paddingTop: "250px",
  },
  body2: {
    fontSize: theme.typography.pxToRem(66),
    color: "#64b5f6",
    font: "Trebuchet MS",
    fontWeight: "bold",
  },
  body1: {
    fontSize: theme.typography.pxToRem(30),
    color: theme.palette.action.active,
  },
  body: {
    fontSize: theme.typography.pxToRem(30),
    color: theme.primary,
    fontWeight: "bold",
  },
  background: {
    backgroundColor: "#FFFFFF",
  },
}));

//created the internalHome component to be able to wrap the useContext with a search provider
function Home(props) {
  return (
    <SearchProvider>
      <InternalHome />
    </SearchProvider>
  );
}

function InternalHome(props) {
  const classes = useStyles();
  const { search } = useContext(searchContext);

  return (
    <div className={classes.background}>
      <BackgroundImage />
      <SearchBar />
      {search.location === "" && (
        <div>
          <Container className={classes.h} maxWidth="md">
            <Typography className={classes.body2} paragraph>
              Share My Ride - Reinventing Car Rentals
            </Typography>
            <Typography variant="body1" className={classes.body1} paragraph>
              We offer a vast range of vehicles from sports cars to trucks and
              even RV's, for those perfect weekend getaways to enjoy the
              beautiful outdoors.
            </Typography>
            <Typography className={classes.body}>
              Get out of the ordinary and book your dream car today!
            </Typography>
          </Container>
          <PopularLocations />
        </div>
      )}
      {search.location !== "" && (
        <div>
          <SearchResultsContainer />
        </div>
      )}
      <br />
    </div>
  );
}

export default Home;
