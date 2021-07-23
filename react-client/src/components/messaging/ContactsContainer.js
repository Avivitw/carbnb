import { useContext, createContext, useState, useEffect } from "react";
import { MessagesContext } from "../../providers/MessagesProvider";
import ContactItem from "./ContactItem";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

function ContactsContainer(props) {
  //add the contacts on the messagesContext
  const { contacts } = useContext(MessagesContext);

  const contactItems = contacts.map((contact) => {
    return <ContactItem contact={contact}></ContactItem>;
  });

  return (
    <div>
      <div>Contacts</div>
      <div>{contactItems}</div>
    </div>
  );
}
export default ContactsContainer;
