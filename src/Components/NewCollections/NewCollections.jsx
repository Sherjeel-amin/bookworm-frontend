import React from 'react'
import './NewCollections.css'
import new_collection from '../Assets/new_collections'
import Item from '../item/BookList'

const NewCollections = () => {
  return (
    <div className='new-collections'>
      <h1>New Collections</h1>
      <hr />
      <div className="collections">
        {new_collection.map((item,i)=>{
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
        })}
      </div>
    </div>
  )
}

export default NewCollections



/*import React, { useState, useEffect } from 'react';
import './NewCollections.css';

const BooksList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('http://localhost/bookworm/backend/Model/Books.php')
      .then(response => response.json())
      .then(data => setBooks(data))
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  return (
    <div>
      <h2>Books List</h2>
      <ul>
        {books.map(book => (
          <li key={book.id}>
            <img src={book.cover_image} alt={book.title} /> <br />
            <strong>Title:</strong> {book.title}<br />
            <strong>Author:</strong> {book.author_name}<br />
            <strong>Description:</strong> {book.description}<br />
            <strong>Price:</strong> ${book.price}<br />
            <strong>Category:</strong> {book.category_name} <br />
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BooksList;
*/
