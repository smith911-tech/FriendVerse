import { AiOutlineHome } from 'react-icons/ai'
import { TbMessage } from 'react-icons/tb'
import { IoNotificationsOutline } from 'react-icons/io5'
import { FiUsers } from "react-icons/fi"
import { MdOutlineOndemandVideo } from 'react-icons/md'
export default function ButtomNav(){
    return(
        <nav className='hidden gap-10 px-5 mt-2  bg-white z-10 w-full justify-center fixed bottom-0 sm650:flex py-3 shadow-2xl '>
            <div className='text-3xl cursor-pointer text-[blue]'>
                <AiOutlineHome />
                <div className="border-b-4 border-[blue] w-8 mx-auto mt-1"></div>
            </div>
            <div className='text-3xl cursor-pointer'> <FiUsers /></div>
            <div className='text-3xl cursor-pointer'><MdOutlineOndemandVideo /></div>
            <div className='text-3xl cursor-pointer'> < TbMessage /></div>
            <div className='text-3xl cursor-pointer'> <IoNotificationsOutline /></div>
        </nav>
    )
}