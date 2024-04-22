import { useState, useEffect } from 'react';

const useBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('http://localhost/bookworm/backend/Model/Books.php')
      .then(response => response.json())
      .then(data => setBooks(data))
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  return books;
};

export default useBooks;
