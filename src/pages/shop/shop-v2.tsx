/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import bg from '../../assets/img/shortcode/breadcumb.jpg'

import { productList } from '../../data/data'

import SelectOne from '../../components/product/select-one'
import NavbarOne from '../../components/navbar/navbar-one'
import LayoutOne from '../../components/product/layout-one'
import FooterTwo from '../../components/footer/footer-two'
import ScrollToTop from '../../components/scroll-to-top'

import MultiRangeSlider from "multi-range-slider-react";

import Aos from 'aos'

export default function ShopV2() {
    const location = useLocation();

    // Filter states
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedItemType, setSelectedItemType] = useState<string>("");
    const [selectedBrand, setSelectedBrand] = useState<string>("");
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(1000);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 6;
    const [searchQuery, setSearchQuery] = useState('');

    // For SelectOne brand dropdown
    const handleBrandChange = (brand: string) => {
        setSelectedBrand(brand);
    };

    // Category options (should match the UI labels)
    const categoryOptions = [
        "Oversized Tshirt",
        "Denim Jacket",
        "Womens Jacket",
        "Shirts",
        "Men's Tshirts",
        "Mens Jacket",
        "Womens Tshirts"
    ];
    // Item type options
    const itemTypeOptions = ["Regular", "Premium", "Vintage"];

    useEffect(()=>{
        Aos.init()
    },[])

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategories, selectedItemType, selectedBrand, minValue, maxValue]);

    // On mount or when location changes, set searchQuery from URL
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const search = params.get('search') || '';
        setSearchQuery(search);
    }, [location]);

    // Filtering logic
    const filteredProducts = productList.filter((item) => {
        // Search filter
        const searchMatch = !searchQuery ||
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.brand.toLowerCase().includes(searchQuery.toLowerCase());
        // Category filter (assume item.category exists, otherwise skip this filter)
        const categoryMatch = selectedCategories.length === 0 || (item.category && selectedCategories.includes(item.category));
        // Item type filter (assume item.type exists, otherwise skip this filter)
        const itemTypeMatch = !selectedItemType || (item.type && item.type === selectedItemType);
        // Brand filter (assume item.brand exists, otherwise skip this filter)
        const brandMatch = !selectedBrand || (item.brand && item.brand === selectedBrand);
        // item.price is always a number now
        const price = typeof item.price === 'number' ? item.price : 0;
        const priceMatch = price >= minValue && price <= maxValue;
        return searchMatch && categoryMatch && itemTypeMatch && brandMatch && priceMatch;
    });

    // Pagination logic
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const paginatedProducts = filteredProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

    // Handlers
    const handleCategoryChange = (category: string) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((c) => c !== category)
                : [...prev, category]
        );
    };
    const handleItemTypeChange = (type: string) => {
        // If the same type is clicked again, deselect it
        if (selectedItemType === type) {
            setSelectedItemType("");
        } else {
            setSelectedItemType(type);
        }
    };

    // Reset all filters
    const handleResetFilters = () => {
        setSelectedCategories([]);
        setSelectedItemType("");
        setSelectedBrand("");
        setMinValue(0);
        setMaxValue(1000);
        setCurrentPage(1);
    };

  return (
    <>
        <NavbarOne/>
        
        <div className="flex items-center gap-4 flex-wrap bg-overlay p-14 sm:p-16 before:bg-title before:bg-opacity-70" style={{backgroundImage:`url(${bg})`}}>
            <div className="text-center w-full">
                <h2 className="text-white text-8 md:text-[40px] font-normal leading-none text-center">Shop</h2>
                <ul className="flex items-center justify-center gap-[10px] text-base md:text-lg leading-none font-normal text-white mt-3 md:mt-4">
                    <li><Link to="/">Home</Link></li>
                    <li>/</li>
                    <li className="text-primary">Shop</li>
                </ul>
            </div>
        </div>

        <div className="s-py-100" >
            <div className="container">
                <div className="max-w-[1477px] mx-auto flex items-start justify-between gap-8 md:gap-10 flex-col lg:flex-row">
                    <div className="grid gap-[15px] lg:max-w-[300px] w-full sm:grid-cols-2 lg:grid-cols-1" data-aos="fade-up" data-aos-delay="100">
                        <div className="bg-[#F8F8F9] dark:bg-dark-secondary p-5 sm:p-[30px]">
                            <h4 className="font-medium leading-none text-xl sm:text-2xl mb-5 sm:mb-6">Categoryies</h4>
                            <div className="grid gap-5">
                                {categoryOptions.map((cat) => (
                                    <label key={cat} className="categoryies-iteem flex items-center gap-[10px]">
                                        <input
                                            className="appearance-none hidden"
                                            type="checkbox"
                                            name="categories"
                                            checked={selectedCategories.includes(cat)}
                                            onChange={() => handleCategoryChange(cat)}
                                        />
                                    <span className="w-4 h-4 rounded-[5px] border border-title dark:border-white flex items-center justify-center duration-300">
                                            <svg className={`duration-300 ${selectedCategories.includes(cat) ? '' : 'opacity-0'}`} width="9" height="8" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3.05203 7.04122C2.87283 7.04122 2.69433 6.97322 2.5562 6.83864L0.532492 4.8553C0.253409 4.58189 0.249159 4.13351 0.522576 3.85372C0.796701 3.57393 1.24578 3.57039 1.52416 3.84309L3.05203 5.34122L7.61512 0.868804C7.89491 0.595387 8.34328 0.59822 8.6167 0.87872C8.89082 1.1578 8.88657 1.60689 8.60749 1.8803L3.54787 6.83864C3.40974 6.97322 3.23124 7.04122 3.05203 7.04122Z" fill="#BB976D"/>
                                        </svg>
                                    </span>
                                        <span className="text-title dark:text-white block sm:leading-none transform translate-y-[1px] duration-300 select-none">{cat}</span>
                                </label>
                                ))}
                            </div>
                        </div>
                        <div className="bg-[#F8F8F9] dark:bg-dark-secondary p-5 sm:p-[30px]">
                            <h4 className="font-medium leading-none text-xl sm:text-2xl mb-5 sm:mb-6">Item Type</h4>
                            <div className="grid gap-5">
                                {itemTypeOptions.map((type) => (
                                    <label key={type} className="categoryies-iteem flex items-center gap-[10px]">
                                        <input
                                            className="appearance-none hidden"
                                            type="checkbox"
                                            name="item-type"
                                            checked={selectedItemType === type}
                                            onChange={() => handleItemTypeChange(type)}
                                        />
                                    <span className="w-[18px] h-[18px] rounded-full border border-title dark:border-white flex items-center justify-center duration-300">
                                            <svg className={`duration-300 ${selectedItemType === type ? '' : 'opacity-0'}`} width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="10" height="10" rx="5" fill="#BB976D"/>
                                        </svg>
                                    </span>
                                        <span className="sm:text-lg text-title duration-300 dark:text-white block sm:leading-none transform translate-y-[1px] select-none text">{type}</span>
                                </label>
                                ))}
                            </div>
                        </div>
                        <div className="bg-[#F8F8F9] dark:bg-dark-secondary p-5 sm:p-[30px]">
                            <h4 className="font-medium leading-none text-xl sm:text-2xl mb-5 sm:mb-6">Choose Brand</h4>
                            <div>
                                <SelectOne selected={selectedBrand} onChange={handleBrandChange} />
                            </div>
                        </div>
                        <div className="bg-[#F8F8F9] dark:bg-dark-secondary p-5 sm:p-[30px]">
                            <h4 className="font-medium leading-none text-xl sm:text-2xl mb-5 sm:mb-6">Price Range</h4>
                            <div className="price-filter">
                                <div id="slider-container">
                                    <MultiRangeSlider
                                        min={0}
                                        max={1000}
                                        minValue={minValue}
                                        maxValue={maxValue}
                                        ruler={false}
                                        label={false}
                                        onInput={(e) => {
                                            setMinValue(e.minValue);
                                            setMaxValue(e.maxValue);
                                        }}>
                                    </MultiRangeSlider>
                                </div>
                                <div className="price-filter-content">
                                    <div className="flex items-center gap-1">
                                        <span className="text-[15px] leading-none">Price:</span>
                                        <input className="text-[15px] text-paragraph placeholder:text-paragraph dark:text-white-light dark:placeholder:text-white-light leading-none bg-transparent focus:border-none outline-none" type="text" id="amount" readOnly placeholder={`$${minValue} - $${maxValue}`}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Reset Filters Button */}
                        <div className="bg-[#F8F8F9] dark:bg-dark-secondary p-5 sm:p-[30px]">
                            <button 
                                onClick={handleResetFilters}
                                className="w-full btn btn-solid" 
                                data-text="Reset Filters"
                            >
                                <span>Reset Filters</span>
                            </button>
                        </div>
                       
                    </div>
                    <div className="lg:max-w-[1100px] w-full" data-aos="fade-up" data-aos-delay="300">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-8">
                            {paginatedProducts.map((item,index)=>{
                                return(
                                    <LayoutOne item={item} key={index} />
                                )
                            })}
                        </div>
                        <div className="mt-10 md:mt-12 flex items-center justify-center gap-[10px]">
                            <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="text-title dark:text-white text-xl disabled:opacity-50" aria-label="Previous Page"><span className="lnr lnr-arrow-left"></span></button>
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i + 1}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`w-8 sm:w-10 h-8 sm:h-10 bg-title bg-opacity-5 flex items-center justify-center leading-none text-base sm:text-lg font-medium text-title transition-all duration-300 ${currentPage === i + 1 ? 'bg-opacity-100 text-white dark:bg-opacity-100 dark:text-title' : 'hover:bg-opacity-100 hover:text-white dark:bg-white dark:bg-opacity-5 dark:text-white dark:hover:bg-opacity-100 dark:hover:text-title'}`}
                                >
                                    {String(i + 1).padStart(2, '0')}
                                </button>
                            ))}
                            <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="text-title dark:text-white text-xl disabled:opacity-50" aria-label="Next Page"><span className="lnr lnr-arrow-right"></span></button>
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
