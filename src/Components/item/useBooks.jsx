import { useState, useEffect } from 'react';
import axios from 'axios';

const useBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/Books.php`)
      .then(response => setBooks(response.data))
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  return books;
};

export default useBooks;
