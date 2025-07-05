import { partnerData } from '../data/data'
import OwlCarousel from 'react-owl-carousel';

export default function PartnerOne() {
  return (
    <>
    <div className='block dark:hidden'>
        <OwlCarousel autoplay={true} loop={true} margin={50} autoplayTimeout={5000} autoplaySpeed={2000} items={6} responsive={{0:{items:2}, 768:{items:3}, 991:{items:4}, 1024:{items:6} }} className="max-w-[1720px] mx-auto home-v1-partner-slider partner">
            {partnerData.map((item,index)=>{
                return(
                    <div className="flex items-center justify-center w-full" key={index}>
                        <div className="text-2xl font-bold text-gray-800 hover:text-primary transition-colors duration-300 cursor-pointer">
                            {item.name}
                        </div>
                    </div>
                )
            })}
        </OwlCarousel>
    </div>
    <div className='hidden dark:block'>
        <OwlCarousel autoplay={true} loop={true} margin={50} autoplayTimeout={5000} autoplaySpeed={2000} items={6} responsive={{0:{items:2}, 768:{items:3}, 991:{items:4}, 1024:{items:6} }} className="max-w-[1720px] mx-auto home-v1-partner-slider partner">
            {partnerData.map((item,index)=>{
                return(
                    <div className="flex items-center justify-center w-full" key={index}>
                        <div className="text-2xl font-bold text-white hover:text-primary transition-colors duration-300 cursor-pointer">
                            {item.name}
                        </div>
                    </div>
                )
            })}
        </OwlCarousel>
    </div>
    </>
  )
}
