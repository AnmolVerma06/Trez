import { Link } from "react-router-dom";
import { useEffect } from "react";

import NavbarOne from "../../components/navbar/navbar-one";
import FooterTwo from "../../components/footer/footer-two";
import ScrollToTop from "../../components/scroll-to-top";
import { useCartWishlist } from "../../context/CartWishlistContext";
import { colorHexToName } from '../../data/data';

import bg from '../../assets/img/shortcode/breadcumb.jpg'
import Aos from "aos";

export default function Cart() {
    const { state, removeFromCart, updateQuantity, getCartTotal } = useCartWishlist();
    const { cart } = state;

    useEffect(()=>{
        Aos.init()
    },[])

    const handleQuantityChange = (id: number, newQuantity: number, size?: string, color?: string) => {
        updateQuantity(id, newQuantity, size, color);
    };

    const handleRemoveItem = (id: number, size?: string, color?: string) => {
        removeFromCart(id, size, color);
    };

    const cartTotal = getCartTotal();
    const shipping = cartTotal > 100 ? 0 : 10; // Free shipping over ₹100
    const finalTotal = cartTotal + shipping;

    return (
    <>
        <NavbarOne/>  

        <div className="flex items-center gap-4 flex-wrap bg-overlay p-14 sm:p-16 before:bg-title before:bg-opacity-70" style={{backgroundImage:`url(${bg})`}}>
            <div className="text-center w-full">
                <h2 className="text-white text-8 md:text-[40px] font-normal leading-none text-center">Cart</h2>
                <ul className="flex items-center justify-center gap-[10px] text-base md:text-lg leading-none font-normal text-white mt-3 md:mt-4">
                    <li><Link to="/">Home</Link></li>
                    <li>/</li>
                    <li className="text-primary">Cart</li>
                </ul>
            </div>
        </div>

        <div className="s-py-100">
            <div className="container ">
                {cart.length === 0 ? (
                    <div className="text-center py-20" data-aos="fade-up">
                        <h3 className="text-2xl font-semibold text-title dark:text-white mb-4">Your cart is empty</h3>
                        <p className="text-paragraph dark:text-white mb-8">Looks like you haven't added any items to your cart yet.</p>
                        <Link to="/shop" className="btn btn-solid" data-text="Continue Shopping">
                            <span>Continue Shopping</span>
                        </Link>
                    </div>
                ) : (
                    <div className="flex xl:flex-row flex-col gap-[30px] lg:gap-[30px] xl:gap-[70px]">
                        <div className="flex-1 overflow-x-auto" data-aos="fade-up" data-aos-delay="100">
                            <div style={{ maxHeight: '350px', overflowY: 'auto' }}>
                                <table id="cart-table" className="responsive nowrap table-wrapper" style={{width:'100%'}}>
                                    <thead className="table-header">
                                        <tr>
                                            <th className="text-lg md:text-xl font-semibold leading-none text-title dark:text-white">Product Info</th>
                                            <th className="text-lg md:text-xl font-semibold leading-none text-title dark:text-white">Price</th>
                                            <th className="text-lg md:text-xl font-semibold leading-none text-title dark:text-white">Quantity</th>
                                            <th className="text-lg md:text-xl font-semibold leading-none text-title dark:text-white">Total</th>
                                            <th className="text-lg md:text-xl font-semibold leading-none text-title dark:text-white">Remove</th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-body">
                                        {cart.map((item) => (
                                            <tr key={`${item.id}-${item.size}-${item.color}`} className="">
                                                <td className="md:w-[42%]">
                                                    <div className="flex items-center gap-3 md:gap-4 lg:gap-6 cart-product my-4">
                                                        <div className="w-12 h-12 sm:w-16 sm:h-16 flex-none">
                                                            <img src={item.image} alt={item.name} className="w-full h-full object-contain rounded"/>
                                                        </div>
                                                        <div className="flex-1">
                                                            <h6 className="leading-none font-medium">{item.category || 'Product'}</h6>
                                                            <h5 className="font-semibold leading-none mt-2"><Link to="/error">{item.name}</Link></h5>
                                                            {/* Show size and color */}
                                                            <div className="text-sm mt-1">
                                                                Size: <span className="font-medium">{item.size || '-'}</span> <br/>
                                                                Color: <span className="font-medium">{colorHexToName[String(item.color)] || item.color || '-'}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <h6 className="text-base md:text-lg leading-none text-title dark:text-white font-semibold">₹{item.price.toFixed(2)}</h6>
                                                </td>
                                                <td>
                                                    <div className="flex items-center gap-2">
                                                        <button 
                                                            onClick={() => handleQuantityChange(item.id, item.quantity - 1, item.size, item.color)}
                                                            className="w-8 h-8 bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded"
                                                            aria-label="Decrease quantity"
                                                        >
                                                            -
                                                        </button>
                                                        <span className="w-12 text-center">{item.quantity}</span>
                                                        <button 
                                                            onClick={() => handleQuantityChange(item.id, item.quantity + 1, item.size, item.color)}
                                                            className="w-8 h-8 bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded"
                                                            aria-label="Increase quantity"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </td>
                                                <td>
                                                    <h6 className="text-base md:text-lg leading-none text-title dark:text-white font-semibold">₹{(item.price * item.quantity).toFixed(2)}</h6>
                                                </td>
                                                <td>
                                                    <button 
                                                        onClick={() => handleRemoveItem(item.id, item.size, item.color)}
                                                        className="w-8 h-8 bg-[#E8E9EA] dark:bg-dark-secondary flex items-center justify-center ml-auto duration-300 text-title dark:text-white hover:bg-red-500 hover:text-white"
                                                    >
                                                        <svg className="fill-current " width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M0.546875 1.70822L1.70481 0.550293L5.98646 4.83195L10.2681 0.550293L11.3991 1.6813L7.11746 5.96295L11.453 10.2985L10.295 11.4564L5.95953 7.12088L1.67788 11.4025L0.546875 10.2715L4.82853 5.98988L0.546875 1.70822Z"/>
                                                        </svg>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div data-aos="fade-up" data-aos-delay="300">
                            <div className="mb-[30px]">
                                <h4 className="text-lg md:text-xl font-semibold leading-none text-title dark:text-white mb-[15px]">
                                    Promo Code
                                </h4>
                                <div className="flex xs:flex-row flex-col gap-3">
                                    <input className="h-12 md:h-14 bg-snow dark:bg-dark-secondary border border-[#E3E5E6] text-title dark:text-white focus:border-primary p-4 outline-none duration-300 placeholder:text-title dark:placeholder:text-white flex-1" type="text" placeholder="Coupon Code"/>
                                    <button className="btn btn-solid" data-text="Apply">
                                        <span>Apply</span>
                                    </button>
                                </div>
                            </div>
                            <div className="bg-[#FAFAFA] dark:bg-dark-secondary pt-[30px] md:pt-[40px] px-[30px] md:px-[40px] pb-[30px] border border-[#17243026] border-opacity-15 rounded-xl">   
                                <div className="text-right flex justify-end flex-col w-full ml-auto mr-0">
                                    <div className="flex justify-between flex-wrap text-base sm:text-lg text-title dark:text-white font-medium">
                                        <span>Sub Total:</span>
                                        <span>₹{cartTotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between flex-wrap text-base sm:text-lg text-title dark:text-white font-medium mt-3">
                                        <span>Shipping:</span>
                                        <span>{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</span>
                                    </div>
                                </div>
                                <div className="mt-6 pt-6 border-t border-bdr-clr dark:border-bdr-clr-drk">
                                    <div className="flex justify-between flex-wrap text-base sm:text-lg text-title dark:text-white font-bold">
                                        <span>Total:</span>
                                        <span>₹{finalTotal.toFixed(2)}</span>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <Link to="/checkout" className="btn btn-solid w-full" data-text="Proceed to Checkout">
                                        <span>Proceed to Checkout</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>

        <FooterTwo/>

        <ScrollToTop/>
    </>
  )
}
