import { useContext } from "react";
import { MessagesContext } from "../../providers/MessagesProvider";
import ContactItem from "./ContactItem";

import List from "@material-ui/core/List";

function ContactsContainer(props) {
  //add the contacts on the messagesContext
  const { contacts } = useContext(MessagesContext);

  const contactItems = contacts.map((contact) => {
    return <ContactItem contact={contact}></ContactItem>;
  });

  return (
    <div>
      <h2>Contacts</h2>
      <div>
        <List dense>{contactItems}</List>
      </div>
    </div>
  );
}
export default ContactsContainer;
