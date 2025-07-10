import { Route, Routes } from 'react-router-dom'
import './App.css'
import { CartWishlistProvider } from './context/CartWishlistContext'
import IndexTwo from './pages/index/index-two'
import Error from './pages/special/error'
import Wishlist from './pages/account/wishlist'

import Cart from './pages/shop/cart'
import Checkout from './pages/shop/checkout'
import ShopV2 from './pages/shop/shop-v2'
import ProductDetails from './pages/index/product-details'

import Contact from './pages/inner-pages/contact'
import ProductCategory from './pages/shop/product-category'
import PaymentSuccess from './pages/shop/payment-success'

function App() {
  return (
    <CartWishlistProvider>
      <Routes>
        <Route path="/" element={<IndexTwo/>} />
        <Route path="/index-two" element={<IndexTwo/>} />
        <Route path="/error" element={<Error/>} />
        <Route path="/wishlist" element={<Wishlist/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/checkout" element={<Checkout/>} />
        <Route path="/shop-v2" element={<ShopV2/>} />
        <Route path="/shop" element={<ShopV2/>} />
        <Route path="/product-details/:id" element={<ProductDetails/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/product-category" element={<ProductCategory/>} />
        <Route path="/payment-success" element={<PaymentSuccess/>} />
      </Routes>
    </CartWishlistProvider>
  )
}

export default App
