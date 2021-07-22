const express = require("express");
const {
  getMessagesForUserIdAsync,
  getContactsForUserAsync,
  createNewMessageAsync,
} = require("../db/repositories/messagesRepo");

const router = express.Router();

// GET /api/favourites/:id
// Returns all favourties for the user with id
router.get("/:id", async (req, res) => {
  try {
    const { rows } = await getFavouritesForUserIdAsync(req.params.id);
    return res.json(rows);
  } catch (err) {
    console.log("Error retrieving favourites", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/favourites
// Add a car to a user's favourites
router.post("/", async (req, res) => {
  const { userId, carId } = req.body;
  try {
    const { rows } = await createNewFavouriteAsync(userId, carId);
    return res.status(201).json(rows[0]);
  } catch (err) {
    console.log("Error createing favourite", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE /api/favourites/:userId/:carId
// Deletes the favourite entry with given ids for user and car
router.delete("/:userId/:carId", async (req, res) => {
  const { userId, carId } = req.params;
  try {
    _ = await deleteFavouriteAsync(userId, carId);
    return res.status(204).json();
  } catch (err) {
    console.log("Error deleting favourite", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
