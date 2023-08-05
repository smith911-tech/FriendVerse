interface userdatas {
    userData: any
    SuggestData: any
}
import logo from '../assets/Logo2.png'
import { AiOutlineHome, AiOutlineMail, AiOutlineSearch } from 'react-icons/ai'
import { IoNotificationsOutline } from 'react-icons/io5'
import { LuUsers } from "react-icons/lu"
import { BiSolidUserCircle } from "react-icons/bi";
import { MdOutlineOndemandVideo } from 'react-icons/md'
import { Link, NavLink } from 'react-router-dom'
import { Popover } from '@headlessui/react'
import HeaderSearch from './HeaderSearch'
import { useState } from 'react'
import useThemeStore from '../Usetheme';
export default function Header({ userData, SuggestData }: userdatas) {
    // ! Opening the post div
    const [isSearchInput, setSearchInput] = useState(false);
    const handleInputClick = () => {
        setSearchInput(true);
    };
    
    const theme = useThemeStore((state: any) => state.theme);
    console.log(theme)
    return (
        <header className={`shadow bg-[#fff] flex justify-between px-3 py-2 text-[#000000bc] select-none `}> 
        <div className='flex gap-2'>
                <img src={logo} alt="" className='w-[40px] object-contain smm500:w-[30px]' />
                <Popover className="relative sm650:hidden lg1150:hidden">
                <Popover.Button className='outline-none ' onClick={handleInputClick}>
                <span className='text-2xl  p-2 bg-[#f0f2f5] mt-1 rounded-full cursor-pointer lg1150:hidden block '>
                    <AiOutlineSearch />
                </span>
                </Popover.Button>
                    <Popover.Panel className="absolute z-[50] bg-white top-0 w-[320px] -left-14 shadow-2xl pt-2 px-2">
                        <HeaderSearch SuggestData={SuggestData} Popover={Popover} handleInputClick={handleInputClick} isSearchInput={isSearchInput}/>
                    </Popover.Panel>
                </Popover>
        </div>
            <nav className='flex gap-14 px-5 mt-2 sm650:hidden Header-Class'>

                <NavLink className="ActiveLink" to="/Home" >
                <div className='text-3xl cursor-pointer '> <AiOutlineHome /></div>
                <NavLink to="/Home" className="UnderHomeNav"></NavLink>
                </NavLink>

                <NavLink className="ActiveLink" to="/FriendRequest">
                    <div className='text-3xl cursor-pointer'> <LuUsers /></div>
                    <NavLink to="/FriendRequest" className="UnderHomeNav"></NavLink>
                </NavLink>

                <NavLink className="ActiveLink" to="/VideoContent" >
                <div className='text-3xl cursor-pointer'><MdOutlineOndemandVideo /></div>
                    <NavLink to="/VideoContent" className="UnderHomeNav"></NavLink>
                </NavLink>

                <NavLink className="ActiveLink" to="/Message" >
                    <div className='text-3xl cursor-pointer'> <AiOutlineMail /></div>
                <NavLink to="/Message" className="UnderHomeNav"></NavLink>
                </NavLink>

                <NavLink className="ActiveLink" to="/Notifications">
                <div className='text-3xl cursor-pointer'> <IoNotificationsOutline /></div>
                <NavLink to="/Notifications" className="UnderHomeNav"></NavLink>
                </NavLink>
            </nav>
            <div className='flex gap-2'>
                <Link to="/UserSearch">
                    <span className='text-2xl  p-2 bg-[#f0f2f5] mt-1 rounded-full cursor-pointer sm650:block hidden'>
                        <AiOutlineSearch />
                    </span>
                </Link>
                {userData ? (
                    <section>
                        {userData.profileImage === "" ? (
                            <Link to='/Profile' onClick={(() => {
                                window.scrollTo(0, 0);
                            })}>
                                <div className='text-[48px] rounded-full text-[#000000d7]  smm500:text-[40px]'>
                                    <BiSolidUserCircle />
                                </div>
                        </Link>
                        ) : (
                                <Link to='/Profile' onClick={(() => {
                                    window.scrollTo(0, 0);
                                })}>
                            <img
                                src={userData.profileImage}
                                alt="Profile"
                                        className="w-12 h-12 rounded-full object-cover smm500:w-10 smm500:h-10"
                            />
                                </Link>
                        )}
                    </section>
                ) : (
                        <div className='text-[48px] rounded-full text-[#000000d7] smm500:text-[40px]'>
                            <BiSolidUserCircle />
                        </div>
                )}

            </div>
        </header>
    )
}