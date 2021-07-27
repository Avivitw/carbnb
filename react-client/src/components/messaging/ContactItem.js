import { useContext } from "react";
import { MessagesContext } from "../../providers/MessagesProvider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  selected: {
    backgroundColor: theme.palette.primary.dark,
    color: "white",
    "&:hover": {
      color: theme.palette.primary.light,
    },
  },
}));

function ContactItem(props) {
  const classes = useStyles();
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
      className={
        selectedContactId === props.contact.contact_id ? classes.selected : ""
      }
    >
      <ListItemAvatar>
        <Avatar alt={props.contact.name} src={props.contact.image} />
      </ListItemAvatar>
      <ListItemText primary={props.contact.name} />
    </ListItem>
  );
}
export default ContactItem;
