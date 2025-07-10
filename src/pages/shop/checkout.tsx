import { Link } from "react-router-dom";
import NavbarOne from "../../components/navbar/navbar-one";

import bg from '../../assets/img/shortcode/breadcumb.jpg'
import cart1 from '../../assets/img/gallery/cart/cart-01.jpg'
import cart2 from '../../assets/img/gallery/cart/cart-02.jpg'
import cart3 from '../../assets/img/gallery/cart/cart-03.jpg'

import React, { useEffect, useState } from "react";
import FooterTwo from "../../components/footer/footer-two";
import ScrollToTop from "../../components/scroll-to-top";
import Aos from "aos";
import { useNavigate } from 'react-router-dom';
import { useCartWishlist } from '../../context/CartWishlistContext';
import { colorHexToName } from '../../data/data';

// Razorpay global declaration for TypeScript
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Checkout() {

    const [open, setOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const { state: { cart }, getCartTotal } = useCartWishlist();
    const [shipping, setShipping] = useState<'free' | 'fast' | 'pickup'>('free');
    const [coupon, setCoupon] = useState<number>(0); // Placeholder for coupon logic
    const shippingCost = shipping === 'free' ? 0 : shipping === 'fast' ? 10 : 15;
    const subtotal = getCartTotal();
    const total = subtotal + shippingCost - coupon;

    // Billing form state
    interface BillingForm {
        fullName: string;
        email: string;
        phone: string;
        city: string;
        state: string;
        zip: string;
        address1: string;
        address2: string;
        message: string;
    }
    const [form, setForm] = useState<BillingForm>({
        fullName: '',
        email: '',
        phone: '',
        city: '',
        state: '',
        zip: '',
        address1: '',
        address2: '',
        message: '',
    });
    const [touched, setTouched] = useState<{[k: string]: boolean}>({});
    const [submitAttempted, setSubmitAttempted] = useState(false);
    const [errors, setErrors] = useState<{[k: string]: string}>({});
    const [paymentMethod, setPaymentMethod] = useState<'cod' | 'razorpay'>('cod');
    const [isPaying, setIsPaying] = useState(false);

    // Validation logic
    function validate(form: BillingForm) {
        const errs: {[k: string]: string} = {};
        if (!form.fullName.trim()) errs.fullName = 'Full Name is required.';
        if (!form.email.trim()) errs.email = 'Email is required.';
        else if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Invalid email format.';
        if (!form.phone.trim()) errs.phone = 'Phone No. is required.';
        if (!form.city.trim()) errs.city = 'Town/City is required.';
        if (!form.state.trim()) errs.state = 'State is required.';
        if (!form.zip.trim()) errs.zip = 'Zip Code is required.';
        if (!form.address1.trim()) errs.address1 = 'Address Line 1 is required.';
        return errs;
    }

    useEffect(() => {
        setErrors(validate(form));
    }, [form]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        setForm(f => ({ ...f, [name]: value }));
    }
    function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setTouched(t => ({ ...t, [e.target.name]: true }));
    }
    function handleContinue(e: React.FormEvent) {
        e.preventDefault();
        setSubmitAttempted(true);
        const errs = validate(form);
        setErrors(errs);
        if (Object.keys(errs).length === 0) {
            if (paymentMethod === 'razorpay') {
                setIsPaying(true);
                // Load Razorpay script if not already loaded
                if (!window.Razorpay) {
                    const script = document.createElement('script');
                    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
                    script.async = true;
                    script.onload = openRazorpay;
                    document.body.appendChild(script);
                } else {
                    openRazorpay();
                }
            } else {
                navigate('/payment-success');
            }
        }
    }

    function openRazorpay() {
        const options = {
            key: 'rzp_test_Nw21d3bmFaOOK5',
            amount: total * 100, // in paise
            currency: 'INR',
            name: 'Ecommerce Checkout',
            description: 'Order Payment',
            handler: function (response: any) {
                setIsPaying(false);
                navigate('/payment-success');
            },
            prefill: {
                name: form.fullName,
                email: form.email,
                contact: form.phone,
            },
            theme: {
                color: '#3399cc'
            },
            modal: {
                ondismiss: function() {
                    setIsPaying(false);
                }
            }
        };
        const rzp = new (window as any).Razorpay(options);
        rzp.open();
    }

    useEffect(()=>{
        Aos.init()
    })
  return (
    <>
        <NavbarOne/>  

        <div className="flex items-center gap-4 flex-wrap bg-overlay p-14 sm:p-16 before:bg-title before:bg-opacity-70" style={{backgroundImage:`url(${bg})`}}>
            <div className="text-center w-full">
                <h2 className="text-white text-8 md:text-[40px] font-normal leading-none text-center">Checkout</h2>
                <ul className="flex items-center justify-center gap-[10px] text-base md:text-lg leading-none font-normal text-white mt-3 md:mt-4 flex-wrap">
                    <li><Link to="/">Home</Link></li>
                    <li>/</li>
                    <li className="text-primary">Checkout</li>
                </ul>
            </div>
        </div>

        <div className="s-py-100">
            <div className="container">
            <div className="max-w-[1220px] mx-auto grid lg:grid-cols-2 gap-[30px] lg:gap-[70px]">
                {/* LEFT COLUMN: Billing Info & Coupon */}
                <div className="bg-[#FAFAFA] dark:bg-dark-secondary p-[30px] md:p-[40px] lg:p-[50px] border border-[#17243026] border-opacity-15 rounded-xl" data-aos="fade-up" data-aos-delay="100">
                    <form onSubmit={handleContinue}>
                        <p className='mb-5 w-full bg-white dark:bg-dark-secondary border border-[#E3E5E6] text-title dark:text-white focus:border-primary p-4 outline-none duration-300 whitespace-normal'>Are you missing your coupon code ? 
                        <button className='ml-1 add-coupon-code underline text-[#209A60]' type="button" onClick={()=>setOpen(!open)}> Click here to add</button>
                        </p>
                        <div className={`coupon-wrapper gap-3 flex mb-[30px] ${open ? '' : 'hidden'}`}>
                            <input className="max-w-[220px] w-full h-12 md:h-14 bg-white dark:bg-dark-secondary border border-[#E3E5E6] text-title dark:text-white focus:border-primary p-4 outline-none duration-300" type="text" placeholder="Coupon code"/>
                            <Link to="#" className="btn btn-sm-px btn-theme-solid " data-text="Apply coupon"><span>Apply coupon</span></Link>
                        </div>
                        <h4 className="font-semibold leading-none text-xl md:text-2xl mb-6 md:mb-[30px]">Billing Information</h4>
                        <div className="grid gap-5 md:gap-6">
                            <div>
                                <label className="text-base md:text-lg text-title dark:text-white leading-none mb-2 sm:mb-3 block">Full Name</label>
                                <input className="w-full h-12 md:h-14 bg-white dark:bg-dark-secondary border border-[#E3E5E6] text-title dark:text-white focus:border-primary p-4 outline-none duration-300" type="text" name="fullName" value={form.fullName} onChange={handleChange} onBlur={handleBlur} placeholder="Enter your full name"/>
                                {(touched.fullName || submitAttempted) && errors.fullName && <div className="text-red-500 text-xs mt-1">{errors.fullName}</div>}
                            </div>
                            <div>
                                <label className="text-base md:text-lg text-title dark:text-white leading-none mb-2 sm:mb-3 block">Email</label>
                                <input className="w-full h-12 md:h-14 bg-white dark:bg-dark-secondary border border-[#E3E5E6] text-title dark:text-white focus:border-primary p-4 outline-none duration-300" type="email" name="email" value={form.email} onChange={handleChange} onBlur={handleBlur} placeholder="Enter your email address"/>
                                {(touched.email || submitAttempted) && errors.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
                            </div>
                            <div>
                                <label className="text-base md:text-lg text-title dark:text-white leading-none mb-2 sm:mb-3 block">Phone No.</label>
                                <input className="w-full h-12 md:h-14 bg-white dark:bg-dark-secondary border border-[#E3E5E6] text-title dark:text-white focus:border-primary p-4 outline-none duration-300" type="number" name="phone" value={form.phone} onChange={handleChange} onBlur={handleBlur} placeholder="Type your phone number" />
                                {(touched.phone || submitAttempted) && errors.phone && <div className="text-red-500 text-xs mt-1">{errors.phone}</div>}
                            </div>
                            <div className="grid md:grid-cols-2 gap-5 md:gap-6">
                            <div>
                                <label className="text-base md:text-lg text-title dark:text-white leading-none mb-2 sm:mb-3 block">Town / City</label>
                                <input className="w-full h-12 md:h-14 bg-white dark:bg-dark-secondary border border-[#E3E5E6] text-title dark:text-white focus:border-primary p-4 outline-none duration-300" type="text" name="city" value={form.city} onChange={handleChange} onBlur={handleBlur} placeholder="Town / City" />
                                {(touched.city || submitAttempted) && errors.city && <div className="text-red-500 text-xs mt-1">{errors.city}</div>}
                            </div>
                            <div>
                                <label className="text-base md:text-lg text-title dark:text-white leading-none mb-2 sm:mb-3 block">State</label>
                                <input className="w-full h-12 md:h-14 bg-white dark:bg-dark-secondary border border-[#E3E5E6] text-title dark:text-white focus:border-primary p-4 outline-none duration-300" type="text" name="state" value={form.state} onChange={handleChange} onBlur={handleBlur} placeholder="State" />
                                {(touched.state || submitAttempted) && errors.state && <div className="text-red-500 text-xs mt-1">{errors.state}</div>}
                            </div>
                            </div>
                            <div>
                                <label className="text-base md:text-lg text-title dark:text-white leading-none mb-2 sm:mb-3 block">Zip Code</label>
                                <input className="w-full h-12 md:h-14 bg-white dark:bg-dark-secondary border border-[#E3E5E6] text-title dark:text-white focus:border-primary p-4 outline-none duration-300" type="text" name="zip" value={form.zip} onChange={handleChange} onBlur={handleBlur} placeholder="1217"/>
                                {(touched.zip || submitAttempted) && errors.zip && <div className="text-red-500 text-xs mt-1">{errors.zip}</div>}
                            </div>
                            <div>
                                <label className="text-base md:text-lg text-title dark:text-white leading-none mb-2 sm:mb-3 block">Address Line 1</label>
                                <input className="w-full h-12 md:h-14 bg-white dark:bg-dark-secondary border border-[#E3E5E6] text-title dark:text-white focus:border-primary p-4 outline-none duration-300" type="text" name="address1" value={form.address1} onChange={handleChange} onBlur={handleBlur} placeholder="Your full address"/>
                                {(touched.address1 || submitAttempted) && errors.address1 && <div className="text-red-500 text-xs mt-1">{errors.address1}</div>}
                            </div>
                            <div>
                                <label className="text-base md:text-lg text-title dark:text-white leading-none mb-2 sm:mb-3 block">Address Line 2</label>
                                <input className="w-full h-12 md:h-14 bg-white dark:bg-dark-secondary border border-[#E3E5E6] text-title dark:text-white focus:border-primary p-4 outline-none duration-300" type="text" name="address2" value={form.address2} onChange={handleChange} onBlur={handleBlur} placeholder="Your full address"/>
                            </div>
                            <div>
                                <label className="text-base md:text-lg text-title dark:text-white leading-none mb-2 sm:mb-3 block">Additional Text</label>
                                <textarea className="w-full h-[120px] bg-white dark:bg-dark-secondary border border-[#E3E5E6] text-title dark:text-white focus:border-primary p-4 outline-none duration-300" name="message" value={form.message} onChange={handleChange} onBlur={handleBlur} placeholder="Type your message"></textarea>
                            </div>
                        </div>
                    </form>
                </div>
                {/* RIGHT COLUMN: Product Info, Shipping, Payment, Summary, Buttons */}
                <div>
                    <div className="bg-[#FAFAFA] dark:bg-dark-secondary pt-[30px] md:pt-[40px] lg:pt-[50px] px-[30px] md:px-[40px] lg:px-[50px] pb-[30px] border border-[#17243026] border-opacity-15 rounded-xl" data-aos="fade-up" data-aos-delay="100">   
                        <h4 className="font-semibold leading-none text-xl md:text-2xl mb-6 md:mb-10">
                            Product Information
                        </h4>
                        <div className="grid gap-5 mg:gap-6">
                            {cart.length === 0 ? (
                                <React.Fragment>
                                    <div className="text-center text-lg text-title dark:text-white">Your cart is empty.</div>
                                </React.Fragment>
                            ) : (
                                cart.map((item, idx) => (
                                    <div key={item.id} className="flex items-center gap-4 mb-4">
                                        <img src={item.image} alt={item.name} className="w-12 h-12 object-contain rounded" />
                                        <div className="flex-1">
                                            <div className="font-medium">{item.name}</div>
                                            <div className="text-xs text-gray-500 dark:text-gray-300">
                                                Size: <span className="font-medium">{item.size || '-'}</span> | Color: <span className="font-medium">{colorHexToName[String(item.color)] || item.color || '-'}</span>
                                            </div>
                                            <div className="text-sm">Qty: {item.quantity}</div>
                                        </div>
                                        <div className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</div>
                                    </div>
                                ))
                            )}
                        </div>
                        <div className="mt-6 pt-6 border-t border-bdr-clr dark:border-bdr-clr-drk text-right flex justify-end flex-col w-full ml-auto mr-0">
                            <div className="flex justify-between flex-wrap text-base sm:text-lg text-title dark:text-white font-medium">
                                <span>Sub Total:</span>
                                <span>₹{subtotal}</span>
                            </div>
                            <div className="flex justify-between flex-wrap text-base sm:text-lg text-title dark:text-white font-medium mt-3">
                                <span>Coupon Discount:</span>
                                <span>-₹{coupon}</span>
                            </div>
                        </div>
                        <div className="mt-6 pt-6 border-t border-bdr-clr dark:border-bdr-clr-drk">
                            <div className="flex justify-between flex-wrap text-base sm:text-lg text-title dark:text-white font-medium mt-3">
                                <div>
                                    <label className="flex items-center gap-[10px] categoryies-iteem">
                                        <input className="appearance-none" type="radio" name="shipping-type" checked={shipping === 'free'} onChange={() => setShipping('free')} />
                                        <span className="w-4 h-4 rounded-full border border-title dark:border-white flex items-center justify-center duration-300">
                                            {shipping === 'free' && (
                                                <svg className="duration-300" width="8" height="8" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect width="10" height="10" rx="5" fill="#BB976D"/>
                                                </svg>
                                            )}
                                        </span>
                                        <span className="sm:text-lg text-title dark:text-white block sm:leading-none transform translate-y-[3px] select-none">Free Shipping:</span>
                                    </label>
                                </div>
                                <span> ₹0</span>
                            </div>
                            <div className="flex justify-between flex-wrap text-base sm:text-lg text-title dark:text-white font-medium mt-3">
                                <div>
                                    <label className="flex items-center gap-[10px] categoryies-iteem">
                                        <input className="appearance-none" type="radio" name="shipping-type" checked={shipping === 'fast'} onChange={() => setShipping('fast')} />
                                        <span className="w-4 h-4 rounded-full border border-title dark:border-white flex items-center justify-center duration-300">
                                            {shipping === 'fast' && (
                                                <svg className="duration-300" width="8" height="8" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect width="10" height="10" rx="5" fill="#BB976D"/>
                                                </svg>
                                            )}
                                        </span>
                                        <span className="sm:text-lg text-title dark:text-white block sm:leading-none transform translate-y-[3px] select-none">Fast Shipping:</span>
                                    </label>
                                </div>
                                <span>₹100</span>
                            </div>
                            <div className="flex justify-between flex-wrap text-base sm:text-lg text-title dark:text-white font-medium mt-3">
                                <div>
                                    <label className="flex items-center gap-[10px] categoryies-iteem">
                                        <input className="appearance-none" type="radio" name="shipping-type" checked={shipping === 'pickup'} onChange={() => setShipping('pickup')} />
                                        <span className="w-4 h-4 rounded-full border border-title dark:border-white flex items-center justify-center duration-300">
                                            {shipping === 'pickup' && (
                                                <svg className="duration-300" width="8" height="8" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect width="10" height="10" rx="5" fill="#BB976D"/>
                                                </svg>
                                            )}
                                        </span>
                                        <span className="sm:text-lg text-title dark:text-white block sm:leading-none transform translate-y-[3px] select-none"> Local Pickup(Traxo):</span>
                                    </label>
                                </div>
                                <span>₹150</span>
                            </div>
                        </div>
                        <div className="mt-6 pt-6 border-t border-bdr-clr dark:border-bdr-clr-drk">
                            <div className="flex justify-between flex-wrap font-semibold leading-none text-2xl md:text-3xl">
                                <span>Total:</span>
                                <span>&nbsp;₹{total}</span>
                            </div>
                        </div>
                        <div className="mt-7 md:mt-12" data-aos="fade-up" data-aos-delay="200">
                            <h4 className="font-semibold leading-none text-xl md:text-2xl mb-6 md:mb-10">Payment Method</h4>
                            <div className="flex gap-5 sm:gap-8 md:gap-12 flex-wrap">
                                <div>
                                    <label className="flex items-center gap-[10px] categoryies-iteem">
                                        <input className="appearance-none" type="radio" name="payment-method" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} />
                                        <span className="w-4 h-4 rounded-full border border-title dark:border-white flex items-center justify-center duration-300">
                                            {paymentMethod === 'cod' && (
                                                <svg className="duration-300" width="8" height="8" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect width="10" height="10" rx="5" fill="#BB976D"/>
                                                </svg>
                                            )}
                                        </span>
                                        <span className="sm:text-lg text-title dark:text-white block sm:leading-none transform translate-y-[3px] select-none">Cash On Delivery</span>
                                    </label>
                                    <p className="ml-6 text-[15px] leading-none mt-2">Time ( 07 - 10 ) Days</p>
                                </div>
                                <div>
                                    <label className="flex items-center gap-[10px] categoryies-iteem">
                                        <input className="appearance-none" type="radio" name="payment-method" checked={paymentMethod === 'razorpay'} onChange={() => setPaymentMethod('razorpay')} />
                                        <span className="w-4 h-4 rounded-full border border-title dark:border-white flex items-center justify-center duration-300">
                                            {paymentMethod === 'razorpay' && (
                                                <svg className="duration-300" width="8" height="8" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect width="10" height="10" rx="5" fill="#BB976D"/>
                                                </svg>
                                            )}
                                        </span>
                                        <span className="sm:text-lg text-title dark:text-white block sm:leading-none transform translate-y-[3px] select-none">Razorpay</span>
                                    </label>
                                    <p className="ml-6 text-[15px] leading-none mt-2">Pay securely via Razorpay</p>
                                </div>
                            </div>
                        </div>
                        {/* Action Buttons at the bottom of right column */}
                        <div className="mt-8 flex flex-wrap gap-3">
                            <button
                                className="btn btn-outline"
                                data-text="Back to Cart"
                                type="button"
                                onClick={() => navigate('/cart')}
                            >
                                <span>Back to Cart</span>
                            </button>
                            <button
                                className="btn btn-solid w-full mt-6"
                                data-text="Continue"
                                type="button"
                                disabled={isPaying}
                                onClick={handleContinue}
                            >
                                <span>{isPaying ? 'Processing...' : 'Continue'}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>

        <FooterTwo/>

        <ScrollToTop/>
    
    </>
  )
}
