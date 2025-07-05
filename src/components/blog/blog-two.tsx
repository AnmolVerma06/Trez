import { blogTwoData } from '../../data/data'
import OwlCarousel from 'react-owl-carousel';

export default function BlogTwo() {
    const options = {
        autoplay :true,
        loop: true,
        autoplayTimeout:4000,
        autoplaySpeed:500,
        items:1,
        margin:30
    }

    const handleBlogClick = (e: React.MouseEvent) => {
        e.preventDefault();
        // Stay on current page - no navigation
    };

  return (
    <OwlCarousel {...options} className="owl-carousel owl-carousel portfolio-v1-slider max-w-md md:max-w-[750px] px-[15px] mx-auto owl-loaded owl-drag">
        {blogTwoData.map((item,index)=>{
            return(
                <div className="relative group" key={index}>
                    <div onClick={handleBlogClick} className="overflow-hidden block cursor-pointer">
                        <div className="w-full aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden">
                          <img className="duration-300 transform scale-100 group-hover:scale-110 w-full h-full object-cover" src={item.image} alt="blog-card"/>
                        </div>
                    </div>
                    <div className="sm:bg-white sm:bg-opacity-90 sm:dark:bg-title sm:dark:bg-opacity-90 mt-4 sm:p-5 md:p-6 sm:absolute z-10 bottom-0 left-0 sm:w-11/12 max-w-md px-5 sm:px-0 ">
                        <ul className="flex items-center gap-[10px] flex-wrap">
                            <li className="text-[15px] leading-none dark:text-white">{item.date}</li>
                            <li><div onClick={handleBlogClick} className="inline-block text-title font-medium text-[15px] leading-none py-[10px] px-5 rounded-md bg-primary-midum cursor-pointer">{item.tag}</div></li>
                        </ul>
                        <h5 className="mt-3 font-medium dark:text-white leading-[1.5] text-xl">{item.title}</h5>
                    </div>
                </div>
            )
        })}
    </OwlCarousel>
  )
}
