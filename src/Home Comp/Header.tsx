interface userdatas {
    userData: any
}
import logo from '../assets/Logo2.png'
import { AiOutlineHome } from 'react-icons/ai'
import { TbMessage } from 'react-icons/tb'
import { IoNotificationsOutline } from 'react-icons/io5'
import { FiUsers } from "react-icons/fi"
import { BiSolidUserCircle } from "react-icons/bi";
import { MdOutlineOndemandVideo } from 'react-icons/md'
export default function Header({userData}: userdatas): JSX.Element {
    return (
        <header className='sticky top-0 shadow bg-[#fff] flex justify-between px-3 py-2 text-[#000000bc] w-full z-10 select-none'>
            <img src={logo} alt="" className='w-[40px] object-contain' />
            <nav className='flex gap-14 px-5 mt-2 sm650:hidden'>
                <div className='text-3xl cursor-pointer text-[blue]'> 
                <AiOutlineHome />
                    <div className="border-b-4 border-[blue] w-8 mx-auto mt-1"></div>
                </div>
                <div className='text-3xl cursor-pointer'> <FiUsers /></div>
                <div className='text-3xl cursor-pointer'><MdOutlineOndemandVideo /></div>
                <div className='text-3xl cursor-pointer'> < TbMessage /></div>
                <div className='text-3xl cursor-pointer'> <IoNotificationsOutline /></div>
            </nav>
            <div>
                {userData && userData?.profileImage === "" ? (
                    <div className='text-[48px]   rounded-full text-[#000000d7]'>
                        <BiSolidUserCircle />
                    </div>
                ) : (
                    <img
                        src={userData?.profileImage}
                        alt="Profile"
                        className="w-12 h-12 rounded-full   object-contain "
                    />
                )}
            </div>
        </header>
    )
}