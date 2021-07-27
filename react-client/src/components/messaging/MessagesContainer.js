import { useContext, useState } from "react";
import { MessagesContext } from "../../providers/MessagesProvider";
import MessageItem from "./MessageItem";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";

import "./MessagesContainer.scss";

function MessagesContainer(props) {
  const { messages, addMessage, selectedContactId } =
    useContext(MessagesContext);
  const [messageText, setMessageText] = useState("");

  const handleSendClick = (event) => {
    addMessage(messageText);
    setMessageText("");
  };

  const messageItems = messages.map((message) => {
    return <MessageItem message={message}></MessageItem>;
  });

  return (
    <div>
      <div>{messageItems}</div>
      {selectedContactId && (
        <div>
          <TextField
            type="text"
            placeholder="Write a Message"
            multiline
            value={messageText}
            onChange={(event) => setMessageText(event.target.value)}
            fullWidth={true}
          />
          <Button
            id="send-button"
            variant="contained"
            color="primary"
            endIcon={<Icon>send</Icon>}
            onClick={handleSendClick}
            disabled={messageText === ""}
          >
            Send
          </Button>
        </div>
      )}
    </div>
  );
}
export default MessagesContainer;
