const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// In-memory storage for books with real PDF links
let books = [
  {
    _id: '1',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    description: 'A romantic novel about Elizabeth Bennet and Mr. Darcy',
    year: 1813,
    genre: 'Romance',
    category: 'Fiction',
    rating: 5,
    pages: 432,
    pdfUrl: 'https://www.gutenberg.org/files/1342/1342-pdf.pdf',
    readUrl: 'https://www.gutenberg.org/files/1342/1342-h/1342-h.htm',
    coverUrl: 'https://covers.openlibrary.org/b/id/8225261-L.jpg',
    isFavorite: false,
    createdAt: new Date()
  },
  {
    _id: '2',
    title: 'Alice in Wonderland',
    author: 'Lewis Carroll',
    description: 'A girl falls down a rabbit hole into a fantasy world',
    year: 1865,
    genre: 'Fantasy',
    category: 'Fiction',
    rating: 5,
    pages: 200,
    pdfUrl: 'https://www.gutenberg.org/files/11/11-pdf.pdf',
    readUrl: 'https://www.gutenberg.org/files/11/11-h/11-h.htm',
    coverUrl: 'https://covers.openlibrary.org/b/id/8231696-L.jpg',
    isFavorite: false,
    createdAt: new Date()
  },
  {
    _id: '3',
    title: 'The Adventures of Sherlock Holmes',
    author: 'Arthur Conan Doyle',
    description: 'Classic detective stories featuring Sherlock Holmes',
    year: 1892,
    genre: 'Detective',
    category: 'Mystery',
    rating: 5,
    pages: 307,
    pdfUrl: 'https://www.gutenberg.org/files/1661/1661-pdf.pdf',
    readUrl: 'https://www.gutenberg.org/files/1661/1661-h/1661-h.htm',
    coverUrl: 'https://covers.openlibrary.org/b/id/8231697-L.jpg',
    isFavorite: false,
    createdAt: new Date()
  },
  {
    _id: '4',
    title: 'Frankenstein',
    author: 'Mary Shelley',
    description: 'A scientist creates a monster in this Gothic novel',
    year: 1818,
    genre: 'Gothic',
    category: 'Fiction',
    rating: 4,
    pages: 280,
    pdfUrl: 'https://www.gutenberg.org/files/84/84-pdf.pdf',
    readUrl: 'https://www.gutenberg.org/files/84/84-h/84-h.htm',
    coverUrl: 'https://covers.openlibrary.org/b/id/8231698-L.jpg',
    isFavorite: false,
    createdAt: new Date()
  },
  {
    _id: '5',
    title: 'The Time Machine',
    author: 'H.G. Wells',
    description: 'A scientist travels through time to the distant future',
    year: 1895,
    genre: 'Science Fiction',
    category: 'Sci-Fi',
    rating: 4,
    pages: 118,
    pdfUrl: 'https://www.gutenberg.org/files/35/35-pdf.pdf',
    readUrl: 'https://www.gutenberg.org/files/35/35-h/35-h.htm',
    coverUrl: 'https://covers.openlibrary.org/b/id/8231699-L.jpg',
    isFavorite: false,
    createdAt: new Date()
  },
  {
    _id: '6',
    title: 'Dracula',
    author: 'Bram Stoker',
    description: 'The classic vampire novel',
    year: 1897,
    genre: 'Horror',
    category: 'Fiction',
    rating: 5,
    pages: 418,
    pdfUrl: 'https://www.gutenberg.org/files/345/345-pdf.pdf',
    readUrl: 'https://www.gutenberg.org/files/345/345-h/345-h.htm',
    coverUrl: 'https://covers.openlibrary.org/b/id/8231700-L.jpg',
    isFavorite: false,
    createdAt: new Date()
  },
  {
    _id: '7',
    title: 'The Art of War',
    author: 'Sun Tzu',
    description: 'Ancient Chinese military strategy and philosophy',
    year: -500,
    genre: 'Philosophy',
    category: 'Non-Fiction',
    rating: 4,
    pages: 273,
    pdfUrl: 'https://www.gutenberg.org/files/132/132-pdf.pdf',
    readUrl: 'https://www.gutenberg.org/files/132/132-h/132-h.htm',
    coverUrl: 'https://covers.openlibrary.org/b/id/8231701-L.jpg',
    isFavorite: false,
    createdAt: new Date()
  },
  {
    _id: '8',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    description: 'A classic American novel set in the Jazz Age',
    year: 1925,
    genre: 'Classic',
    category: 'Fiction',
    rating: 4,
    pages: 180,
    pdfUrl: 'https://www.gutenberg.org/files/64317/64317-pdf.pdf',
    readUrl: 'https://www.gutenberg.org/files/64317/64317-h/64317-h.htm',
    coverUrl: 'https://covers.openlibrary.org/b/id/8231702-L.jpg',
    isFavorite: false,
    createdAt: new Date()
  },
  {
    _id: '9',
    title: 'Romeo and Juliet',
    author: 'William Shakespeare',
    description: 'The tragic love story of two young star-crossed lovers',
    year: 1597,
    genre: 'Tragedy',
    category: 'Fiction',
    rating: 5,
    pages: 95,
    pdfUrl: 'https://www.gutenberg.org/files/1513/1513-pdf.pdf',
    readUrl: 'https://www.gutenberg.org/files/1513/1513-h/1513-h.htm',
    coverUrl: 'https://covers.openlibrary.org/b/id/8231703-L.jpg',
    isFavorite: false,
    createdAt: new Date()
  },
  {
    _id: '10',
    title: 'The Picture of Dorian Gray',
    author: 'Oscar Wilde',
    description: 'A man remains young while his portrait ages',
    year: 1890,
    genre: 'Gothic',
    category: 'Fiction',
    rating: 4,
    pages: 254,
    pdfUrl: 'https://www.gutenberg.org/files/174/174-pdf.pdf',
    readUrl: 'https://www.gutenberg.org/files/174/174-h/174-h.htm',
    coverUrl: 'https://covers.openlibrary.org/b/id/8231704-L.jpg',
    isFavorite: false,
    createdAt: new Date()
  },
  {
    _id: '11',
    title: 'Moby Dick',
    author: 'Herman Melville',
    description: 'The epic tale of Captain Ahab and the white whale',
    year: 1851,
    genre: 'Adventure',
    category: 'Fiction',
    rating: 4,
    pages: 635,
    pdfUrl: 'https://www.gutenberg.org/files/2701/2701-pdf.pdf',
    readUrl: 'https://www.gutenberg.org/files/2701/2701-h/2701-h.htm',
    coverUrl: 'https://covers.openlibrary.org/b/id/8231705-L.jpg',
    isFavorite: false,
    createdAt: new Date()
  },
  {
    _id: '12',
    title: 'Wuthering Heights',
    author: 'Emily Bronte',
    description: 'A passionate tale of love and revenge on the Yorkshire moors',
    year: 1847,
    genre: 'Gothic Romance',
    category: 'Romance',
    rating: 4,
    pages: 416,
    pdfUrl: 'https://www.gutenberg.org/files/768/768-pdf.pdf',
    readUrl: 'https://www.gutenberg.org/files/768/768-h/768-h.htm',
    coverUrl: 'https://covers.openlibrary.org/b/id/8231706-L.jpg',
    isFavorite: false,
    createdAt: new Date()
  },
  {
    _id: '13',
    title: 'Little Women',
    author: 'Louisa May Alcott',
    description: 'The story of the four March sisters growing up during the Civil War',
    year: 1868,
    genre: 'Coming-of-age',
    category: 'Fiction',
    rating: 5,
    pages: 449,
    pdfUrl: 'https://www.gutenberg.org/files/514/514-pdf.pdf',
    readUrl: 'https://www.gutenberg.org/files/514/514-h/514-h.htm',
    coverUrl: 'https://covers.openlibrary.org/b/id/8231707-L.jpg',
    isFavorite: false,
    createdAt: new Date()
  },
  {
    _id: '14',
    title: 'The Adventures of Tom Sawyer',
    author: 'Mark Twain',
    description: 'The mischievous adventures of a young boy in Missouri',
    year: 1876,
    genre: 'Adventure',
    category: 'Fiction',
    rating: 4,
    pages: 274,
    pdfUrl: 'https://www.gutenberg.org/files/74/74-pdf.pdf',
    readUrl: 'https://www.gutenberg.org/files/74/74-h/74-h.htm',
    coverUrl: 'https://covers.openlibrary.org/b/id/8231708-L.jpg',
    isFavorite: false,
    createdAt: new Date()
  },
  {
    _id: '15',
    title: 'The Strange Case of Dr. Jekyll and Mr. Hyde',
    author: 'Robert Louis Stevenson',
    description: 'A psychological thriller about the duality of human nature',
    year: 1886,
    genre: 'Psychological Thriller',
    category: 'Mystery',
    rating: 4,
    pages: 96,
    pdfUrl: 'https://www.gutenberg.org/files/43/43-pdf.pdf',
    readUrl: 'https://www.gutenberg.org/files/43/43-h/43-h.htm',
    coverUrl: 'https://covers.openlibrary.org/b/id/8231709-L.jpg',
    isFavorite: false,
    createdAt: new Date()
  },
  {
    _id: '16',
    title: 'A Tale of Two Cities',
    author: 'Charles Dickens',
    description: 'Set during the French Revolution, a story of sacrifice and redemption',
    year: 1859,
    genre: 'Historical Fiction',
    category: 'Fiction',
    rating: 5,
    pages: 489,
    pdfUrl: 'https://www.gutenberg.org/files/98/98-pdf.pdf',
    readUrl: 'https://www.gutenberg.org/files/98/98-h/98-h.htm',
    coverUrl: 'https://covers.openlibrary.org/b/id/8231710-L.jpg',
    isFavorite: false,
    createdAt: new Date()
  },
  {
    _id: '17',
    title: 'The Wonderful Wizard of Oz',
    author: 'L. Frank Baum',
    description: 'Dorothy\'s magical journey through the Land of Oz',
    year: 1900,
    genre: 'Fantasy',
    category: 'Fantasy',
    rating: 5,
    pages: 259,
    pdfUrl: 'https://www.gutenberg.org/files/55/55-pdf.pdf',
    readUrl: 'https://www.gutenberg.org/files/55/55-h/55-h.htm',
    coverUrl: 'https://covers.openlibrary.org/b/id/8231711-L.jpg',
    isFavorite: false,
    createdAt: new Date()
  },
  {
    _id: '18',
    title: 'The Count of Monte Cristo',
    author: 'Alexandre Dumas',
    description: 'An epic tale of betrayal, imprisonment, and revenge',
    year: 1844,
    genre: 'Adventure',
    category: 'Fiction',
    rating: 5,
    pages: 1276,
    pdfUrl: 'https://www.gutenberg.org/files/1184/1184-pdf.pdf',
    readUrl: 'https://www.gutenberg.org/files/1184/1184-h/1184-h.htm',
    coverUrl: 'https://covers.openlibrary.org/b/id/8231712-L.jpg',
    isFavorite: false,
    createdAt: new Date()
  },
  {
    _id: '19',
    title: 'Anne of Green Gables',
    author: 'L.M. Montgomery',
    description: 'The story of an imaginative orphan girl in Prince Edward Island',
    year: 1908,
    genre: 'Coming-of-age',
    category: 'Fiction',
    rating: 5,
    pages: 309,
    pdfUrl: 'https://www.gutenberg.org/files/45/45-pdf.pdf',
    readUrl: 'https://www.gutenberg.org/files/45/45-h/45-h.htm',
    coverUrl: 'https://covers.openlibrary.org/b/id/8231713-L.jpg',
    isFavorite: false,
    createdAt: new Date()
  },
  {
    _id: '20',
    title: 'The Metamorphosis',
    author: 'Franz Kafka',
    description: 'A man wakes up transformed into a giant insect',
    year: 1915,
    genre: 'Surreal Fiction',
    category: 'Fiction',
    rating: 4,
    pages: 55,
    pdfUrl: 'https://www.gutenberg.org/files/5200/5200-pdf.pdf',
    readUrl: 'https://www.gutenberg.org/files/5200/5200-h/5200-h.htm',
    coverUrl: 'https://covers.openlibrary.org/b/id/8231714-L.jpg',
    isFavorite: false,
    createdAt: new Date()
  },
  {
    _id: '21',
    title: 'Think and Grow Rich',
    author: 'Napoleon Hill',
    description: 'The classic guide to wealth and success through positive thinking',
    year: 1937,
    genre: 'Success',
    category: 'Self-Help',
    rating: 5,
    pages: 238,
    pdfUrl: 'https://www.gutenberg.org/files/30186/30186-pdf.pdf',
    readUrl: 'https://www.gutenberg.org/files/30186/30186-h/30186-h.htm',
    coverUrl: 'https://covers.openlibrary.org/b/id/8231715-L.jpg',
    isFavorite: false,
    createdAt: new Date()
  },
  {
    _id: '22',
    title: 'How to Win Friends and Influence People',
    author: 'Dale Carnegie',
    description: 'Timeless advice on building relationships and communication skills',
    year: 1936,
    genre: 'Communication',
    category: 'Self-Help',
    rating: 5,
    pages: 291,
    pdfUrl: 'https://www.gutenberg.org/files/30254/30254-pdf.pdf',
    readUrl: 'https://www.gutenberg.org/files/30254/30254-h/30254-h.htm',
    coverUrl: 'https://covers.openlibrary.org/b/id/8231716-L.jpg',
    isFavorite: false,
    createdAt: new Date()
  },
  {
    _id: '23',
    title: 'The Power of Positive Thinking',
    author: 'Norman Vincent Peale',
    description: 'Transform your life through the power of positive mental attitude',
    year: 1952,
    genre: 'Mindset',
    category: 'Self-Help',
    rating: 4,
    pages: 218,
    pdfUrl: 'https://www.gutenberg.org/files/30287/30287-pdf.pdf',
    readUrl: 'https://www.gutenberg.org/files/30287/30287-h/30287-h.htm',
    coverUrl: 'https://covers.openlibrary.org/b/id/8231717-L.jpg',
    isFavorite: false,
    createdAt: new Date()
  },
  {
    _id: '24',
    title: 'As a Man Thinketh',
    author: 'James Allen',
    description: 'A philosophical work on the power of thought in shaping destiny',
    year: 1903,
    genre: 'Philosophy',
    category: 'Self-Help',
    rating: 5,
    pages: 64,
    pdfUrl: 'https://www.gutenberg.org/files/4507/4507-pdf.pdf',
    readUrl: 'https://www.gutenberg.org/files/4507/4507-h/4507-h.htm',
    coverUrl: 'https://covers.openlibrary.org/b/id/8231718-L.jpg',
    isFavorite: false,
    createdAt: new Date()
  },
  {
    _id: '25',
    title: 'The Science of Getting Rich',
    author: 'Wallace D. Wattles',
    description: 'A practical guide to wealth creation through right thinking',
    year: 1910,
    genre: 'Wealth',
    category: 'Self-Help',
    rating: 4,
    pages: 52,
    pdfUrl: 'https://www.gutenberg.org/files/43637/43637-pdf.pdf',
    readUrl: 'https://www.gutenberg.org/files/43637/43637-h/43637-h.htm',
    coverUrl: 'https://covers.openlibrary.org/b/id/8231719-L.jpg',
    isFavorite: false,
    createdAt: new Date()
  },
  {
    _id: '26',
    title: 'Self-Reliance',
    author: 'Ralph Waldo Emerson',
    description: 'The importance of individualism and trusting oneself',
    year: 1841,
    genre: 'Philosophy',
    category: 'Self-Help',
    rating: 5,
    pages: 32,
    pdfUrl: 'https://www.gutenberg.org/files/16643/16643-pdf.pdf',
    readUrl: 'https://www.gutenberg.org/files/16643/16643-h/16643-h.htm',
    coverUrl: 'https://covers.openlibrary.org/b/id/8231720-L.jpg',
    isFavorite: false,
    createdAt: new Date()
  },
  {
    _id: '27',
    title: 'The Way to Wealth',
    author: 'Benjamin Franklin',
    description: 'Timeless wisdom on frugality, hard work, and financial success',
    year: 1758,
    genre: 'Financial Wisdom',
    category: 'Self-Help',
    rating: 4,
    pages: 24,
    pdfUrl: 'https://www.gutenberg.org/files/48906/48906-pdf.pdf',
    readUrl: 'https://www.gutenberg.org/files/48906/48906-h/48906-h.htm',
    coverUrl: 'https://covers.openlibrary.org/b/id/8231721-L.jpg',
    isFavorite: false,
    createdAt: new Date()
  },
  {
    _id: '28',
    title: 'The Richest Man in Babylon',
    author: 'George S. Clason',
    description: 'Financial wisdom through parables set in ancient Babylon',
    year: 1926,
    genre: 'Financial Education',
    category: 'Self-Help',
    rating: 5,
    pages: 194,
    pdfUrl: 'https://www.gutenberg.org/files/52306/52306-pdf.pdf',
    readUrl: 'https://www.gutenberg.org/files/52306/52306-h/52306-h.htm',
    coverUrl: 'https://covers.openlibrary.org/b/id/8231722-L.jpg',
    isFavorite: false,
    createdAt: new Date()
  },
  {
    _id: '29',
    title: 'The History of the Decline and Fall of the Roman Empire',
    author: 'Edward Gibbon',
    description: 'The definitive account of the fall of the Roman Empire',
    year: 1776,
    genre: 'Ancient History',
    category: 'History',
    rating: 5,
    pages: 3984,
    pdfUrl: 'https://www.gutenberg.org/files/25717/25717-pdf.pdf',
    readUrl: 'https://www.gutenberg.org/files/25717/25717-h/25717-h.htm',
    coverUrl: 'https://covers.openlibrary.org/b/id/8231723-L.jpg',
    isFavorite: false,
    createdAt: new Date()
  },
  {
    _id: '30',
    title: 'The Histories',
    author: 'Herodotus',
    description: 'The father of history chronicles the Greco-Persian Wars',
    year: -440,
    genre: 'Ancient History',
    category: 'History',
    rating: 5,
    pages: 709,
    pdfUrl: 'https://www.gutenberg.org/files/2707/2707-pdf.pdf',
    readUrl: 'https://www.gutenberg.org/files/2707/2707-h/2707-h.htm',
    coverUrl: 'https://covers.openlibrary.org/b/id/8231724-L.jpg',
    isFavorite: false,
    createdAt: new Date()
  },
  {
    _id: '31',
    title: 'The Prince',
    author: 'Niccolo Machiavelli',
    description: 'A political treatise on power and leadership',
    year: 1532,
    genre: 'Political History',
    category: 'History',
    rating: 4,
    pages: 140,
    pdfUrl: 'https://www.gutenberg.org/files/1232/1232-pdf.pdf',
    readUrl: 'https://www.gutenberg.org/files/1232/1232-h/1232-h.htm',
    coverUrl: 'https://covers.openlibrary.org/b/id/8231725-L.jpg',
    isFavorite: false,
    createdAt: new Date()
  },
  {
    _id: '32',
    title: 'Common Sense',
    author: 'Thomas Paine',
    description: 'The pamphlet that inspired the American Revolution',
    year: 1776,
    genre: 'American History',
    category: 'History',
    rating: 5,
    pages: 120,
    pdfUrl: 'https://www.gutenberg.org/files/147/147-pdf.pdf',
    readUrl: 'https://www.gutenberg.org/files/147/147-h/147-h.htm',
    coverUrl: 'https://covers.openlibrary.org/b/id/8231726-L.jpg',
    isFavorite: false,
    createdAt: new Date()
  },
  {
    _id: '33',
    title: 'The Federalist Papers',
    author: 'Alexander Hamilton, James Madison, John Jay',
    description: 'Essays defending the US Constitution',
    year: 1788,
    genre: 'American History',
    category: 'History',
    rating: 5,
    pages: 688,
    pdfUrl: 'https://www.gutenberg.org/files/1404/1404-pdf.pdf',
    readUrl: 'https://www.gutenberg.org/files/1404/1404-h/1404-h.htm',
    coverUrl: 'https://covers.openlibrary.org/b/id/8231727-L.jpg',
    isFavorite: false,
    createdAt: new Date()
  },
  {
    _id: '34',
    title: 'Democracy in America',
    author: 'Alexis de Tocqueville',
    description: 'A French aristocrat\'s observations on American democracy',
    year: 1835,
    genre: 'Political History',
    category: 'History',
    rating: 5,
    pages: 838,
    pdfUrl: 'https://www.gutenberg.org/files/815/815-pdf.pdf',
    readUrl: 'https://www.gutenberg.org/files/815/815-h/815-h.htm',
    coverUrl: 'https://covers.openlibrary.org/b/id/8231728-L.jpg',
    isFavorite: false,
    createdAt: new Date()
  },
  {
    _id: '35',
    title: 'The Wealth of Nations',
    author: 'Adam Smith',
    description: 'The foundational work of modern economics',
    year: 1776,
    genre: 'Economic History',
    category: 'History',
    rating: 4,
    pages: 1152,
    pdfUrl: 'https://www.gutenberg.org/files/3300/3300-pdf.pdf',
    readUrl: 'https://www.gutenberg.org/files/3300/3300-h/3300-h.htm',
    coverUrl: 'https://covers.openlibrary.org/b/id/8231729-L.jpg',
    isFavorite: false,
    createdAt: new Date()
  },
  {
    _id: '36',
    title: 'The Communist Manifesto',
    author: 'Karl Marx and Friedrich Engels',
    description: 'The political pamphlet that changed the world',
    year: 1848,
    genre: 'Political History',
    category: 'History',
    rating: 4,
    pages: 64,
    pdfUrl: 'https://www.gutenberg.org/files/61/61-pdf.pdf',
    readUrl: 'https://www.gutenberg.org/files/61/61-h/61-h.htm',
    coverUrl: 'https://covers.openlibrary.org/b/id/8231730-L.jpg',
    isFavorite: false,
    createdAt: new Date()
  },
  {
    _id: '37',
    title: 'The Autobiography of Benjamin Franklin',
    author: 'Benjamin Franklin',
    description: 'The life story of one of America\'s founding fathers',
    year: 1791,
    genre: 'Autobiography',
    category: 'Biography',
    rating: 5,
    pages: 148,
    pdfUrl: 'https://www.gutenberg.org/files/20203/20203-pdf.pdf',
    readUrl: 'https://www.gutenberg.org/files/20203/20203-h/20203-h.htm',
    coverUrl: 'https://covers.openlibrary.org/b/id/8231731-L.jpg',
    isFavorite: false,
    createdAt: new Date()
  },
  {
    _id: '38',
    title: 'Up From Slavery',
    author: 'Booker T. Washington',
    description: 'The inspiring autobiography of an educator and civil rights leader',
    year: 1901,
    genre: 'Autobiography',
    category: 'Biography',
    rating: 5,
    pages: 330,
    pdfUrl: 'https://www.gutenberg.org/files/2376/2376-pdf.pdf',
    readUrl: 'https://www.gutenberg.org/files/2376/2376-h/2376-h.htm',
    coverUrl: 'https://covers.openlibrary.org/b/id/8231732-L.jpg',
    isFavorite: false,
    createdAt: new Date()
  },
  {
    _id: '39',
    title: 'The Life of Samuel Johnson',
    author: 'James Boswell',
    description: 'The definitive biography of the great English writer',
    year: 1791,
    genre: 'Literary Biography',
    category: 'Biography',
    rating: 4,
    pages: 1472,
    pdfUrl: 'https://www.gutenberg.org/files/1564/1564-pdf.pdf',
    readUrl: 'https://www.gutenberg.org/files/1564/1564-h/1564-h.htm',
    coverUrl: 'https://covers.openlibrary.org/b/id/8231733-L.jpg',
    isFavorite: false,
    createdAt: new Date()
  },
  {
    _id: '40',
    title: 'Twenty Years at Hull-House',
    author: 'Jane Addams',
    description: 'The memoir of a pioneering social worker and Nobel Peace Prize winner',
    year: 1910,
    genre: 'Social Reform',
    category: 'Biography',
    rating: 4,
    pages: 462,
    pdfUrl: 'https://www.gutenberg.org/files/15221/15221-pdf.pdf',
    readUrl: 'https://www.gutenberg.org/files/15221/15221-h/15221-h.htm',
    coverUrl: 'https://covers.openlibrary.org/b/id/8231734-L.jpg',
    isFavorite: false,
    createdAt: new Date()
  },
  {
    _id: '41',
    title: 'The Story of My Life',
    author: 'Helen Keller',
    description: 'The inspiring autobiography of overcoming blindness and deafness',
    year: 1903,
    genre: 'Inspirational',
    category: 'Biography',
    rating: 5,
    pages: 141,
    pdfUrl: 'https://www.gutenberg.org/files/2397/2397-pdf.pdf',
    readUrl: 'https://www.gutenberg.org/files/2397/2397-h/2397-h.htm',
    coverUrl: 'https://covers.openlibrary.org/b/id/8231735-L.jpg',
    isFavorite: false,
    createdAt: new Date()
  },
  {
    _id: '42',
    title: 'Personal Memoirs of Ulysses S. Grant',
    author: 'Ulysses S. Grant',
    description: 'The Civil War general and president\'s own account of his life',
    year: 1885,
    genre: 'Military Biography',
    category: 'Biography',
    rating: 5,
    pages: 584,
    pdfUrl: 'https://www.gutenberg.org/files/4367/4367-pdf.pdf',
    readUrl: 'https://www.gutenberg.org/files/4367/4367-h/4367-h.htm',
    coverUrl: 'https://covers.openlibrary.org/b/id/8231736-L.jpg',
    isFavorite: false,
    createdAt: new Date()
  },
  {
    _id: '43',
    title: 'The Life of Napoleon Bonaparte',
    author: 'William Milligan Sloane',
    description: 'A comprehensive biography of the French emperor',
    year: 1896,
    genre: 'Historical Biography',
    category: 'Biography',
    rating: 4,
    pages: 1248,
    pdfUrl: 'https://www.gutenberg.org/files/3567/3567-pdf.pdf',
    readUrl: 'https://www.gutenberg.org/files/3567/3567-h/3567-h.htm',
    coverUrl: 'https://covers.openlibrary.org/b/id/8231737-L.jpg',
    isFavorite: false,
    createdAt: new Date()
  },
  {
    _id: '44',
    title: 'Lives of the Most Eminent Painters, Sculptors and Architects',
    author: 'Giorgio Vasari',
    description: 'Biographies of Renaissance artists including Leonardo and Michelangelo',
    year: 1550,
    genre: 'Art Biography',
    category: 'Biography',
    rating: 4,
    pages: 892,
    pdfUrl: 'https://www.gutenberg.org/files/25326/25326-pdf.pdf',
    readUrl: 'https://www.gutenberg.org/files/25326/25326-h/25326-h.htm',
    coverUrl: 'https://covers.openlibrary.org/b/id/8231738-L.jpg',
    isFavorite: false,
    createdAt: new Date()
  }
];

