import { Link } from "react-router-dom";
import { useEffect } from "react";

import NavbarOne from "../../components/navbar/navbar-one";
import ScrollToTop from "../../components/scroll-to-top";

import { useCartWishlist } from "../../context/CartWishlistContext";

import bg from '../../assets/img/shortcode/breadcumb.jpg'

import { RiShoppingBag2Line } from "react-icons/ri";
import { FaHeart } from "react-icons/fa";
import { GoStarFill } from "react-icons/go";

import Aos from "aos";
import FooterTwo from "../../components/footer/footer-two";
import LayoutOne from '../../components/product/layout-one';
import React, { useState } from 'react';
import { productList } from '../../data/data';
import { useRef } from 'react';

interface WishlistItem {
    id: number;
    name: string;
    price: number;
    image: string;
    category?: string;
    type?: string;
    brand?: string;
    tag?: string; // Added tag property
}

export default function Wishlist() {
    const { state, removeFromWishlist, addToCart, isInCart } = useCartWishlist();
    const { wishlist } = state;

    const [showAddToCartModal, setShowAddToCartModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<WishlistItem | null>(null);

    useEffect(() => {
        Aos.init()
    }, [])

    const handleAddToCart = (item: WishlistItem) => {
        setSelectedProduct(item);
        setShowAddToCartModal(true);
    };

    const handleRemoveFromWishlist = (id: number) => {
        removeFromWishlist(id);
    };

    return (
        <>
            <NavbarOne />

            <div className="flex items-center gap-4 flex-wrap bg-overlay p-14 sm:p-16 before:bg-title before:bg-opacity-70" style={{ backgroundImage: `url(${bg})` }}>
                <div className="text-center w-full">
                    <h2 className="text-white text-8 md:text-[40px] font-normal leading-none text-center">Wishlist</h2>
                    <ul className="flex items-center justify-center gap-[10px] text-base md:text-lg leading-none font-normal text-white mt-3 md:mt-4">
                        <li><Link to="/">Home</Link></li>
                        <li>/</li>
                        <li className="text-primary">wishlist</li>
                    </ul>
                </div>
            </div>

            <div className="s-py-100">
                <div className="container-fluid">
                    <div className="max-w-[1720px] mx-auto" data-aos="fade-up" data-aos-delay="100">
                        {wishlist.length === 0 ? (
                            <div className="text-center py-20">
                                <h3 className="text-2xl font-semibold text-title dark:text-white mb-4">Your wishlist is empty</h3>
                                <p className="text-paragraph dark:text-white mb-8">Looks like you haven't added any items to your wishlist yet.</p>
                                <Link to="/shop" className="btn btn-solid" data-text="Start Shopping">
                                    <span>Start Shopping</span>
                                </Link>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-6 lg::gap-8">
                                {wishlist.map((item: WishlistItem, index: number) => {
                                    return (
                                        <div className="group" key={index}>
                                            <div className="relative overflow-hidden group aspect-square w-full max-w-[300px] z-[5] p-0 m-0
    before:absolute before:inset-0 before:bg-title before:opacity-0 before:duration-300 before:z-[5] hover:before:opacity-80">

                                                <img className="block object-cover w-full h-full rounded-none duration-300 group-hover:scale-110"
                                                    src={item.image} alt="product-card" />

                                                <div className="absolute z-10 top-1/2 left-1/2 transform -translate-y-2/4 -translate-x-2/4 flex gap-2">
                                                    <button
                                                        onClick={() => handleAddToCart(item)}
                                                        className={`w-9 lg:w-12 h-9 p-2 lg:h-12 bg-white dark:bg-title bg-opacity-10 flex items-center justify-center transform translate-y-8 opacity-0 transition-all group-hover:duration-500 group-hover:opacity-100 group-hover:translate-y-0 relative tooltip-icon ${isInCart(item.id) ? 'bg-green-500 bg-opacity-80' : ''}`}
                                                    >
                                                        <RiShoppingBag2Line className="text-white size-6" />
                                                        <span className="p-2 bg-white dark:bg-title text-xs text-title dark:text-white absolute -top-[60px] left-1/2 transform -translate-x-1/2 whitespace-nowrap rounded-[4px] opacity-0 invisible duration-300">
                                                            {isInCart(item.id) ? 'In Cart' : 'Add to Cart'}
                                                            <span className="w-3 h-3 bg-white dark:bg-title absolute -bottom-[6px] left-1/2 transform -translate-x-1/2 rotate-45"></span>
                                                        </span>
                                                    </button>
                                                    <button
                                                        onClick={() => handleRemoveFromWishlist(item.id)}
                                                        className="w-9 lg:w-12 h-9 p-2 lg:h-12 bg-white dark:bg-title bg-opacity-10 flex items-center justify-center translate-y-8 opacity-0 transition-all group-hover:duration-300 group-hover:opacity-100 group-hover:translate-y-0 relative tooltip-icon hover:bg-red-500 hover:bg-opacity-80">
                                                        <FaHeart className="dark:text-white text-[#F0264A] size-6" />
                                                        <span className="p-2 bg-white dark:bg-title text-xs text-title dark:text-white absolute -top-[60px] left-1/2 transform -translate-x-1/2 whitespace-nowrap rounded-[4px] opacity-0 invisible duration-300">
                                                            Remove from Wishlist
                                                            <span className="w-3 h-3 bg-white dark:bg-title absolute -bottom-[6px] left-1/2 transform -translate-x-1/2 rotate-45"></span>
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="lg:pt-7 pt-5 flex gap-3 md:gap-4 flex-col">
                                                <h4 className="font-medium leading-none dark:text-white text-lg">₹{item.price.toFixed(2)}</h4>
                                                <div>
                                                    <h5 className="font-normal dark:text-white text-xl leading-[1.5]">
                                                        <Link to="/error" className="text-underline">{item.name}</Link>
                                                    </h5>
                                                    <ul className="flex items-center gap-2 mt-1">
                                                        <li><GoStarFill className='text-yellow-500 size-4' /></li>
                                                        <li><GoStarFill className='text-yellow-500 size-4' /></li>
                                                        <li><GoStarFill className='text-yellow-500 size-4' /></li>
                                                        <li><GoStarFill className='text-yellow-500 size-4' /></li>
                                                        <li><GoStarFill className='text-slate-300 size-4' /></li>
                                                        <li className="dark:text-gray-100">( 1,230 )</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <FooterTwo />

            <ScrollToTop />
            {showAddToCartModal && selectedProduct && (
                <AddToCartModal
                    product={productList.find((p) => p.id === selectedProduct.id)}
                    onClose={() => setShowAddToCartModal(false)}
                    onConfirm={(size: string, color: string) => {
                        addToCart({
                            id: selectedProduct.id,
                            name: selectedProduct.name,
                            price: selectedProduct.price,
                            image: selectedProduct.image,
                            category: selectedProduct.category,
                            type: selectedProduct.type,
                            brand: selectedProduct.brand,
                            size,
                            color
                        });
                        setShowAddToCartModal(false);
                    }}
                />
            )}
        </>
    )
}

function AddToCartModal({ product, onClose, onConfirm }: { product: any, onClose: () => void, onConfirm: (size: string, color: string) => void }) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const toastTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleConfirm = () => {
    if (!selectedSize || !selectedColor) {
      setShowToast(true);
      if (toastTimeout.current) clearTimeout(toastTimeout.current);
      toastTimeout.current = setTimeout(() => setShowToast(false), 2000);
      return;
    }
    onConfirm(selectedSize, selectedColor);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 dark:bg-opacity-70" style={{backdropFilter: 'blur(2px)'}}>
      <div className="bg-white dark:bg-title dark:text-white rounded-xl p-6 w-full max-w-md relative border border-gray-200 dark:border-gray-700">
        <button className="absolute top-2 right-4 text-2xl text-gray-400 hover:text-black dark:text-gray-500 dark:hover:text-white" onClick={onClose}>&times;</button>
        <h2 className="text-xl font-bold mb-4 dark:text-white">Select Size & Color</h2>
        <div className="mb-4">
          <div className="font-semibold text-sm mb-1 dark:text-gray-200">Size:</div>
          <div className="flex gap-2">
            {product?.sizes?.map((size: string) => (
              <label key={size} className="cursor-pointer">
                <input type="radio" name="modal-size" className="appearance-none hidden" checked={selectedSize === size} onChange={() => setSelectedSize(size)} title={`Size ${size}`} placeholder={size} />
                <span className={`px-3 py-1 border rounded ${selectedSize === size ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-gray-100 text-black dark:bg-gray-800 dark:text-white'} border-gray-300 dark:border-gray-600`}>{size}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <div className="font-semibold text-sm mb-1 dark:text-gray-200">Color:</div>
          <div className="flex gap-2">
            {product?.colors?.map((color: string, idx: number) => (
              <label key={color} htmlFor={`modal-color-${idx}`} style={{cursor: 'pointer'}}>
                <input id={`modal-color-${idx}`} type="radio" name="modal-color" className="appearance-none hidden" checked={selectedColor === color} onChange={() => setSelectedColor(color)} title={color} placeholder={color} />
                <span className={`border flex rounded-full duration-300 p-1 ${selectedColor === color ? 'ring-2 ring-offset-2 ring-[#E13939]' : ''} border-gray-300 dark:border-gray-600`} style={{ boxShadow: selectedColor === color ? '0 0 0 2px #E13939' : 'none', transition: 'box-shadow 0.2s' }}>
                  <span className="w-6 h-6 rounded-full flex" style={{ backgroundColor: color, border: '1px solid #888' }}></span>
                </span>
              </label>
            ))}
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <button className="bg-black dark:bg-white dark:text-black text-white px-6 py-2 rounded font-semibold" onClick={handleConfirm}>Add to Cart</button>
          <button className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white px-6 py-2 rounded font-semibold" onClick={onClose}>Cancel</button>
        </div>
        {showToast && (
          <div style={{position:'fixed',bottom:40,left:'50%',transform:'translateX(-50%)',background:'#E13939',color:'#fff',padding:'12px 24px',borderRadius:'8px',zIndex:9999}}>
            Please select both size and color before adding to cart.
          </div>
        )}
      </div>
    </div>
  );
}
