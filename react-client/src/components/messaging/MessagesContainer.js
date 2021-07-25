import { useContext } from "react";
import { MessagesContext } from "../../providers/MessagesProvider";
import MessageItem from "./MessageItem";

function MessagesContainer(props) {
  const { messages, addMessage } = useContext(MessagesContext);

  const messageItems = messages.map((message) => {
    return <MessageItem message={message}></MessageItem>;
  });

  return (
    <div>
      <div>{messageItems}</div>
    </div>
  );
}
export default MessagesContainer;
