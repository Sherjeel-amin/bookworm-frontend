import React from 'react';
import './BookList.css';
import { Link } from 'react-router-dom';
import useBooks from './useBooks'; 

const BooksList = () => {
  const books = useBooks(); 

  return (
    <div className='booklist'>
      <h2>Books List</h2>
      <hr />
      <ul className='collections'>
        {books.map(book => (
          <li key={book.id}>
            <Link to={`/product/${book.id}`}> {/* Link to each book's individual product page */}
              <img src={book.cover_image} alt={book.title} /> {/* Image should be wrapped with Link */}
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




// import React from 'react'
// import { Link } from 'react-router-dom'
// import './Item.css'



// const Item = (props) => {
//   return (
//     <div className='item'>
//     <Link to={`/product/${props.id}`}>  <img src={props.image} alt="" /> </Link>
//       <p>{props.name}</p>
//       <div className="itemprices">
//         <div className="item-price-new">
//         ₹{props.new_price}
//         </div>
//             <div className="item-price-old">
//             ₹{props.old_price}
//             </div>
//       </div>
//     </div>

//   )
// }

// export default Item
