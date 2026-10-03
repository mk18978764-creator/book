const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: String,
  year: Number,
  genre: String,
  coverUrl: String,
  rating: { type: Number, default: 0 },
  category: String,
  pages: Number
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
