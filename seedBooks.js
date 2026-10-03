const mongoose = require('mongoose');
require('dotenv').config();
const Book = require('./models/Book');

const sampleBooks = [
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    description: "A romantic novel about Elizabeth Bennet and Mr. Darcy",
    year: 1813,
    genre: "Romance",
    category: "Fiction",
    rating: 5,
    pages: 432,
    coverUrl: "https://covers.openlibrary.org/b/id/8225261-L.jpg"
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description: "A classic American novel set in the Jazz Age",
    year: 1925,
    genre: "Classic",
    category: "Fiction",
    rating: 4,
    pages: 180,
    coverUrl: "https://covers.openlibrary.org/b/id/8225261-L.jpg"
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    description: "A story of racial injustice and childhood innocence",
    year: 1960,
    genre: "Drama",
    category: "Fiction",
    rating: 5,
    pages: 376,
    coverUrl: "https://covers.openlibrary.org/b/id/8225261-L.jpg"
  },
  {
    title: "1984",
    author: "George Orwell",
    description: "A dystopian novel about totalitarian control",
    year: 1949,
    genre: "Dystopian",
    category: "Sci-Fi",
    rating: 5,
    pages: 328,
    coverUrl: "https://covers.openlibrary.org/b/id/8225261-L.jpg"
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    description: "A coming-of-age story about Holden Caulfield",
    year: 1951,
    genre: "Coming-of-age",
    category: "Fiction",
    rating: 4,
    pages: 277,
    coverUrl: "https://covers.openlibrary.org/b/id/8225261-L.jpg"
  },
  {
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    description: "A young wizard's journey begins at Hogwarts",
    year: 1997,
    genre: "Magic",
    category: "Fantasy",
    rating: 5,
    pages: 223,
    coverUrl: "https://covers.openlibrary.org/b/id/8225261-L.jpg"
  },
  {
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    description: "An epic fantasy adventure in Middle-earth",
    year: 1954,
    genre: "Epic Fantasy",
    category: "Fantasy",
    rating: 5,
    pages: 1216,
    coverUrl: "https://covers.openlibrary.org/b/id/8225261-L.jpg"
  },
  {
    title: "Sherlock Holmes Adventures",
    author: "Arthur Conan Doyle",
    description: "Classic detective stories featuring Sherlock Holmes",
    year: 1892,
    genre: "Detective",
    category: "Mystery",
    rating: 4,
    pages: 307,
    coverUrl: "https://covers.openlibrary.org/b/id/8225261-L.jpg"
  }
];

async function seedBooks() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    await Book.deleteMany({});
    console.log('Cleared existing books');
    
    await Book.insertMany(sampleBooks);
    console.log('Added sample books');
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

seedBooks();