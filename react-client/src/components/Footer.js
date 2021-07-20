import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
      backgroundColor: "#FFFFFF",
    },
  },
  footer: {
    padding: "0px",
    marginTop: "32px",
    font: "Trebuchet MS",
    fontSize: "12px",
    color: "#9999bb",
    backgroundColor: "#FFFFFF",
  },
  h: {
    fontWeight: "bold",
    marginBottom: "12px",
  },
  item: {
    maxWidth: "100%",
  },
  icon: {
    marginRight: "20px",
  },
  divStyle: {
    borderTop: "2px solid #eeeef5",
    marginBottom: "32px",
  },
  fixSpans: {
    marginBottom: "3px",
    "& > span": {
      top: "-12px",
      position: "relative",
      marginLeft: "5px",
    },
    "& > svg": {
      top: "-2px",
      position: "relative",
      marginBottom: "3px",
    },
  },
  column: {
    "& > div": {
      height: "26px",
      marginBotom: "5px",
    },
  },
}));

function Footer() {
  const classes = useStyles();
  return (
    <Container className={classes.footer} maxWidth="md">
      <div className={classes.divStyle}></div>
      <Grid container spacing={3}>
        <Grid item xs={1}></Grid>
        <Grid item xs={4} className={classes.column}>
          <div className={classes.h}>Contact Us</div>
          <div className={classes.fixSpans}>
            <LocationOnIcon fontSize="small"></LocationOnIcon>
            <span> Vancouver</span>
          </div>
          <div className={classes.fixSpans}>
            <EmailIcon fontSize="small"></EmailIcon>
            <span> Contact@sharemyride.ca</span>
          </div>
          <div className={classes.fixSpans}>
            <PhoneIcon fontSize="small"></PhoneIcon>
            <span> +1 604 000 car</span>
          </div>
        </Grid>
        <Grid item xs={4} className={classes.column}>
          <div className={classes.h}>About Us</div>
          <div>How Share My Ride works</div>
          <div>Careers</div>
          <div>Investors</div>
        </Grid>
        <Grid item xs={3} className={classes.column}>
          <div className={classes.h}>Support</div>
          <div>Our Covid-19 response</div>
          <div>FAQ's</div>
          <div>Cancellation Policy</div>
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={3}>
          <FacebookIcon className={classes.icon}></FacebookIcon>
          <InstagramIcon className={classes.icon}></InstagramIcon>
          <TwitterIcon className={classes.icon}></TwitterIcon>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Footer;
