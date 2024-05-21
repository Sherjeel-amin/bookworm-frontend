import React from 'react'
import Hero from '../Components/Hero/Hero'
import NewsLetter from '../Components/NewsLetter/NewsLetter'
import BooksList from '../Components/item/BookList'

const Home = () => {
  return (
    <div>
      <Hero />
      < BooksList />
      <NewsLetter />
    </div>
  )
}

export default Home
