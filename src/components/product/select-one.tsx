import React from 'react';

interface SelectOneProps {
    selected: string;
    onChange: (value: string) => void;
}

const SelectOne: React.FC<SelectOneProps> = ({ selected, onChange }) => {
    const brandOptions = [
        "Puma",
        "GAP",
        "Ajile",
        "Bare Denim",    
        "Bewakoof"
    ];

    return (
        <div className="relative">
            <select
                value={selected}
                onChange={(e) => onChange(e.target.value)}
                className="w-full h-12 md:h-14 bg-snow dark:bg-dark-secondary border border-[#E3E5E6] text-title dark:text-white focus:border-primary p-4 outline-none duration-300 appearance-none cursor-pointer"
                aria-label="Select brand"
            >
                <option value="">All Brands</option>
                {brandOptions.map((brand, index) => (
                    <option key={index} value={brand}>
                        {brand}
                    </option>
                ))}
            </select>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
        </div>
    );
};

export default SelectOne;
