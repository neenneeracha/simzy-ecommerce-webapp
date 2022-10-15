import React from 'react'
import Categories from '../components/Categories'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Newsletter from '../components/NewLetter'
import Products from '../components/Products'
import Slider from '../components/Slider'

const Home = () => {
    return (
        <div>
            <Navbar/> 
            <Slider/>
            <Categories/>
            <Products/>
            <Footer/>
            <Newsletter/>
        </div>
    )
}

export default Home