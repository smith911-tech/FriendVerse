import { AiOutlineHome } from 'react-icons/ai'
import { TiMessages } from 'react-icons/ti'
import { IoNotificationsOutline } from 'react-icons/io5'
import { FiUserPlus } from "react-icons/fi"
import { AiOutlineSearch } from "react-icons/ai";
export default function ButtomNav(){
    return(
        <nav className='hidden gap-10 px-5 mt-2  bg-white z-[50] w-full justify-center fixed bottom-0 sm650:flex py-3 shadow-2xl '>
            <div className='text-3xl cursor-pointer text-[blue]'>
                <AiOutlineHome />
                <div className="border-b-4 border-[blue] w-8 mx-auto mt-1"></div>
            </div>
            <div className='text-3xl cursor-pointer'> <FiUserPlus /></div>
            <div className='text-3xl cursor-pointer'> < TiMessages /></div>
            <div className='text-3xl cursor-pointer'> <IoNotificationsOutline /></div>
            <div className='text-3xl cursor-pointer'><AiOutlineSearch /></div>
        </nav>
    )
}