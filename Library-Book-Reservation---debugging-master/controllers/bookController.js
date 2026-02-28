const Book = require("../models/Book");

const reserveBooks = async (req, res) => {
  try {
    const { bookIds } = req.body;

    // Bug: `reservedCount` was declared using `const`
    // Fix: Changed `const` to `let` to allow reassignment.
    let reservedCount = 0;

    // Bug: `forEach` does not wait for `async/await`
    // Fix: Replaced `forEach` with a `for...of` loop to properly await each database update. 
    // (Note: Using Promise.all would also work, but for...of is straightforward here).
    for (const id of bookIds) {
      await Book.findByIdAndUpdate(id, { isAvailable: false });
      reservedCount++;
    }

    res.status(200).json({ msg: "Books reserved successfully", count: reservedCount });
  } catch (error) {
    // Added error handling to prevent the server from crashing if an invalid ID is sent.
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    // Bug: `findByIdAndRemove`
    // Fix: Replaced it with the up-to-date method `findByIdAndDelete`.
    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) return res.status(404).json({ msg: "Book not found" });
    res.status(200).json({ msg: "Book deleted" });
  } catch (error) {
    // Added error handling.
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
};

module.exports = { reserveBooks, deleteBook };
