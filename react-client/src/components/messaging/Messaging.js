import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import MessagesProvider from "../../providers/MessagesProvider";
import ContactsContainer from "./ContactsContainer";
import MessagesContainer from "./MessagesContainer";

const useStyles = makeStyles((theme) => ({
  main: {
    marginTop: "108px",
  },
}));

function Messaging(props) {
  const classes = useStyles();

  return (
    <MessagesProvider>
      <Container maxWidth="med" className={classes.main}>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <ContactsContainer></ContactsContainer>
          </Grid>
          <Grid item xs={8}>
            <MessagesContainer></MessagesContainer>
          </Grid>
        </Grid>
      </Container>
    </MessagesProvider>
  );
}
export default Messaging;
