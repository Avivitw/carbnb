import { useContext } from "react";
import { MessagesContext } from "../../providers/MessagesProvider";
import "./MessageItem.scss";

function MessageItem(props) {
  // const { messages } = useContext(MessagesContext);

  return (
    <div className={"message-row"}>
      <div
        className={
          props.message.sender_id === props.message.contact_id &&
          "received-message"
        }
      >
        {props.message.message}
      </div>
    </div>
  );
}
export default MessageItem;
