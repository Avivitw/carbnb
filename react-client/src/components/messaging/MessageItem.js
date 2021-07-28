import { useContext } from "react";
import { MessagesContext } from "../../providers/MessagesProvider";
import "./MessageItem.scss";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  delete: {
    float: "right",
  },
}));

function MessageItem(props) {
  const { removeMessage } = useContext(MessagesContext);

  const classes = useStyles();
  const handleDeleteClick = (event) => {
    removeMessage(props.message.id);
  };

  return (
    <div className={"message-row"}>
      <div
        className={
          props.message.sender_id === props.message.contact_id
            ? "received-message"
            : undefined
        }
      >
        {props.message.message}
        <DeleteForeverIcon
          className={classes.delete}
          onClick={handleDeleteClick}
        ></DeleteForeverIcon>
      </div>
    </div>
  );
}
export default MessageItem;
