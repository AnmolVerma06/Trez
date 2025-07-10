import { GoStarFill } from 'react-icons/go'
import { LuEye, LuHeart } from 'react-icons/lu'
import { RiShoppingBag2Line } from 'react-icons/ri'
import { Link, useNavigate } from 'react-router-dom'
import { useCartWishlist } from '../../context/CartWishlistContext'
import React, { useRef, useState, useEffect } from 'react';
import { productList, productTag } from '../../data/data';
import DetailTab from './detail-tab';

interface Item{
    id: number;
    image: string;
    tag: string;
    price: number | string;
    name: string;
    category?: string;
    type?: string;
    brand?: string;
}

function AddToCartModal({ product, onClose, onConfirm }: { product: any, onClose: () => void, onConfirm: (size: string, color: string) => void }) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const toastTimeout = useRef<NodeJS.Timeout | null>(null);

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

export default function LayoutOne({ item }: { item: Item }) {
  const { 
    addToCart, 
    addToWishlist, 
    removeFromWishlist, 
    isInCart, 
    isInWishlist 
  } = useCartWishlist();

  const [showQuickView, setShowQuickView] = React.useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [showAddToCartModal, setShowAddToCartModal] = React.useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const toastTimeout = useRef<NodeJS.Timeout | null>(null);
  const [activeImage, setActiveImage] = useState<number>(1);
  const [timer, setTimer] = useState(7200); // 2 hours in seconds

  // Get full product details for modal
  const product = productList.find((p) => p.id === item.id);

  useEffect(() => {
    if (!showQuickView) return;
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [showQuickView, timer]);

  function formatTimer(secs: number) {
    const d = Math.floor(secs / 86400);
    const h = Math.floor((secs % 86400) / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return { d, h, m, s };
  }
  const { d, h, m, s } = formatTimer(timer);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowAddToCartModal(true);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isInWishlist(item.id)) {
      removeFromWishlist(item.id);
    } else {
      const price = typeof item.price === 'number' ? item.price : parseFloat(item.price.replace(/[^\d.]/g, ''));
      addToWishlist({
        id: item.id,
        name: item.name,
        price: price,
        image: item.image,
        category: item.category,
        type: item.type,
        brand: item.brand
      });
    }
  };

  // Close modal on outside click
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowQuickView(false);
      }
    }
    if (showQuickView) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showQuickView]);

  return (
    <>
      {/* Product Card */}
      <div className="group">
            <div className="relative overflow-hidden">
                <Link to={`/product-details/${item.id}`}>
                    <img className="w-full transform group-hover:scale-110 duration-300" src={item.image} alt="shop"/>
                </Link>
                {item.tag === 'Hot Sale' &&
                    <div className="absolute z-10 top-7 left-7 pt-[10px] pb-2 px-3 bg-[#1CB28E] rounded-[30px] font-primary text-[14px] text-white font-semibold leading-none">
                        Hot Sale
                    </div>
                }
                {item.tag === 'NEW' &&
                    <div className="absolute z-10 top-7 left-7 pt-[10px] pb-2 px-3 bg-[#9739E1] rounded-[30px] font-primary text-[14px] text-white font-semibold leading-none">
                        NEW
                    </div>
                }
                {item.tag === '10% OFF' &&
                    <div className="absolute z-10 top-7 left-7 pt-[10px] pb-2 px-3 bg-[#E13939] rounded-[30px] font-primary text-[14px] text-white font-semibold leading-none">
                        10% OFF
                    </div>
                }
                <div className="absolute z-10 top-[50%] right-3 transform -translate-y-[40%] opacity-0 duration-300 transition-all group-hover:-translate-y-1/2 group-hover:opacity-100 flex flex-col items-end gap-3">
                    <button 
                        onClick={handleWishlistToggle}
                        className={`bg-white dark:bg-title dark:text-white bg-opacity-80 flex items-center justify-center gap-2 px-4 py-[10px] text-base leading-none text-title rounded-[40px] h-14 overflow-hidden new-product-icon ${isInWishlist(item.id) ? 'bg-red-100 dark:bg-red-900' : ''}`}
                    >
                        <LuHeart className={`dark:text-white h-[22px] w-[20px] ${isInWishlist(item.id) ? 'text-red-500' : ''}`}/>                                                                      
                        <span className="mt-1">{isInWishlist(item.id) ? 'Remove from wishlist' : 'Add to wishlist'}</span>
                    </button>
                    <button 
                        onClick={handleAddToCart}
                        className={`bg-white dark:bg-title dark:text-white bg-opacity-80 flex items-center justify-center gap-2 px-4 py-[10px] text-base leading-none text-title rounded-[40px] h-14 overflow-hidden new-product-icon ${isInCart(item.id) ? 'bg-green-100 dark:bg-green-900' : ''}`}
                    >
                        <RiShoppingBag2Line className="dark:text-white h-[22px] w-[20px]"/>  
                        <span className="mt-1">{isInCart(item.id) ? 'In Cart' : 'Add to Cart'}</span>
                    </button>
                    <button className="bg-white dark:bg-title dark:text-white bg-opacity-80 flex items-center justify-center gap-2 px-4 py-[10px] text-base leading-none text-title rounded-[40px] h-14 overflow-hidden new-product-icon quick-view"
            onClick={() => setShowQuickView(true)}>
                        <LuEye className="dark:text-white h-[22px] w-[20px]"/>                                      
                        <span className="mt-1">Quick View</span>
                    </button>
                </div>
            </div>
            <div className="md:px-2 lg:px-4 xl:px-6 lg:pt-6 pt-5 flex gap-4 md:gap-5 flex-col">
                <h4 className="font-medium leading-none dark:text-white text-lg">₹{typeof item.price === 'number' ? item.price.toFixed(2) : item.price}</h4>
                <div>
                    <h5 className="font-normal dark:text-white text-xl leading-[1.5]">
                        <Link to={`/product-details/${item.id}`} className="text-underline">{item.name}</Link>
                    </h5>
                    <ul className="flex items-center gap-2 mt-1">
                        <li><GoStarFill className='text-yellow-500 size-4'/></li>
                        <li><GoStarFill className='text-yellow-500 size-4'/></li>
                        <li><GoStarFill className='text-yellow-500 size-4'/></li>
                        <li><GoStarFill className='text-yellow-500 size-4'/></li>
                        <li><GoStarFill className='text-slate-300 size-4'/></li>
                        <li className="dark:text-gray-100">( 1,230 )</li>
                    </ul>
                </div>
            </div>
        </div>
      {/* Quick View Modal */}
      {showQuickView && product && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40" style={{backdropFilter: 'blur(2px)'}}>
          <div ref={modalRef} className="relative bg-white dark:bg-title dark:text-white rounded-2xl shadow-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto flex flex-col md:flex-row">
            {/* Image Gallery */}
            <div className="md:w-1/2 w-full flex flex-col gap-4 p-6">
              <div className="relative">
                {product.images?.map((img: string, idx: number) => (
                  <div key={idx} className={activeImage === idx + 1 ? '' : 'hidden'}>
                    <img src={img} className="w-full rounded-xl object-cover h-[500px] md:h-[600px]" alt="product" />
                  </div>
                ))}
                <div className="flex gap-2 mt-2">
                  {product.images?.map((img: string, idx: number) => (
                    <img
                      key={idx}
                      src={img}
                      alt="product"
                      className={`w-14 h-14 object-cover rounded cursor-pointer border ${activeImage === idx + 1 ? 'border-primary' : 'border-gray-200'}`}
                      onClick={() => setActiveImage(idx + 1)}
                    />
                  ))}
                </div>
              </div>
            </div>
            {/* Details */}
            <div className="md:w-1/2 w-full p-6 flex flex-col gap-2">
              <button className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-black dark:text-gray-500 dark:hover:text-white" onClick={() => setShowQuickView(false)}>&times;</button>
              <div className="text-xs font-semibold text-gray-400 mb-1 uppercase dark:text-gray-300">{product.category || 'Product'}</div>
              <h2 className="text-2xl font-bold mb-1 dark:text-white">{product.name}</h2>
              <div className="flex gap-4 items-center mt-[15px] mb-2">
                <span className="text-lg sm:text-xl leading-none pb-[5px] text-title line-through pl-2 inline-block dark:text-white">₹{(product.price ? (product.price * 1.2).toFixed(2) : '0.00')}</span>
                <span className="text-2xl sm:text-3xl text-primary leading-none block">₹{product.price ?? '0.00'}</span>
              </div>
              <div className="mt-5 md:mt-7 flex items-center gap-4 flex-wrap">
                <h4 className="text-xl md:text-[22px] font-semibold !leading-none">Hurry Up!</h4>
                <div className="overflow-auto">
                  <div className="py-2 px-3 bg-[#FAF2F2] rounded-[51px] flex items-end gap-[6px] w-[360px]">
                    <svg className="w-[15px]" height="20" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.6923 7.59087C12.6383 7.52329 12.573 7.53657 12.5387 7.55036C12.51 7.562 12.4442 7.59919 12.4533 7.69239C12.4642 7.80431 12.4704 7.91841 12.4715 8.03157C12.4764 8.50102 12.2881 8.96094 11.9549 9.2934C11.6238 9.62371 11.1884 9.80168 10.7247 9.79652C10.0913 9.78844 9.56601 9.45809 9.20551 8.84118C8.90742 8.33106 9.03844 7.67313 9.17715 6.97654C9.25832 6.5688 9.34227 6.14716 9.34227 5.74588C9.34227 2.62132 7.24173 0.818669 5.98962 0.0222265C5.96373 0.00578123 5.93908 0 5.91724 0C5.88173 0 5.85361 0.0153124 5.83974 0.0246874C5.81287 0.0428905 5.76986 0.0843747 5.78369 0.157812C6.26228 2.69929 4.83478 4.22783 3.32346 5.84611C1.76566 7.51419 0 9.40485 0 12.8147C0 16.7767 3.22331 20 7.18532 20C10.4475 20 13.3237 17.7256 14.1796 14.4692C14.7633 12.2487 14.1517 9.42031 12.6923 7.59087ZM7.36458 18.4663C6.37247 18.5115 5.42896 18.1557 4.7083 17.4667C3.99537 16.7849 3.58647 15.8336 3.58647 14.8565C3.58647 13.0228 4.28756 11.6768 6.17326 9.88973C6.20412 9.86047 6.23572 9.85121 6.26326 9.85121C6.28822 9.85121 6.30986 9.85883 6.32474 9.86598C6.35611 9.88109 6.40767 9.91852 6.40072 9.99945C6.33329 10.784 6.33447 11.4352 6.40415 11.9351C6.58228 13.2118 7.51692 14.0697 8.73 14.0697C9.32477 14.0697 9.89129 13.8458 10.3252 13.4394C10.3756 13.3922 10.4318 13.3982 10.4534 13.4028C10.4819 13.409 10.5202 13.4265 10.5402 13.4748C10.7202 13.9092 10.8121 14.3703 10.8135 14.8453C10.8193 16.7564 9.27207 18.3808 7.36458 18.4663Z" fill="#E13939"/>
                    </svg>
                    <h6 className="text-lg font-medium leading-none !text-[#E13939] whitespace-nowrap">Sale Ends :</h6>
                    <div className="countdown-clock flex gap-[10px] items-center">
                      <div className="countdown-item flex">
                        <div className="ci-inner text-lg font-medium leading-none text-[#E13939]">
                          <div className="clock-days ci-value">{d.toString().padStart(2, '0')}</div>
                        </div>
                        <p className="text-lg font-medium leading-none text-[#E13939]">D</p>
                      </div>
                      <p className="text-lg font-medium leading-none text-[#E13939]">:</p>
                      <div className="countdown-item flex">
                        <div className="ci-inner text-lg font-medium leading-none text-[#E13939]">
                          <div className="clock-hours ci-value">{h.toString().padStart(2, '0')}</div>
                        </div>
                        <p className="text-lg font-medium leading-none text-[#E13939]">H</p>
                      </div>
                      <p className="text-lg font-medium leading-none text-[#E13939]">:</p>
                      <div className="countdown-item flex">
                        <div className="ci-inner text-lg font-medium leading-none text-[#E13939]">
                          <div className="clock-minutes ci-value">{m.toString().padStart(2, '0')}</div>
                        </div>
                        <p className="text-lg font-medium leading-none text-[#E13939]">M</p>
                      </div>
                      <p className="text-lg font-medium leading-none text-[#E13939]">:</p>
                      <div className="countdown-item flex">
                        <div className="ci-inner text-lg font-medium leading-none text-[#E13939]">
                          <div className="clock-seconds ci-value">{s.toString().padStart(2, '0')}</div>
                        </div>
                        <p className="text-lg font-medium leading-none text-[#E13939]">S</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="sm:text-lg mt-5 md:mt-7 text-gray-700 dark:text-gray-200">{product.description}</p>
              {/* Size and Color Selection */}
              <div className="flex gap-x-12 lg:gap-x-24 gap-y-3 flex-wrap mt-5 sm:mt-10">
                <div className="flex gap-[10px] items-center">
                  <h6 className="leading-none font-medium">Size :</h6>
                  <div className="flex gap-[10px]">
                    {product.sizes?.map((size: string) => (
                      <label className="product-size" htmlFor={`quickview-size-${size}`} key={size}>
                        <input id={`quickview-size-${size}`} className="appearance-none hidden" type="radio" name="quickview-size" title={`Size ${size}`} placeholder={size} checked={selectedSize === size} onChange={() => setSelectedSize(size)} />
                        <span className="w-6 h-6 flex items-center justify-center pt-[2px] text-sm leading-none bg-[#E8E9EA] dark:bg-dark-secondary text-title dark:text-white duration-300">{size}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex gap-[10px] items-center">
                  <h6 className="leading-none font-medium">Color :</h6>
                  <div className="flex gap-[10px] items-center">
                    {product.colors?.map((color: string, idx: number) => (
                      <label className="product-color" htmlFor={`quickview-color-${idx}`} key={color} style={{cursor: 'pointer'}}>
                        <input
                          id={`quickview-color-${idx}`}
                          className="appearance-none hidden"
                          type="radio"
                          name="quickview-color"
                          title={color}
                          placeholder={color}
                          checked={selectedColor === color}
                          onChange={() => setSelectedColor(color)}
                        />
                        <span
                          className={`border flex rounded-full duration-300 p-1 ${selectedColor === color ? 'ring-2 ring-offset-2 ring-[#E13939]' : ''}`}
                          style={{
                            borderColor: '#888',
                            boxShadow: selectedColor === color ? '0 0 0 2px #E13939' : 'none',
                            transition: 'box-shadow 0.2s',
                          }}
                        >
                          <span
                            className="w-4 h-4 rounded-full flex"
                            style={{ backgroundColor: color, border: '1px solid #888' }}
                          ></span>
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              {/* Add to Cart and Wishlist */}
              <div className="flex gap-4 mt-4 sm:mt-6">
                <button
                  className="btn btn-solid"
                  data-text="Add to Cart"
                  onClick={() => {
                    if (!selectedSize || !selectedColor) {
                      setShowToast(true);
                      if (toastTimeout.current) clearTimeout(toastTimeout.current);
                      toastTimeout.current = setTimeout(() => setShowToast(false), 2000);
                      return;
                    }
                    addToCart({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                      category: product.category,
                      type: product.type,
                      brand: product.brand,
                      size: selectedSize,
                      color: selectedColor,
                    });
                    setShowQuickView(false);
                  }}
                >
                  <span>Add to Cart</span>
                </button>
                <button className="btn btn-outline" data-text="Add to Wishlist">
                  <span>Add to Wishlist</span>
                </button>
              </div>
              {/* Tags */}
              <div className="py-4 sm:py-6 border-b border-bdr-clr dark:border-bdr-clr-drk mt-4">
                <h4 className="font-medium leading-none">Tags :</h4>
                <div className="flex flex-wrap gap-[10px] md:gap-[15px] mt-5 md:mt-6">
                  {product.tags?.map((item: string, index: number) => (
                    <span className="btn btn-theme-outline btn-xs" key={index}><span>{item}</span></span>
                  ))}
                </div>
              </div>
              {/* Vendor and SKU */}
              <div className="flex gap-x-12 gap-y-3 flex-wrap mt-4">
                <h6 className="leading-none font-medium">SKU : CH_00{product.id}</h6>
                <h6 className="leading-none font-medium">Category : {product.category}</h6>
              </div>
              {/* Reviews and Details Tab (optional, can be added if modal is tall enough) */}
              {/* <DetailTab productId={product.id} /> */}
              {showToast && (
                <div style={{position:'fixed',bottom:40,left:'50%',transform:'translateX(-50%)',background:'#E13939',color:'#fff',padding:'12px 24px',borderRadius:'8px',zIndex:9999}}>
                  Please select both size and color before adding to cart.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {/* AddToCart Modal */}
      {showAddToCartModal && product && (
        <AddToCartModal
          product={product}
          onClose={() => setShowAddToCartModal(false)}
          onConfirm={(size, color) => {
            const price = typeof item.price === 'number' ? item.price : parseFloat(item.price.replace(/[^\d.]/g, ''));
            addToCart({
              id: item.id,
              name: item.name,
              price: price,
              image: item.image,
              category: item.category,
              type: item.type,
              brand: item.brand,
              size,
              color
            });
          }}
        />
      )}
    </>
  )
}
