const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  addedAt: {
    type: Date,
    // Bug: Using `Date.now()` executes the function immediately when the server starts. Every book will get the exact same timestamp (server start time) instead of the time the book was actually added.
    // Fix: Removed the parentheses to pass the function reference `Date.now`. This tells Mongoose to execute the function only when a new document is created.
    default: Date.now,
  },
});

module.exports = mongoose.model("Book", bookSchema);
