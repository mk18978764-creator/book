import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const categories = ['All', 'Fiction', 'Non-Fiction', 'Mystery', 'Romance', 'Sci-Fi', 'Fantasy', 'Biography', 'History', 'Self-Help'];
const API_BASE = process.env.REACT_APP_API_URL || '';

function App() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: '', author: '', description: '', year: '', genre: '', coverUrl: '', rating: '', category: '', pages: '', readUrl: '', pdfUrl: '', isFavorite: false });
  const [editId, setEditId] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });


  useEffect(() => {
    fetchBooks();
  }, [search, category]);

  const fetchBooks = async () => {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (category) params.append('category', category);
    const res = await axios.get(`${API_BASE}/api/books?${params}`);
    setBooks(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`${API_BASE}/api/books/${editId}`, form);
      setEditId(null);
    } else {
      await axios.post(`${API_BASE}/api/books`, form);
    }
    resetForm();
    fetchBooks();
  };

  const resetForm = () => {
    setForm({ title: '', author: '', description: '', year: '', genre: '', coverUrl: '', rating: '', category: '', pages: '', readUrl: '', pdfUrl: '', isFavorite: false });
    setShowModal(false);
    setEditId(null);
  };

  const handleEdit = (book) => {
    setForm(book);
    setEditId(book._id);
    setShowModal(true);
  };

  const handleFavorite = async (id) => {
    try {
      const book = books.find(b => b._id === id);
      const updatedBook = { ...book, isFavorite: !book.isFavorite };
      await axios.put(`${API_BASE}/api/books/${id}`, updatedBook);
      fetchBooks();
    } catch (error) {
      console.error('Error updating favorite:', error);
    }
  };

  const handleReadClick = (book) => {
    setSelectedBook(book);
    setShowLogin(true);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Accept any email and password
    if (loginForm.email && loginForm.password) {
      setShowLogin(false);
      setLoginForm({ email: '', password: '' });
      // Open the book
      window.open(selectedBook.readUrl, '_blank');
      setSelectedBook(null);
    } else {
      alert('Please enter email and password');
    }
  };

  const closeLogin = () => {
    setShowLogin(false);
    setSelectedBook(null);
    setLoginForm({ email: '', password: '' });
  };



  return (
    <div className="App">
      <header className="header">
        <div className="header-content">
          <h1><span className="header-book-icon">📚</span> Free Books Library</h1>
          <div className="search-bar">
            <input 
              type="text" 
              placeholder="Search books by title or author..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={fetchBooks}>Search</button>
          </div>
          <div className="categories">
            {categories.map(cat => (
              <button 
                key={cat}
                className={`category-btn ${category === cat ? 'active' : ''}`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="container">
        <div className="section-header">
          <h2>Available Books ({books.length})</h2>
          <button className="add-btn" onClick={() => setShowModal(true)}>+ Add Book</button>
        </div>

        {books.length === 0 ? (
          <div className="empty-state">
            <h3>No books found</h3>
            <p>Start by adding your first book!</p>
          </div>
        ) : (
          <div className="books-grid">
            {books.map(book => (
              <div key={book._id} className={`book-card ${book.isFavorite ? 'starred' : ''}`}>
                <div 
                  className={`star-badge ${book.isFavorite ? 'active' : ''}`}
                  onClick={() => handleFavorite(book._id)}
                >
                  {book.isFavorite ? '★' : '☆'}
                </div>
                <div className="book-cover">
                  {book.coverUrl ? (
                    <img src={book.coverUrl} alt={book.title} />
                  ) : (
                    <span>📖</span>
                  )}
                </div>
                <div className="book-info">
                  <div className="book-title" title={book.title}>{book.title}</div>
                  <div className="book-author">{book.author}</div>
                  <div className="book-meta">
                    <span className="rating">{'⭐'.repeat(book.rating || 0)}</span>
                    {book.year && <span>{book.year}</span>}
                  </div>
                  <div className="book-actions">
                    {book.readUrl && (
                      <button className="read-btn" onClick={() => handleReadClick(book)}>
                        📖 Read
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showLogin && (
        <div className="modal" onClick={closeLogin}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>🔐 Login to Read "{selectedBook?.title}"</h2>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Email *</label>
                <input 
                  type="email" 
                  value={loginForm.email} 
                  onChange={(e) => setLoginForm({...loginForm, email: e.target.value})} 
                  placeholder="Enter any email"
                  required 
                />
              </div>
              <div className="form-group">
                <label>Password *</label>
                <input 
                  type="password" 
                  value={loginForm.password} 
                  onChange={(e) => setLoginForm({...loginForm, password: e.target.value})} 
                  placeholder="Enter any password"
                  required 
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">📖 Read Book</button>
                <button type="button" className="btn btn-secondary" onClick={closeLogin}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showModal && (
        <div className="modal" onClick={() => resetForm()}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{editId ? 'Edit Book' : 'Add New Book'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title *</label>
                <input value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Author *</label>
                <input value={form.author} onChange={(e) => setForm({...form, author: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Cover Image URL</label>
                <input value={form.coverUrl} onChange={(e) => setForm({...form, coverUrl: e.target.value})} placeholder="https://example.com/cover.jpg" />
              </div>
              <div className="form-group">
                <label>Read Online URL</label>
                <input value={form.readUrl} onChange={(e) => setForm({...form, readUrl: e.target.value})} placeholder="https://example.com/read-online" />
              </div>
              <div className="form-group">
                <label>PDF Download URL</label>
                <input value={form.pdfUrl} onChange={(e) => setForm({...form, pdfUrl: e.target.value})} placeholder="https://example.com/book.pdf" />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select value={form.category} onChange={(e) => setForm({...form, category: e.target.value})}>
                  <option value="">Select category</option>
                  {categories.filter(c => c !== 'All').map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Year</label>
                <input type="number" value={form.year} onChange={(e) => setForm({...form, year: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Rating (1-5)</label>
                <input type="number" min="0" max="5" value={form.rating} onChange={(e) => setForm({...form, rating: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Pages</label>
                <input type="number" value={form.pages} onChange={(e) => setForm({...form, pages: e.target.value})} />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">{editId ? 'Update' : 'Add'} Book</button>
                <button type="button" className="btn btn-secondary" onClick={resetForm}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;