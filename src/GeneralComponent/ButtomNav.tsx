import { AiOutlineHome } from 'react-icons/ai'
import { TiMessages } from 'react-icons/ti'
import { IoNotificationsOutline } from 'react-icons/io5'
import { LuUsers } from "react-icons/lu"
import { AiOutlineSearch } from "react-icons/ai";
import { NavLink } from 'react-router-dom';
export default function ButtomNav(){
    return(
        <nav className='hidden gap-10 px-5 mt-2  bg-white z-[50] w-full justify-center fixed bottom-0 sm650:flex py-3 shadow-black shadow-2xl rounded-t-2xl '>
            <NavLink className="ActiveLink" to="/Home" >
                <div className='text-3xl cursor-pointer '> <AiOutlineHome /></div>
                <NavLink to="/Home" className="UnderHomeNav"></NavLink>
            </NavLink>

            <NavLink className="ActiveLink" to="/FriendRequest">
                <div className='text-3xl cursor-pointer'> <LuUsers /></div>
                <NavLink to="/FriendRequest" className="UnderHomeNav"></NavLink>
            </NavLink>

            <NavLink className="ActiveLink" to="/VideoContent" >
                <div className='text-3xl cursor-pointer'><AiOutlineSearch /></div>
                <NavLink to="/VideoContent" className="UnderHomeNav"></NavLink>
            </NavLink>

            <NavLink className="ActiveLink" to="/Message" >
                <div className='text-3xl cursor-pointer'> < TiMessages /></div>
                <NavLink to="/Message" className="UnderHomeNav"></NavLink>
            </NavLink>

            <NavLink className="ActiveLink" to="/Notifications">
                <div className='text-3xl cursor-pointer'> <IoNotificationsOutline /></div>
                <NavLink to="/Notifications" className="UnderHomeNav"></NavLink>
            </NavLink>
        </nav>
        
    )
}