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
import { RotatingLines } from 'react-loader-spinner'
export default function Header({userData}: userdatas): JSX.Element {
    return (
        <header className=' shadow bg-[#fff] flex justify-between px-3 py-2 text-[#000000bc] select-none'>
            <img src={logo} alt="" className='w-[40px] object-contain' />
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
                                <div className='text-[48px] rounded-full text-[#000000d7]'>
                                    <BiSolidUserCircle />
                                </div>
                        </Link>
                        ) : (
                                <Link to='/Profile'>
                            <img
                                src={userData.profileImage}
                                alt="Profile"
                                className="w-12 h-12 rounded-full object-contain"
                            />
                                </Link>
                        )}
                    </section>
                ) : (
                    <div className='text-[48px] rounded-full text-[#000000d7]'>
                            <RotatingLines
                                strokeColor="grey"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="40"
                                visible={true}
                            />
                    </div>
                )}

            </div>
        </header>
    )
}