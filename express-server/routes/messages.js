const express = require("express");
const {
  getMessagesForUserIdAsync,
  getContactsForUserAsync,
  createNewMessageAsync,
} = require("../db/repositories/messagesRepo");

const router = express.Router();

// GET /api/messages
// Returns all messages for the user with id
router.get("/", async (req, res) => {
  try {
    const { userId, contactId } = req.query;
    const { rows } = await getMessagesForUserIdAsync({ userId, contactId });
    return res.json(rows);
  } catch (err) {
    console.log("Error retrieving messages", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/messages/contacts
// Returns all contacts that send/received  user messages

router.get("/contacts", async (req, res) => {
  const { userId } = req.query;
  try {
    const { rows } = await getContactsForUserAsync(userId);
    return res.json(rows);
  } catch (err) {
    console.log("Error retrieving messages", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/messages
// Add a message to a user's messages
router.post("/", async (req, res) => {
  const { userId, contactId, message } = req.body;
  try {
    const { rows } = await createNewMessageAsync(userId, contactId, message);
    return res.status(201).json(rows[0]);
  } catch (err) {
    console.log("Error createing messages", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// // DELETE /api/messages/:userId/:carId
// // Deletes the messages entry with given ids
// router.delete("/:userId/:carId", async (req, res) => {
//   const { userId, carId } = req.params;
//   try {
//     _ = await deleteFavouriteAsync(userId, carId);
//     return res.status(204).json();
//   } catch (err) {
//     console.log("Error deleting favourite", err);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// });

module.exports = router;
