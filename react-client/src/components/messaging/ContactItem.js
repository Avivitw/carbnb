import { useContext, useEffect, useState } from "react";
import { MessagesContext } from "../../providers/MessagesProvider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  selected: {
    backgroundColor: theme.palette.primary.dark,
    color: "white",
    "&:hover": {
      color: theme.palette.primary.light,
    },
  },
  text: {
    "& > span": {
      fontSize: "18px",
    },
  },
  dot: {
    "&>span.MuiBadge-badge": {
      backgroundColor: "#f48fb1",
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
        selectedContactId === props.contact.contact_id
          ? classes.selected
          : undefined
      }
    >
      <ListItemAvatar>
        <Badge
          className={classes.dot}
          badgeContent=" "
          variant="dot"
          invisible={!props.contact.newMessage}
        >
          <Avatar alt={props.contact.name} src={props.contact.image} />
        </Badge>
      </ListItemAvatar>
      <ListItemText primary={props.contact.name} className={classes.text} />
    </ListItem>
  );
}
export default ContactItem;
