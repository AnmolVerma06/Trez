import { Link } from "react-router-dom";
import { blogOneData } from "../../data/blog";

interface BlogItem {
  id: number;
  image: string;
  date: string;
  tag: string;
  title: string;
  desc: string;
}

export default function BlogThree() {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-7 md:gap-9">
        {blogOneData.map((item: BlogItem, index: number) => {
            return(
                <div className="group sm:flex items-center" key={index}>
                    <Link to="#" className="sm:w-1/2 overflow-hidden block">
                        <img className="duration-300 transform scale-100 group-hover:scale-110 w-full" src={item.image} alt="blog-card"/>
                    </Link>
                    <div className="bg-snow dark:bg-dark-secondary p-5 md:p-6 sm:ml-[-10%] sm:w-[60%] relative z-10">
                        <ul className="flex items-center gap-[10px] flex-wrap">
                            <li className="text-[15px] leading-none dark:text-white">{item.date}</li>
                            <li><Link to="/blog-tag" className="inline-block text-title font-medium text-[15px] leading-none py-2 px-[10px] rounded-md bg-primary-midum group-hover:bg-primary group-hover:text-white">{item.tag}</Link></li>
                        </ul>
                        <h5 className="mt-3 font-medium text-xl dark:text-white leading-[1.5]">{item.title}</h5>
                    </div>
                </div>
            )
        })}
    </div>
  )
}
