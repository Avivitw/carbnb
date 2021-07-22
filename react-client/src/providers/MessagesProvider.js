import { useContext, createContext, useState, useEffect } from "react";
import { authContext } from "../providers/authProvider";

const axios = require("axios");
export default function MessagesProvider(props) {
  const { user } = useContext(authContext);

  ////////////////// messages state ///////////////////////

  const [messages, setMessages] = useState({
    rows: [],
  });

  // get all the messages for the user
  useEffect(() => {
    axios
      .get("/api/messages", {
        params: {
          userId: user.id,
          contactId,
        },
      })
      .then(function (response) {
        // handle success
        setMessages((prev) => {
          return { ...prev, rows: response.data };
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, [user]);

  // add message
  const addMessage = async (userId, contactId, message) => {
    if (user && user.id) {
      try {
        const response = await axios.post("/api/messages", {
          userId: user.id,
          contactId,
          message,
        });
        setMessages((prev) => {
          return [...prev, response.data];
        });
        return { result: "success", error: null };
      } catch (err) {
        return { result: "failed", error: err };
      }
    }
  };

  const messagesData = {
    messages,
    setMessages,
    addMessage,
  };

  return (
    <MessagesContext.Provider value={messagesData}>
      {props.children}
    </MessagesContext.Provider>
  );
}
export const MessagesContext = createContext();
