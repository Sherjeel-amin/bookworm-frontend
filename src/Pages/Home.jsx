import React from 'react'
import Hero from '../Components/Hero/Hero'
import Popular from '../Components/Polular/Popular'
import Offers from '../Components/Offers/Offers'
import NewCollections from '../Components/NewCollections/NewCollections'
import NewsLetter from '../Components/NewsLetter/NewsLetter'
import BooksList from '../Components/item/BookList'

const Home = () => {
  return (
    <div>
      <Hero />
      < BooksList />
      {/* <Popular /> */}
      <Offers />
      {/* <NewCollections /> */}
      <NewsLetter />
    </div>
  )
}

export default Home
