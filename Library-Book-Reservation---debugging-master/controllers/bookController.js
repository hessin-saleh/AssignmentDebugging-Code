const Book = require("../models/Book");

const reserveBooks = async (req, res) => {
  const { bookIds } = req.body;

  const reservedCount = 0;

  bookIds.forEach(async (id) => {
    await Book.findByIdAndUpdate(id, { isAvailable: false });
    reservedCount++;
  });

  res
    .status(200)
    .json({ msg: "Books reserved successfully", count: reservedCount });
};

const deleteBook = async (req, res) => {
  const { id } = req.params;

  const deletedBook = await Book.findByIdAndRemove(id);

  if (!deletedBook) return res.status(404).json({ msg: "Book not found" });
  res.status(200).json({ msg: "Book deleted" });
};

module.exports = { reserveBooks, deleteBook };
