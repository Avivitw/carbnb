import React from "react";

import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import blue from "../pics/blue.jpeg";

const useStyles = makeStyles((theme) => ({
  background: {
    backgroundImage: `url(${blue})`,
    position: "relative",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    height: "600px",
    paddingTop: "50px",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "auto",
    margin: 0,
  },
}));

function BackgroundImage() {
  const classes = useStyles();

  return (
    <Box>
      <div className={classes.overlay}>
        <Box className={classes.background}></Box>
      </div>
    </Box>
  );
}

export default BackgroundImage;
