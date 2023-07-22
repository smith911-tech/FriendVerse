interface userdatas {
    userData: any
}
import logo from '../assets/Logo2.png'
import { AiOutlineHome } from 'react-icons/ai'
import { TiMessages } from 'react-icons/ti'
import { IoNotificationsOutline } from 'react-icons/io5'
import { FiUserPlus} from "react-icons/fi"
import { BiSolidUserCircle } from "react-icons/bi";
import { MdOutlineOndemandVideo } from 'react-icons/md'
import { Link } from 'react-router-dom'
export default function Header({userData}: userdatas): JSX.Element {
    return (
        <header className=' shadow bg-[#fff] flex justify-between px-3 py-2 text-[#000000bc] select-none'>
            <img src={logo} alt="" className='w-[40px] object-contain smm500:w-[30px]' />
            <nav className='flex gap-14 px-5 mt-2 sm650:hidden'>
                <div className='text-3xl cursor-pointer '> 
                    <AiOutlineHome />
                </div>
                <div className='text-3xl cursor-pointer'> <FiUserPlus/></div>
                <div className='text-3xl cursor-pointer'><MdOutlineOndemandVideo /></div>
                <div className='text-3xl cursor-pointer'> < TiMessages /></div>
                <div className='text-3xl cursor-pointer'> <IoNotificationsOutline /></div>
            </nav>
            <div>
                {userData ? (
                    <section>
                        {userData.profileImage === "" ? (
                            <Link to='/Profile'>
                                <div className='text-[48px] rounded-full text-[#000000d7]  smm500:text-[40px]'>
                                    <BiSolidUserCircle />
                                </div>
                        </Link>
                        ) : (
                                <Link to='/Profile'>
                            <img
                                src={userData.profileImage}
                                alt="Profile"
                                        className="w-12 h-12 rounded-full object-contain smm500:w-10 smm500:h-10"
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