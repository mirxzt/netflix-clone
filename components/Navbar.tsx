import NavbarItem from "./NavbarItem";
import MobileMenu from './MobileMenu';
import AccountMenu from "./AccountMenu";

import { BsChevronDown, BsSearch, BsBell } from 'react-icons/bs'
import { useState, useCallback, useEffect } from 'react'

const TOP_OFFSET = 66

const Navbar = () => {
  const [ showMobileMenu, setShowMobileMenu ] = useState(false);
  const [ showAccountMenu, setShowAccountMenu ] = useState(false);
  const [ showBackground, setShowBackground ] = useState(false); 


  const triggleShowMobileMenu = useCallback(() => {
    setShowMobileMenu((curretnValue) => !curretnValue)
  },[])

  const triggleShowAccountMenu = useCallback(() => {
    setShowAccountMenu((curretnValue) => !curretnValue)
  },[])

  useEffect(() => {
    const scrollHandler = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowMobileMenu(true);
      }
      else setShowBackground(false);
    }

    window.addEventListener('scroll', scrollHandler);

    return () => window.removeEventListener('scroll',scrollHandler);
  })

  return (
    <>
      <nav className="w-full fixed z-40">
        <div 
          className={`
            px-4
            md:px-6
            py-6
            flex
            flex-row
            items-center
            transition
            duration-500
            ${showBackground ? ' bg-zinc-900 bg-opacity-90' : ''}
          `}
        >
            <img className="h-4 lg:h-7" src="images/logo.png" alt="logo" />

            <div
              className="
                flex-row
                ml-8
                gap-7
                hidden
                lg:flex
              "
            >
              <NavbarItem label="Home"/>
              <NavbarItem label="Series"/>
              <NavbarItem label="Films"/>
              <NavbarItem label="New & Popular"/>
              <NavbarItem label="My List"/>
              <NavbarItem label="Browse By Languages"/>
            </div>
            <div className=" lg:hidden flex flex-row items-center cursor-pointer gap-2 ml-4 relative">
              <p className="text-white text-sm cursor-pointer">Browse</p>
              <BsChevronDown onClick={ triggleShowMobileMenu } className={ `text-white ${showMobileMenu ? 'rotate-180' : 'rotate-0'}` } />  
              <MobileMenu visible = {showMobileMenu}/>
            </div>
            <div className="flex flex-row ml-auto mr-10 gap-10 items-center">
              <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                <BsSearch />
              </div>

              <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                <BsBell />
              </div>

              <div className="flex flex-row items-center cursor-pointer gap-2 relative">
                <div className="w-6 h-6 rounded-md lg:w-10 lg:h-10 overflow-hidden">
                  <img src="/images/default-blue.png" alt="" />
                </div>
                <BsChevronDown onClick={triggleShowAccountMenu} className={`text-white transition ${ showAccountMenu ? ' rotate-180' : 'rotate-0'} ` }/>
                <AccountMenu visible = {showAccountMenu}/> 
              </div>

            </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;