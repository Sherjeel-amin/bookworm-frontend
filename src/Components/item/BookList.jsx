import React, { useState } from 'react';
import './BookList.css';
import { Link } from 'react-router-dom';
import useBooks from './useBooks';

const BooksList = () => {
  const books = useBooks();
  const [searchQuery, setSearchQuery] = useState("");

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
        {books.filter((item)=>(item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||item.author_name.toLowerCase().includes(searchQuery.toLowerCase())  || item.category_name.toLowerCase().includes(searchQuery.toLowerCase()) ))
        .map(book => (
          <li key={book.id}>
            <Link to={`/product/${book.id}`}> 
              <img src={book.cover_image} alt={book.title} /> 
            </Link>
            <br />
            <strong>Title:</strong> {book.title}<br />
            <strong>Author:</strong> {book.author_name}<br />
            <strong>Description:</strong> {book.description}<br />
            <strong>Price:</strong> ${book.price}<br />
            <strong>Category:</strong> {book.category_name} <br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BooksList;




