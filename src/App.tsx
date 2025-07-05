import { Route, Routes } from 'react-router-dom'
import './App.css'
import { CartWishlistProvider } from './context/CartWishlistContext'
import IndexTwo from './pages/index/index-two'
import Error from './pages/special/error'
import Wishlist from './pages/account/wishlist'
import ComingSoon from './pages/special/coming-soon'
import Cart from './pages/shop/cart'
// import Checkout from './pages/shop/checkout'
import ShopV2 from './pages/shop/shop-v2'
// import ProductDetails from './pages/index/product-details'
import BlogV1 from './pages/blog/blog-v1'
import BlogV2 from './pages/blog/blog-v2'

import BlogTag from './pages/blog/blog-tag'
import Contact from './pages/inner-pages/contact'
import ProductCategory from './pages/shop/product-category'

function App() {
  return (
    <CartWishlistProvider>
      <Routes>
        <Route path="/" element={<IndexTwo/>} />
        <Route path="/index-two" element={<IndexTwo/>} />
        <Route path="/error" element={<Error/>} />
        <Route path="/wishlist" element={<Wishlist/>} />
        <Route path="/coming-soon" element={<ComingSoon/>} />
        <Route path="/cart" element={<Cart/>} />
        {/* <Route path="/checkout" element={<Checkout/>} /> */}
        <Route path="/shop-v2" element={<ShopV2/>} />
        <Route path="/shop" element={<ShopV2/>} />
        {/* <Route path="/product-details/:id" element={<ProductDetails/>} /> */}
        <Route path="/blog-v1" element={<BlogV1/>} />
        <Route path="/blog-v2" element={<BlogV2/>} />

        <Route path="/blog-tag" element={<BlogTag/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/product-category" element={<ProductCategory/>} />
        
        {/* Redirect product-details and checkout to error page */}
        <Route path="/product-details/:id" element={<Error/>} />
        <Route path="/checkout" element={<Error/>} />
      </Routes>
    </CartWishlistProvider>
  )
}

export default App
