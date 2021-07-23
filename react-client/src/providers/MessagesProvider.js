import { useContext, createContext, useState, useEffect } from "react";
import { authContext } from "../providers/authProvider";

const axios = require("axios");
export default function MessagesProvider(props) {
  const { user } = useContext(authContext);

  ////////////////// messages state ///////////////////////

  const [messages, setMessages] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [contactId, setContactId] = useState();

  // get all the messages for the user and specific contact
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
        setMessages(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, [user, contactId]);

  // get all the contacts for the user
  useEffect(() => {
    axios
      .get("/api/messages/contacts", {
        params: {
          userId: user.id,
        },
      })
      .then(function (response) {
        // handle success
        setContacts(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, [user]);

  // add message
  const addMessage = async (message) => {
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
    addMessage,
    contacts,
    contactId,
    setContactId,
  };

  return (
    <MessagesContext.Provider value={messagesData}>
      {props.children}
    </MessagesContext.Provider>
  );
}
export const MessagesContext = createContext();