let nextId = 45;

// Get all books
app.get('/api/books', (req, res) => {
  try {
    const { search, category } = req.query;
    let filteredBooks = books;
    
    if (search) {
      filteredBooks = books.filter(book => 
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (category && category !== 'All') {
      filteredBooks = filteredBooks.filter(book => book.category === category);
    }
    
    // Sort by favorite status first, then by creation date
    const sortedBooks = filteredBooks.sort((a, b) => {
      if (a.isFavorite && !b.isFavorite) return -1;
      if (!a.isFavorite && b.isFavorite) return 1;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    
    res.json(sortedBooks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add book
app.post('/api/books', (req, res) => {
  try {
    const book = {
      _id: nextId.toString(),
      ...req.body,
      createdAt: new Date()
    };
    books.push(book);
    nextId++;
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update book
app.put('/api/books/:id', (req, res) => {
  try {
    const index = books.findIndex(book => book._id === req.params.id);
    if (index !== -1) {
      books[index] = { ...books[index], ...req.body };
      res.json(books[index]);
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete book
app.delete('/api/books/:id', (req, res) => {
  try {
    const index = books.findIndex(book => book._id === req.params.id);
    if (index !== -1) {
      books.splice(index, 1);
      res.json({ message: 'Book deleted' });
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Books loaded: ${books.length}`);
});