import { useState, useEffect } from 'react';
import { booksData } from '../../services/bookService';

const useBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    booksData()
      .then(response => setBooks(response.data))
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  return books;
};

export default useBooks;


// Custom Hook used to fetch books from the Database through api
