import { useContext } from "react";
// import { MessagesContext } from "../providers/MessagesProvider";
import Avatar from "@material-ui/core/Avatar";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

function ContactItem(props) {
  //add the contacts on the messagesContext
  // const { contacts } = useContext(MessagesContext);

  return <div>{props.contact.name}</div>;
}
export default ContactItem;
