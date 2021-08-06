import { useContext, createContext, useState, useEffect } from "react";
import { authContext } from "../providers/authProvider";
import useWebSocket from "react-use-websocket";

import { useLocation } from "react-router-dom";

const axios = require("axios");
export default function MessagesProvider(props) {
  const { user } = useContext(authContext);

  ////////////////// messages state ///////////////////////

  const [messages, setMessages] = useState([]);
  const [contacts, setContacts] = useState(); //not initializing as Array to detect initil state vs empty array
  const [selectedContactId, setSelectedContactId] = useState();
  const [socketUrl, setSocketUrl] = useState(
    `ws://localhost:8080/api/messages/socket/${user.id}`
  );
  const [incomingMessage, setIncomingMessage] = useState(0);

  // const wsMessageHistory = useRef([]);

  const { lastMessage } = useWebSocket(socketUrl, {
    // onOpen: () => console.log("opened"),
  });

  useEffect(() => {
    if (!lastMessage) {
      return;
    }
    const newMessage = JSON.parse(lastMessage.data);
    if (newMessage && newMessage.fromId) {
      if (newMessage.fromId === selectedContactId) {
        //current displayed contact
        setIncomingMessage(incomingMessage + 1);
      } else {
        //not displayed contact
        setContacts((prev) => {
          return prev.map((contact) => {
            if (contact.contact_id === newMessage.fromId) {
              return { ...contact, newMessage: true };
            } else {
              return contact;
            }
          });
        });
      }
    }
  }, [lastMessage]);

  // When contact is selected change new message to false to dismiss the dot notification
  useEffect(() => {
    if (!contacts) {
      return;
    }
    setContacts((prev) => {
      return prev.map((contact) => {
        if (contact.contact_id === selectedContactId) {
          return { ...contact, newMessage: false };
        } else {
          return contact;
        }
      });
    });
  }, [selectedContactId]);

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery();

  if (!selectedContactId) {
    const queryContactId = Number(query.get("contactId"));
    if (queryContactId > 0) setSelectedContactId(queryContactId);
  }
  // get all the messages for the user and specific contact
  useEffect(() => {
    if (!selectedContactId) {
      return;
    }
    axios
      .get("/api/messages", {
        params: {
          userId: user.id,
          contactId: selectedContactId,
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
  }, [user, selectedContactId, incomingMessage]);

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

  // check if we have this user on our contacts and if not get it
  useEffect(() => {
    if (!selectedContactId || !contacts) {
      return;
    }
    if (
      contacts.find((contact) => {
        return contact.contact_id === selectedContactId;
      })
    ) {
      return;
    }
    axios
      .get(`/api/messages/contacts/${selectedContactId}`)
      .then(function (response) {
        // handle success
        setContacts((prev) => {
          return [...prev, response.data];
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, [contacts, selectedContactId]);

  // add message
  const addMessage = async (message) => {
    if (user && user.id) {
      try {
        const response = await axios.post("/api/messages", {
          userId: user.id,
          contactId: selectedContactId,
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

  // delete message
  const removeMessage = async (id) => {
    try {
      await axios.delete(`/api/messages/${id}/${user.id}`);
      setMessages((prev) => {
        return [...prev].filter((message) => {
          return message.id !== id;
        });
      });
      return { result: "success", error: null };
    } catch (err) {
      return { result: "failed", error: err };
    }
  };

  const messagesData = {
    messages,
    addMessage,
    removeMessage,
    contacts,
    selectedContactId,
    setSelectedContactId,
  };

  return (
    <MessagesContext.Provider value={messagesData}>
      {props.children}
    </MessagesContext.Provider>
  );
}
export const MessagesContext = createContext();
