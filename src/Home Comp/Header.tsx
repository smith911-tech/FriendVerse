import logo from '../assets/Logo2.png'
import { AiOutlineHome } from 'react-icons/ai'
import { TbMessage } from 'react-icons/tb'
import { IoNotificationsOutline } from 'react-icons/io5'
import { FiUsers } from "react-icons/fi"
import { BiSolidUserCircle } from "react-icons/bi";
import { MdOutlineOndemandVideo } from 'react-icons/md'
import { GoSearch } from 'react-icons/go'
export default function Header() {
    return (
        <header className='sticky top-0 shadow-2xl bg-[#117DD5] flex justify-between px-3 py-2 text-[#ffffffe5]'>
            <img src={logo} alt="" className='w-[40px] object-contain' />
            <nav className='flex gap-10 px-5 mt-2 '>
                <div className='text-4xl'> <AiOutlineHome /> </div>
                <div className='text-4xl'><FiUsers /></div>
                <div className='text-4xl'><MdOutlineOndemandVideo /></div>
                <div className='text-4xl'> < TbMessage /></div>
                <div className='text-4xl'> <IoNotificationsOutline /></div>
            </nav>
            <div className='flex'>
                <div className='text-2xl pt-2 px-2'>
                    <GoSearch />
                </div>
                <div className='text text-5xl'>
                <BiSolidUserCircle />
                </div>
            </div>
        </header>
    )
}