import { useEffect, useState } from 'react'
import logo from '../../assets/img/svg/logo.svg'
import logoLight from '../../assets/img/svg/logo-light.svg'
import { Link } from 'react-router-dom'
import NavMenu from './nav-menu'

export default function NavbarOne() {
    const [toggle , setToggle] = useState<boolean>(false)
    const [current , setCurrent] = useState<string>('')
    const [scroll,setScroll] = useState<boolean>(false)
    
        useEffect(()=>{
            window.scrollTo(0,0)
            setCurrent(window.location.pathname)
    
            const handlerScroll=()=>{
                if(window.scrollY > 50){
                    setScroll(true)
                }else{setScroll(false)}
            }
    
            window.addEventListener('scroll',handlerScroll)
    
            return () => {
                window.removeEventListener('scroll',handlerScroll)
              };
        },[])

  return (
    <div className={`header-area default-header relative z-50 bg-white dark:bg-title ${scroll ? 'sticky-header' : ''}`}>
        <div className="container-fluid">
            <div className="flex items-center justify-between gap-x-6 max-w-[1720px] mx-auto relative py-[10px] sm:py-4 lg:py-0">
                <Link className="cursor-pointer block" to="/" aria-label="Trez">
                    <img src={logo} alt="" className='dark:hidden w-[120px] sm:w-[200px]'/> 
                    <img src={logoLight} alt="" className='dark:block hidden w-[120px] sm:w-[200px]'/> 
                </Link>

                <div className={`main-menu absolute z-50 w-full lg:w-auto top-full left-0 lg:static bg-white dark:bg-title lg:bg-transparent lg:dark:bg-transparent px-5 sm:px-[30px] py-[10px] sm:py-5 lg:px-0 lg:py-0 ${toggle ? 'active' : ''}`}>
                    <ul className="text-lg leading-none text-title dark:text-white lg:flex lg:gap-[30px]">
                        <li className={`relative ${current === '/' ? 'active' : ''}`}> 
                            <Link to="/">
                                Home
                            </Link>
                        </li>
                        <li className={`relative ${current === '/shop' ? 'active' : ''}`}> 
                            <Link to="/shop">
                                Shop
                            </Link>
                        </li>
                        <li className={`relative ${current === '/contact' ? 'active' : ''}`}> 
                            <Link to="/contact">
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>

                <NavMenu toggle={toggle} setToggle={setToggle}/>
            </div>
        </div>
    </div>
  )
}
