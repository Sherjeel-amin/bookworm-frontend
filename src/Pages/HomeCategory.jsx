import React, { useContext } from 'react';
import './CSS/HomeCategory.css';
import { ShopContext } from '../Context/ShopContext.jsx';
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import { Link } from 'react-router-dom';

const HomeCategory = (props) => {
    const { all_product } = useContext(ShopContext);

    const filteredBooks = all_product.filter(book => book.category_name === props.category);

    return (
        <div className='shop-category'>
            <img className='shopcategory-banner' src={props.banner} alt="" />
            <div className="shopcategory-indexSort">
                <p>
                    <span>Showing 1 - 12</span> out of 36
                </p>
                <br />
                <span className='shopcategory-sort'>
                    Sort by <img src={dropdown_icon} alt="" />
                </span>
                <div className="shopcategory-products">
                    {filteredBooks.map((book) => (
                        <div key={book.id} className="book-item">
                          <Link to={`/product/${book.id}`}>
                            <img className='item-image' src={book.cover_image} alt={book.title} />
                            </Link>
                            <div className="book-details">
                                <strong>Title:</strong> {book.title}<br />
                                <strong>Author:</strong> {book.author_name}<br />
                                <strong>Description:</strong> {book.description}<br />
                                <strong>Price:</strong> ${book.price}<br />
                                <strong>Category:</strong> {book.category_name}<br />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HomeCategory;
