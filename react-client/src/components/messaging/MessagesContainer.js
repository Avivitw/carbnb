import { useContext, createContext, useState, useEffect } from "react";
import { MessagesContext } from "../../providers/MessagesProvider";
import ContactItem from "./ContactItem";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

function MessagesContainer(props) {
  const { messages, addMessage } = useContext(MessagesContext);

  const messageItems = messages.map((message) => {
    return <div>{message.message}</div>;
  });

  return (
    <div>
      <div>{messageItems}</div>
    </div>
  );
}
export default MessagesContainer;
