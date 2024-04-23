import React from 'react'
import Hero from '../Components/Hero/Hero'
import Offers from '../Components/Offers/Offers'
import NewsLetter from '../Components/NewsLetter/NewsLetter'
import BooksList from '../Components/item/BookList'

const Home = () => {
  return (
    <div>
      <Hero />
      < BooksList />
      <Offers />
      <NewsLetter />
    </div>
  )
}

export default Home
