import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  main: {
    marginTop: "108px",
  },
}));

function Messaging(props) {
  const classes = useStyles();

  return (
    <Container maxWidth="med" className={classes.main}>
      Messaging Page
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid item xs={4}>
            Contacts
          </Grid>
          <Grid item xs={8}>
            Messages
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
export default Messaging;
