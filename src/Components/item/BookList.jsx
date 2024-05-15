import React, { useState } from 'react';
import './BookList.css';
import { Link } from 'react-router-dom';
import useBooks from './useBooks';

const BooksList = () => {
  const books = useBooks();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 8;

  // Logic to get the index of the first and last book on the current page
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  
  const currentBooks = books
    .filter((item) => (
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category_name.toLowerCase().includes(searchQuery.toLowerCase())
    ))
    .slice(indexOfFirstBook, indexOfLastBook);

  // Logic to change the page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Options for the select dropdown

  const totalPages = Math.ceil(books.length / booksPerPage);
  const pageOptions = [];
  
  for (let i = 1; i <= totalPages; i++) {
    pageOptions.push(i);
  }
  

  return (
    <div className='booklist'>
      <div className="search-bar">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search your books by Author/Category/BookName"
        />
      </div>
      <h2>Books List</h2>
      <hr />
      <ul className='collections'>
        {currentBooks.map(book => (
          <li key={book.id}>
            <Link to={`/product/${book.id}`}>
              <img src={book.cover_image} alt={book.title} />
            </Link>
            <br />
            <strong>Title:</strong> {book.title}<br />
            <strong>Author:</strong> {book.author_name}<br />
            <strong>Description:</strong> {book.description}<br />
            <strong>Price:</strong> ₹{book.price}<br />
            <strong>Category:</strong> {book.category_name} <br />
          </li>
        ))}
      </ul>
      {/* Pagination */}
      <div className="pagination">
        {pageOptions.map((page) => (
          <button
            key={page}
            onClick={() => paginate(page)}
            className={currentPage === page ? 'active' : ''}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BooksList;
