const db = require("../index");

//get all messeges received/send for the user
exports.getMessagesForUserIdAsync = (userId, contactId) => {
  const queryText = `
    SELECT messages.*, messages.sender_id as contact_id, users.name
    FROM messages
    JOIN users ON messages.sender_id  = users.id
    WHERE messages.receiver_id  = $1 AND messages.sender_id = $2
    UNION
    SELECT messages.*, messages.receiver_id as contact_id, users.name
    FROM messages
    JOIN users ON messages.receiver_id  = users.id
    WHERE messages.sender_id  = $1 AND messages.receiver_id = $2;
  `;
  const queryParams = [userId, contactId];
  return db.query(queryText, queryParams);
};

//get all contacts that send/received  user messages
exports.getContactsForUserAsync = (userId) => {
  const queryText = `
    SELECT messages.sender_id as contact_id,users.name, users.image
    FROM messages
    JOIN users ON messages.sender_id  = users.id
    WHERE messages.receiver_id  = $1
    UNION
    SELECT messages.receiver_id as contact_id,users.name, users.image
    FROM messages
    JOIN users ON messages.receiver_id  = users.id
    WHERE messages.sender_id  = $1
    ;
  `;
  const queryParams = [userId];
  return db.query(queryText, queryParams);
};

//get  a contact
exports.getContactForUserAsync = (contact_id) => {
  const queryText = `
    SELECT users.id as contact_id, users.name, users.image
    FROM users
    WHERE users.id  = $1
    ;
  `;
  const queryParams = [contact_id];
  return db.query(queryText, queryParams);
};
//add message to DB
exports.createNewMessageAsync = (userId, contactId, message) => {
  const queryText = `
    INSERT INTO messages (sender_id,receiver_id, message)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const queryParams = [userId, contactId, message];
  return db.query(queryText, queryParams);
};

exports.deleteMessageAsync = (id, userId) => {
  const queryText = `
    DELETE FROM messages
    WHERE id = $1 AND sender_id = $2;
  `;
  const queryParams = [id, userId];
  return db.query(queryText, queryParams);
};
