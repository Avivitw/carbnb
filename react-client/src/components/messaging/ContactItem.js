import { useContext } from "react";
import { MessagesContext } from "../../providers/MessagesProvider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

function ContactItem(props) {
  //add the contacts on the messagesContext
  const { selectedContactId, setSelectedContactId } =
    useContext(MessagesContext);
  const handleContactChange = function () {
    setSelectedContactId(props.contact.contact_id);
  };

  return (
    <ListItem
      button
      id={props.contact.contact_id}
      onClick={handleContactChange}
    >
      <ListItemAvatar>
        <Avatar alt={props.contact.name} src={props.contact.image} />
      </ListItemAvatar>
      <ListItemText primary={props.contact.name} />
    </ListItem>
  );
}
export default ContactItem;
