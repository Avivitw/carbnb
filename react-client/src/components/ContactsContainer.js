import { useContext, createContext, useState, useEffect } from "react";
import { MessagesContext } from "../providers/MessagesContext";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

function ContactsResultsContainer(props) {
  //add the contacts on the messagesContext
  const { contacts } = useContext(MessagesContext);

  return (
    <Container maxWidth="sm">
      <Grid container spacing={2}>
        {contacts}
      </Grid>
    </Container>
  );
}
export default ContactsResultsContainer;
